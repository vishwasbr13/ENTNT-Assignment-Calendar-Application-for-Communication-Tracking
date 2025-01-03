import { Communication, Company, CommunicationMethod } from '../types';
import { addDays, isPast, isToday, isFuture } from 'date-fns';

export const getCompanyStatus = (
  company: Company,
  communications: Communication[]
) => {
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

export const getLastFiveCommunications = (
  companyId: string,
  communications: Communication[],
  methods: CommunicationMethod[]
) => {
  return communications
    .filter((c) => c.companyId === companyId && isPast(c.date))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5)
    .map((comm) => ({
      ...comm,
      method: methods.find((m) => m.id === comm.methodId),
    }));
};

export const getNextPlannedCommunication = (
  company: Company,
  communications: Communication[],
  methods: CommunicationMethod[]
): { date: Date; method: CommunicationMethod | undefined } | null => {
  // Get all future communications for this company
  const futureCommunications = communications
    .filter((c) => c.companyId === company.id && isFuture(c.date))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // If there are future communications, return the next one
  if (futureCommunications.length > 0) {
    const nextComm = futureCommunications[0];
    return {
      date: nextComm.date,
      method: methods.find((m) => m.id === nextComm.methodId),
    };
  }

  // If no future communications, calculate the next one based on the last communication
  const lastComm = communications
    .filter((c) => c.companyId === company.id && isPast(c.date))
    .sort((a, b) => b.date.getTime() - a.date.getTime())[0];

  if (!lastComm) {
    // If no communications at all, schedule from today
    return {
      date: new Date(),
      method: methods[0],
    };
  }

  // Calculate next communication based on the last one
  const lastMethodIndex = methods.findIndex((m) => m.id === lastComm.methodId);
  const nextMethodIndex = (lastMethodIndex + 1) % methods.length;
  const nextDueDate = addDays(lastComm.date, company.communicationPeriodicity);

  return {
    date: nextDueDate,
    method: methods[nextMethodIndex],
  };
};