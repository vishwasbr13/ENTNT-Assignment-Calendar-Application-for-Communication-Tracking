import React from 'react';
import { Company } from '../../types';
import { format } from 'date-fns';
import { Building2, Mail, Phone, Calendar, MessageSquare, Link } from 'lucide-react';

interface CompanyDetailsProps {
  company: Company;
  onClose: () => void;
}

export const CompanyDetails: React.FC<CompanyDetailsProps> = ({ company, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            {company.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4" />
                Email Addresses
              </h3>
              <ul className="space-y-1">
                {company.emails.map((email, index) => (
                  <li key={index} className="text-gray-900 dark:text-white">
                    <a href={`mailto:${email}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4" />
                Phone Numbers
              </h3>
              <ul className="space-y-1">
                {company.phoneNumbers.map((phone, index) => (
                  <li key={index} className="text-gray-900 dark:text-white">
                    <a href={`tel:${phone}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-2">
                <Link className="h-4 w-4" />
                LinkedIn Profile
              </h3>
              <a
                href={company.linkedinProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                View Profile
              </a>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4" />
                Communication Periodicity
              </h3>
              <p className="text-gray-900 dark:text-white">
                Every {company.communicationPeriodicity} days
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4" />
              Comments
            </h3>
            <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
              {company.comments || 'No comments available'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};