import { Company, Communication, CommunicationMethod } from '../types';
import { addDays } from 'date-fns';

export const scheduleMandatoryCommunications = (
  company: Company,
  methods: CommunicationMethod[]
): Communication[] => {
  const mandatoryMethods = methods
    .filter(method => method.isMandatory)
    .sort((a, b) => a.sequence - b.sequence);

  // Start scheduling from today
  let currentDate = new Date();
  
  return mandatoryMethods.map((method) => {
    const communication: Communication = {
      id: crypto.randomUUID(),
      companyId: company.id,
      methodId: method.id,
      date: currentDate,
      notes: `Scheduled ${method.name} communication`,
    };
    
    // Update the date for the next communication
    currentDate = addDays(currentDate, company.communicationPeriodicity);
    
    return communication;
  });
};