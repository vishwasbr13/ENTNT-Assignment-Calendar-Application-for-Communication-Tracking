import React, { useEffect } from 'react';
import { CommunicationMethod } from '../../types';

interface CommunicationMethodFormProps {
  onSubmit: (method: Omit<CommunicationMethod, 'id'>) => void;
  editingMethod?: CommunicationMethod | null;
}

export const CommunicationMethodForm: React.FC<CommunicationMethodFormProps> = ({ 
  onSubmit, 
  editingMethod 
}) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (editingMethod && formRef.current) {
      const form = formRef.current;
      form.name.value = editingMethod.name;
      form.description.value = editingMethod.description;
      form.sequence.value = editingMethod.sequence;
      form.isMandatory.value = editingMethod.isMandatory.toString();
    }
  }, [editingMethod]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      sequence: parseInt(formData.get('sequence') as string, 10),
      isMandatory: formData.get('isMandatory') === 'true',
    });
    
    if (!editingMethod) {
      e.currentTarget.reset();
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Method Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="sequence" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Sequence
        </label>
        <input
          type="number"
          name="sequence"
          id="sequence"
          required
          min="1"
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="isMandatory" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Mandatory
        </label>
        <select
          name="isMandatory"
          id="isMandatory"
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {editingMethod ? 'Update Communication Method' : 'Add Communication Method'}
      </button>
    </form>
  );
};