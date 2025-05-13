'use client';

import React, { useEffect, useMemo } from 'react';
import { useForm, Controller, } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IUserProfileFormValues, userProfileFormSchema, UserProfileFormValues } from '@/@types/user/userProfile/userProfileFormValues';
import { IRole } from '@/@types/user/role/role';
import { IOptionType } from '@/@types/optionType';
import { IUserProfile } from '@/@types/user/userProfile/userProfile';
import { getAllRoles } from '@/actions/roleActions';

interface UserProfileFormProps {
  onSubmit: (values : IUserProfileFormValues) => void;
  defaultValues? : IUserProfile;
  isLoading ?: boolean;
  submitButtonText ?: string;
  onCancel ?: () => void;
}

export const UserProfileForm= ({
  onSubmit,
  defaultValues,
  isLoading = false,
  submitButtonText = 'Submit',
  onCancel,
} : UserProfileFormProps) => {

  const schema = userProfileFormSchema;
  const [roles, setRoles] = React.useState<IRole[]>([]);


  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<IUserProfileFormValues>({
    defaultValues: UserProfileFormValues(roles, defaultValues),
    resolver: zodResolver(schema),
    mode: 'onChange',
  });  

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const rolesData = await getAllRoles();
        if (rolesData?.data) {
          setRoles(rolesData.data);
        }
      } catch (err) {
        console.error('Failed to fetch roles:', err);
      }
    };
    loadRoles();
  }, []);

  useEffect(() => {
      reset(UserProfileFormValues(roles, defaultValues));
  }, [defaultValues, roles, reset]);

  const roleOptions: IOptionType[] = useMemo(() => roles.map((x) => {
    return {
      value: x.id,
      label: x.name ?? '',
    }
  }), [roles])

  const inputClassName = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const errorClassName = "mt-1 text-xs text-red-600 dark:text-red-400";
  const labelClassName = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

  
  if (!roles) {
    return <div>Loading...</div>;
  }

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

      <div>
        <label htmlFor="email" className={labelClassName}>
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={`${inputClassName} ${errors.email ? 'border-red-500 dark:border-red-400' : ''}`}
          disabled={isLoading}
        />
        {errors.email && <p className={errorClassName}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="bio" className={labelClassName}>
          Bio
        </label>
        <textarea
          id="bio"
          {...register('bio')}
          className={`${inputClassName} ${errors.bio ? 'border-red-500 dark:border-red-400' : ''}`}
          disabled={isLoading}
        />
        {errors.bio && <p className={errorClassName}>{errors.bio.message}</p>}
      </div>

      <div>
        <label htmlFor="role" className={labelClassName}>
          Role
        </label>
        <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <select
                id="role"
                {...field}
                value={field.value?.value || ''}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  // Find the full IOptionType object from roleOptions based on the selected value
                  const selectedOption = roleOptions.find(
                    // Ensure comparison handles potential type differences (e.g. string vs number)
                    (option) => String(option.value) === selectedValue
                  );
                  // Update the form state with the entire IOptionType object or a default if not found
                  field.onChange(selectedOption || { value: '', label: 'Select Role' });
                }}
                className={`${inputClassName} ${errors.role ? 'border-red-500 dark:border-red-400' : ''}`}
                disabled={isLoading}
              >
                <option value="" disabled={field.value?.value !== ''}>Select a role...</option>
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
        />
        {errors.role && <p className={errorClassName}>{errors.role.message || (errors.role as { value ?: { message ?: string } })?.value?.message}</p>}
        <div className="p-5 flex items-center">
            <input
                id="receiveNewsletter"
                type="checkbox"
                {...register('receiveNewsletter')}
                    disabled={isLoading}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
                htmlFor="receiveNewsletter"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
                Receive newsletter
            </label>
            {errors.receiveNewsletter && <p className={`${errorClassName} ml-2`}>{errors.receiveNewsletter.message}</p>}
        </div>
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