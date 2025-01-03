import React from 'react';
import { NotificationDropdown } from '../notifications/NotificationDropdown';
import { ThemeToggle } from '../theme/ThemeToggle';

export const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Communication Calendar
          </h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <NotificationDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};