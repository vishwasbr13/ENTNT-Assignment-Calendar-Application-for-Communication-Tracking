import React from 'react';
import { CalendarGrid } from './CalendarGrid';
import { CommunicationList } from './CommunicationList';
import { CalendarIcon, ListIcon } from 'lucide-react';
import { clsx } from 'clsx';

type ViewType = 'calendar' | 'list';

export const CalendarView: React.FC = () => {
  const [viewType, setViewType] = React.useState<ViewType>('calendar');

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Communications Calendar
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewType('calendar')}
                className={clsx(
                  'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium',
                  viewType === 'calendar'
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                )}
              >
                <CalendarIcon className="h-4 w-4" />
                <span>Calendar</span>
              </button>
              <button
                onClick={() => setViewType('list')}
                className={clsx(
                  'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium',
                  viewType === 'list'
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                )}
              >
                <ListIcon className="h-4 w-4" />
                <span>List</span>
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          {viewType === 'calendar' ? <CalendarGrid /> : <CommunicationList />}
        </div>
      </div>
    </div>
  );
};