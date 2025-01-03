import React from 'react';
import { useStore } from '../../store/useStore';
import { CompanyTable } from './CompanyTable';
import { LogCommunication } from './LogCommunication';
import { NotificationList } from './NotificationList';
import { getDueNotifications } from '../../utils/notifications';

export const DashboardView: React.FC = () => {
  const [selectedCompanies, setSelectedCompanies] = React.useState<string[]>([]);
  const { companies, communications } = useStore();
  const { overdue, dueToday } = getDueNotifications(communications, companies);
  const dueCompanies = [...overdue, ...dueToday];

  const handleSelectCompany = (id: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(id)
        ? prev.filter((companyId) => companyId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Company Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Companies</h2>
            {selectedCompanies.length > 0 && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {selectedCompanies.length} companies selected
              </span>
            )}
          </div>
        </div>
        <CompanyTable
          selectedCompanies={selectedCompanies}
          onSelectCompany={handleSelectCompany}
        />
      </div>

      {/* Communication Logger */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Log Communication</h2>
        </div>
        <div className="p-6">
          <LogCommunication selectedCompanies={selectedCompanies} />
        </div>
      </div>

      {/* Due Communications */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Due Communications</h2>
        </div>
        <NotificationList companies={dueCompanies} />
      </div>
    </div>
  );
};