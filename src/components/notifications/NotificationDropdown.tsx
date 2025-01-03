import React from 'react';
import { format, addDays } from 'date-fns';
import { useStore } from '../../store/useStore';
import { Bell, X } from 'lucide-react';
import { getDueNotifications } from '../../utils/notifications';
import { Company } from '../../types';

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const { companies, communications } = useStore();
  const { overdue, dueToday } = getDueNotifications(communications, companies);
  const totalNotifications = overdue.length + dueToday.length;

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNextDueDate = (company: Company) => {
    const lastComm = communications
      .filter(c => c.companyId === company.id)
      .sort((a, b) => b.date.getTime() - a.date.getTime())[0];

    if (!lastComm) return new Date();
    return addDays(lastComm.date, company.communicationPeriodicity);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
      >
        <Bell className="h-6 w-6" />
        {totalNotifications > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalNotifications}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notifications</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {totalNotifications === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No communications due at this time
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {overdue.length > 0 && (
                  <div className="p-2 bg-red-50 dark:bg-red-900/20">
                    <h4 className="px-4 py-2 text-sm font-medium text-red-800 dark:text-red-200">
                      Overdue ({overdue.length})
                    </h4>
                    {overdue.map((company) => (
                      <div key={company.id} className="p-4 hover:bg-red-100 dark:hover:bg-red-900/40">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                              {company.name}
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Due: {format(getNextDueDate(company), 'PPP')}
                            </p>
                          </div>
                          <a
                            href={company.linkedinProfile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium"
                          >
                            View LinkedIn
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {dueToday.length > 0 && (
                  <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20">
                    <h4 className="px-4 py-2 text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      Due Today ({dueToday.length})
                    </h4>
                    {dueToday.map((company) => (
                      <div key={company.id} className="p-4 hover:bg-yellow-100 dark:hover:bg-yellow-900/40">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                              {company.name}
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Due: {format(getNextDueDate(company), 'PPP')}
                            </p>
                          </div>
                          <a
                            href={company.linkedinProfile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium"
                          >
                            View LinkedIn
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};