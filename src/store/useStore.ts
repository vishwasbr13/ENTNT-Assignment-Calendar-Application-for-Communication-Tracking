import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Company, Communication, CommunicationMethod } from '../types';

interface AppState {
  companies: Company[];
  communications: Communication[];
  communicationMethods: CommunicationMethod[];
  isDarkMode: boolean;
  addCompany: (company: Company) => void;
  updateCompany: (company: Company) => void;
  deleteCompany: (id: string) => void;
  addCommunication: (communication: Communication) => void;
  addCommunicationMethod: (method: CommunicationMethod) => void;
  updateCommunicationMethod: (method: CommunicationMethod) => void;
  deleteCommunicationMethod: (id: string) => void;
  reorderCommunicationMethod: (id: string, direction: 'up' | 'down') => void;
  toggleDarkMode: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      companies: [],
      communications: [],
      isDarkMode: false,
      communicationMethods: [
        {
          id: '1',
          name: 'LinkedIn Post',
          description: 'Post on company LinkedIn page',
          sequence: 1,
          isMandatory: true,
        },
        {
          id: '2',
          name: 'LinkedIn Message',
          description: 'Direct message on LinkedIn',
          sequence: 2,
          isMandatory: true,
        },
        {
          id: '3',
          name: 'Email',
          description: 'Email communication',
          sequence: 3,
          isMandatory: true,
        },
        {
          id: '4',
          name: 'Phone Call',
          description: 'Phone call communication',
          sequence: 4,
          isMandatory: false,
        },
        {
          id: '5',
          name: 'Other',
          description: 'Other forms of communication',
          sequence: 5,
          isMandatory: false,
        },
      ],
      addCompany: (company) =>
        set((state) => ({ companies: [...state.companies, company] })),
      updateCompany: (company) =>
        set((state) => ({
          companies: state.companies.map((c) => (c.id === company.id ? company : c)),
        })),
      deleteCompany: (id) =>
        set((state) => ({
          companies: state.companies.filter((c) => c.id !== id),
        })),
      addCommunication: (communication) =>
        set((state) => ({
          communications: [...state.communications, communication],
        })),
      addCommunicationMethod: (method) =>
        set((state) => ({
          communicationMethods: [...state.communicationMethods, method],
        })),
      updateCommunicationMethod: (method) =>
        set((state) => ({
          communicationMethods: state.communicationMethods.map((m) =>
            m.id === method.id ? method : m
          ),
        })),
      deleteCommunicationMethod: (id) =>
        set((state) => ({
          communicationMethods: state.communicationMethods.filter((m) => m.id !== id),
        })),
      reorderCommunicationMethod: (id, direction) =>
        set((state) => {
          const methods = [...state.communicationMethods];
          const index = methods.findIndex((m) => m.id === id);
          if (index === -1) return state;

          const newIndex = direction === 'up' ? index - 1 : index + 1;
          if (newIndex < 0 || newIndex >= methods.length) return state;

          const method = methods[index];
          const otherMethod = methods[newIndex];

          methods[index] = { ...otherMethod, sequence: method.sequence };
          methods[newIndex] = { ...method, sequence: otherMethod.sequence };

          return { communicationMethods: methods };
        }),
      toggleDarkMode: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'communication-calendar-storage',
      partialize: (state) => ({
        companies: state.companies,
        communications: state.communications.map(comm => ({
          ...comm,
          date: comm.date.toISOString(),
        })),
        isDarkMode: state.isDarkMode,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
      
          state.communications = state.communications.map(comm => ({
            ...comm,
            date: new Date(comm.date),
          }));
        }
      },
    }
  )
);




export const initializeSampleData = () => {
  const {
    addCompany,
    addCommunication,
    companies,
    communications,
  } = useStore.getState();

  // Sample Companies
  const sampleCompanies: Company[] = [
    {
      id: '1',
      name: 'ENTNT',
      location: 'Abu Dhabi',
      linkedinProfile: 'https://www.linkedin.com/company/entnt/',
      emails: ['contact@entnt.com', 'hr@entnt.com'],
      phoneNumbers: ['+1-800-555-1234'],
      comments: 'Potential partnership opportunity.',
      communicationPeriodicity: 7,
    },
    {
      id: '2',
      name: 'EduWorld',
      location: 'Austin, TX',
      linkedinProfile: 'https://linkedin.com/company/eduworld',
      emails: ['info@eduworld.com'],
      phoneNumbers: ['+1-800-555-5678'],
      comments: 'Interested in EdTech solutions.',
      communicationPeriodicity: 14,
    },
    {
      id: '3',
      name: 'TechCorp',
      location: 'San Francisco, CA',
      linkedinProfile: 'https://linkedin.com/company/techcorp',
      emails: ['contact@techcorp.com'],
      phoneNumbers: ['+1-987-456-1234', '+1-435-346-3452'],
      comments: 'Potential partnership opportunity.',
      communicationPeriodicity: 7,
    }
  ];

  // Sample Communications
  const sampleCommunications: Communication[] = [
    {
      id: '101',
      companyId: '1',
      methodId: '1',
      date: new Date(),
      notes: 'Posted about our new product launch.',
    },
    {
      id: '102',
      companyId: '1',
      methodId: '2',
      date: new Date('2024-11-23T10:30:00'),
      notes: 'Message with potentical candidates for openings.',
    },
    {
      id: '103',
      companyId: '2',
      methodId: '2',
      date: new Date('2024-11-12T10:30:00'),
      notes: 'Followed up on partnership discussions.',
    },
    {
      id: '104',
      companyId: '2',
      methodId: '1',
      date: new Date(),
      notes: 'Followed up on  Recruitment discussions.',
    },
    {
      id: '105',
      companyId: '3',
      methodId: '3',
      date: new Date('2024-12-01T10:30:00'), 
      notes: 'Meeting with HR.',
    }
    
  ];

  
  if (companies.length === 0) {
    sampleCompanies.forEach(addCompany);
  }

  if (communications.length === 0) {
    sampleCommunications.forEach(addCommunication);
  }
};

initializeSampleData();