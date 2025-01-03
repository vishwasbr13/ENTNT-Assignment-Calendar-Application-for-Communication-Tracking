import React from 'react';
import { useStore } from '../../store/useStore';
import { CompanyRow } from './CompanyRow';

interface CompanyTableProps {
  selectedCompanies: string[];
  onSelectCompany: (id: string) => void;
}

export const CompanyTable: React.FC<CompanyTableProps> = ({
  selectedCompanies,
  onSelectCompany,
}) => {
  const { companies, communications, communicationMethods } = useStore();

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
              Company
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
              Last Five Communications
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
              Next Planned
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          {companies.map((company) => (
            <CompanyRow
              key={company.id}
              company={company}
              communications={communications}
              methods={communicationMethods}
              onSelect={onSelectCompany}
              isSelected={selectedCompanies.includes(company.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};