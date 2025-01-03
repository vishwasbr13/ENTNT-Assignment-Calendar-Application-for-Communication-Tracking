import React from 'react';
import { useStore } from '../../store/useStore';
import { format, isFuture, isPast } from 'date-fns';
import { getNextPlannedCommunication } from '../../utils/communications';

export const CommunicationList: React.FC = () => {
  const { communications, companies, communicationMethods } = useStore();
  const [filter, setFilter] = React.useState<'past' | 'upcoming'>('upcoming');

  // Ensure dates are properly parsed
  const parsedCommunications = communications.map((comm) => ({
    ...comm,
    date: new Date(comm.date),
    company: companies.find((c) => c.id === comm.companyId),
    method: communicationMethods.find((m) => m.id === comm.methodId),
  }));

  // Filter past and upcoming communications
  const pastCommunications = parsedCommunications
    .filter((comm) => isPast(comm.date))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const upcomingCommunications = companies
    .map((company) => {
      const nextComm = getNextPlannedCommunication(
        company,
        parsedCommunications,
        communicationMethods
      );
      return nextComm && isFuture(nextComm.date)
        ? { company, ...nextComm }
        : null;
    })
    .filter(Boolean);

  return (
    <div>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setFilter('past')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            filter === 'past'
              ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          Past Communications
        </button>
        <button
          onClick={() => setFilter('upcoming')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            filter === 'upcoming'
              ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          Upcoming Communications
        </button>
      </div>

      <div className="space-y-4">
        {filter === 'past' ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {pastCommunications.map((comm) => (
              <div key={comm.id} className="py-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {comm.company?.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {comm.method?.name} - {format(comm.date, 'PPP')}
                    </p>
                    {comm.notes && (
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {comm.notes}
                      </p>
                    )}
                  </div>
                  {comm.company?.linkedinProfile && (
                    <a
                      href={comm.company.linkedinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm"
                    >
                      View LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {upcomingCommunications.map((comm, index) => (
              <div key={index} className="py-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {comm.company.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {comm.method?.name} - {format(comm.date, 'PPP')}
                    </p>
                  </div>
                  {comm.company.linkedinProfile && (
                    <a
                      href={comm.company.linkedinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm"
                    >
                      View LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
