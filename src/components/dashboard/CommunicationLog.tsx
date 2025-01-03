import React from 'react';
import { useStore } from '../../store/useStore';
import { format } from 'date-fns';

export const CommunicationLog: React.FC = () => {
  const { communications, companies, communicationMethods } = useStore();

  const sortedCommunications = [...communications].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  if (communications.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No communications logged yet
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {sortedCommunications.map((comm) => {
          const company = companies.find((c) => c.id === comm.companyId);
          const method = communicationMethods.find((m) => m.id === comm.methodId);

          return (
            <li key={comm.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {company?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {method?.name} - {format(comm.date, 'PPP')}
                  </p>
                </div>
              </div>
              {comm.notes && (
                <p className="mt-2 text-sm text-gray-500">{comm.notes}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};