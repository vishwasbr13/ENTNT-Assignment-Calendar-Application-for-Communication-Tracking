import React from 'react';
import { Company } from '../../types';
import { AlertCircle } from 'lucide-react';

interface NotificationListProps {
  companies: Company[];
}

export const NotificationList: React.FC<NotificationListProps> = ({ companies }) => {
  
  console.log('Companies:', companies);

  if (!companies || companies.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        No communications due at this time
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {companies.map((company) => {
        
        if (!company || !company.id) {
          console.warn('Invalid company data:', company);
          return null;
        }

        return (
          <div key={company.id} className="p-6 flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">{company.name || 'Unknown Name'}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{company.location || 'Unknown Location'}</p>
              </div>
            </div>
            {company.linkedinProfile ? (
              <a
                href={company.linkedinProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium"
              >
                View LinkedIn
              </a>
            ) : (
              <span className="text-gray-500 text-sm">No LinkedIn Profile</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
