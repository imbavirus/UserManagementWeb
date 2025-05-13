'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IRoleFormValues, roleFormSchema, RoleFormValues } from '@/@types/user/role/roleFormValues';
import { IRole } from '@/@types/user/role/role';

interface RoleFormProps {
  onSubmit: (values : IRoleFormValues) => void;
  defaultValues? : IRole;
  isLoading ?: boolean;
  submitButtonText ?: string;
  onCancel ?: () => void;
}

export const RoleForm= ({
  onSubmit,
  defaultValues,
  isLoading = false,
  submitButtonText = 'Submit',
  onCancel,
} : RoleFormProps) => {

  const schema = roleFormSchema;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IRoleFormValues>({
    defaultValues: RoleFormValues(defaultValues),
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
      reset(RoleFormValues(defaultValues));
  }, [defaultValues, reset]);

  const inputClassName = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const errorClassName = "mt-1 text-xs text-red-600 dark:text-red-400";
  const labelClassName = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className={labelClassName}>
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className={`${inputClassName} ${errors.name ? 'border-red-500 dark:border-red-400' : ''}`}
          disabled={isLoading}
        />
        {errors.name && <p className={errorClassName}>{errors.name.message}</p>}
      </div>
      <div className="flex items-center justify-end space-x-4">
        {onCancel && (
            <button
                type="button"
                onClick={onCancel}
                disabled={isLoading}
                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
                Cancel
            </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
        >
          {isLoading ? 'Submitting...' : submitButtonText}
        </button>
      </div>
    </form>
  );
};