import React from 'react';
import { CommunicationMethod } from '../../types';
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react';

interface CommunicationMethodListProps {
  methods: CommunicationMethod[];
  onDelete: (id: string) => void;
  onEdit: (method: CommunicationMethod) => void;
  onReorder: (id: string, direction: 'up' | 'down') => void;
}

export const CommunicationMethodList: React.FC<CommunicationMethodListProps> = ({
  methods,
  onDelete,
  onEdit,
  onReorder,
}) => {
  const sortedMethods = [...methods].sort((a, b) => a.sequence - b.sequence);

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
              Method Name
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Description
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Sequence
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Mandatory
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {sortedMethods.map((method, index) => (
            <tr key={method.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                {method.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {method.description}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {method.sequence}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {method.isMandatory ? 'Yes' : 'No'}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(method)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(method.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="flex flex-col">
                    {index > 0 && (
                      <button
                        onClick={() => onReorder(method.id, 'up')}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <ArrowUpDown className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};