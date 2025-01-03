import { Communication, Company } from '../types';
import { isToday, isPast, addDays } from 'date-fns';

export const getDueNotifications = (
  communications: Communication[],
  companies: Company[]
): { overdue: Company[]; dueToday: Company[] } => {
  if (!Array.isArray(companies) || !Array.isArray(communications)) {
    console.warn('Invalid input to getDueNotifications:', { companies, communications });
    return { overdue: [], dueToday: [] };
  }

  const result = { overdue: [] as Company[], dueToday: [] as Company[] };
  
  companies.forEach((company) => {
    if (!company || !company.id) {
      console.warn('Invalid company data:', company);
      return;
    }

    const lastCommunication = communications
      .filter((c) => c.companyId === company.id)
      .sort((a, b) => b.date.getTime() - a.date.getTime())[0];

    if (!lastCommunication) {
      result.overdue.push(company);
      return;
    }

    const nextDueDate = addDays(
      lastCommunication.date,
      company.communicationPeriodicity
    );

    if (isPast(nextDueDate) && !isToday(nextDueDate)) {
      result.overdue.push(company);
    } else if (isToday(nextDueDate)) {
      result.dueToday.push(company);
    }
  });

  return result;
};

export const getNotificationStatus = (company: Company, communications: Communication[]) => {
  if (!company || !Array.isArray(communications)) {
    console.warn('Invalid input to getNotificationStatus:', { company, communications });
    return 'unknown';
  }

  const lastCommunication = communications
    .filter((c) => c.companyId === company.id)
    .sort((a, b) => b.date.getTime() - a.date.getTime())[0];

  if (!lastCommunication) return 'overdue';

  const nextDueDate = addDays(
    lastCommunication.date,
    company.communicationPeriodicity
  );

  if (isPast(nextDueDate) && !isToday(nextDueDate)) return 'overdue';
  if (isToday(nextDueDate)) return 'due';
  return 'upcoming';
};