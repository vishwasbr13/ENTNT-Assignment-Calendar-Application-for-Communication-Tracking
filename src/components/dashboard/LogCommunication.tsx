import React from 'react';
import { useStore } from '../../store/useStore';

interface LogCommunicationProps {
  selectedCompanies: string[];
}

export const LogCommunication: React.FC<LogCommunicationProps> = ({
  selectedCompanies,
}) => {
  const { companies, communicationMethods, addCommunication } = useStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const date = new Date(formData.get('date') as string);
    const methodId = formData.get('method') as string;
    const notes = formData.get('notes') as string;

    // If companies are selected, log communication for each selected company
    const targetCompanies = selectedCompanies.length > 0
      ? selectedCompanies
      : [formData.get('company') as string];

    targetCompanies.forEach((companyId) => {
      addCommunication({
        id: crypto.randomUUID(),
        companyId,
        methodId,
        date,
        notes,
      });
    });

    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {selectedCompanies.length === 0 && (
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Company
          </label>
          <select
            id="company"
            name="company"
            required
            className="mt-1 block w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select a company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label
          htmlFor="method"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Communication Method
        </label>
        <select
          id="method"
          name="method"
          required
          className="mt-1 block w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select a method</option>
          {communicationMethods.map((method) => (
            <option key={method.id} value={method.id}>
              {method.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          required
          defaultValue={new Date().toISOString().split('T')[0]}
          className="mt-1 block w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="mt-1 block w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {selectedCompanies.length > 0
          ? `Log Communication for ${selectedCompanies.length} Companies`
          : 'Log Communication'}
      </button>
    </form>
  );
};
