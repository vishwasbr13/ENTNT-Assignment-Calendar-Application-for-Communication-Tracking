import React from 'react';
import { useStore } from '../../store/useStore';
import { clsx } from 'clsx';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isToday,
  isSameMonth,
  addMonths,
  subMonths,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CalendarGrid: React.FC = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const { communications, companies, communicationMethods } = useStore();

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  const getCommunicationsForDate = (date: Date) => {
    return communications.filter(
      (comm) => format(comm.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="bg-gray-50 dark:bg-gray-800 p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayComms = getCommunicationsForDate(day);
          return (
            <div
              key={day.toISOString()}
              className={clsx(
                'bg-white dark:bg-gray-900 p-2 min-h-[100px]',
                !isSameMonth(day, currentDate)
                  ? 'text-gray-400 dark:text-gray-600'
                  : isToday(day)
                  ? 'bg-blue-50 dark:bg-blue-900/20'
                  : ''
              )}
            >
              <div className="font-medium text-sm dark:text-white">
                {format(day, 'd')}
              </div>
              <div className="mt-1 space-y-1">
                {dayComms.map((comm) => {
                  const company = companies.find((c) => c.id === comm.companyId);
                  const method = communicationMethods.find(
                    (m) => m.id === comm.methodId
                  );
                  return (
                    <div
                      key={comm.id}
                      className="text-xs p-1 rounded bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200"
                      title={comm.notes}
                    >
                      {company?.name} - {method?.name}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};