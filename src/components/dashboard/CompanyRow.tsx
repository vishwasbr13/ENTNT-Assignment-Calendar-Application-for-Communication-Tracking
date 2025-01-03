import React from 'react';
import { Company, Communication, CommunicationMethod } from '../../types';
import { format } from 'date-fns';
import { getCompanyStatus, getLastFiveCommunications, getNextPlannedCommunication } from '../../utils/communications';
import { clsx } from 'clsx';

interface CompanyRowProps {
  company: Company;
  communications: Communication[];
  methods: CommunicationMethod[];
  onSelect: (id: string) => void;
  isSelected: boolean;
}

export const CompanyRow: React.FC<CompanyRowProps> = ({
  company,
  communications,
  methods,
  onSelect,
  isSelected,
}) => {
  const status = getCompanyStatus(company, communications);
  const lastFive = getLastFiveCommunications(company.id, communications, methods);
  const nextPlanned = getNextPlannedCommunication(company, communications, methods);

  return (
    <tr
      className={clsx(
        'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800',
        status === 'overdue' && 'bg-red-50 dark:bg-red-900/20',
        status === 'due' && 'bg-yellow-50 dark:bg-yellow-900/20',
        isSelected && 'bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'
      )}
      onClick={() => onSelect(company.id)}
    >
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(company.id)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <span className="ml-3 font-medium text-gray-900 dark:text-white">{company.name}</span>
        </div>
      </td>
      <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex space-x-2">
          {lastFive.map((comm) => (
            <div
              key={comm.id}
              className="relative group"
              title={format(comm.date, 'PPP')}
            >
              <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs">
                {comm.method?.name}
              </span>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                <p className="font-medium">{format(comm.date, 'PPP')}</p>
                {comm.notes && <p className="mt-1">{comm.notes}</p>}
              </div>
            </div>
          ))}
        </div>
      </td>
      <td className="px-3 py-4 text-sm">
        {nextPlanned && (
          <div className="flex items-center space-x-2">
            <span className="font-medium dark:text-white">{nextPlanned.method?.name}</span>
            <span className="text-gray-500 dark:text-gray-400">
              {format(nextPlanned.date, 'PPP')}
            </span>
          </div>
        )}
      </td>
      <td className="px-3 py-4 text-sm">
        {status === 'overdue' && (
          <span className="text-red-600 dark:text-red-400 font-medium">Overdue</span>
        )}
        {status === 'due' && (
          <span className="text-yellow-600 dark:text-yellow-400 font-medium">Due Today</span>
        )}
        {status === 'upcoming' && (
          <span className="text-green-600 dark:text-green-400 font-medium">On Track</span>
        )}
      </td>
    </tr>
  );
};