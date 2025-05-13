'use client';

import React, { useState } from 'react';
import { Role } from '@/@types/user/role/role';
import { createRole } from '@/actions/roleActions';
import { RoleForm } from '@/components/forms/roleForm';
import { IRoleFormValues } from '@/@types/user/role/roleFormValues';
import { useRouter } from 'next/navigation';

export default function RolesPage() {
  const [formSubmitting, setFormSubmitting] = useState(false);
  const router = useRouter();

  const onFormClose = () => {
    router.push(`/roles`);
  };

  const handleFormSubmit = async (values: IRoleFormValues) => {
    setFormSubmitting(true);
    console.log('Form submitted for new role:', values);
    try {
      const result = await createRole(Role(values));
      if (result?.data) {
        onFormClose();
      } else {
        console.error('Failed to create user role:', result?.serverError || result?.validationErrors);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div suppressHydrationWarning={true}>
        <RoleForm
          onSubmit={handleFormSubmit}
          onCancel={onFormClose}
          isLoading={formSubmitting}
          submitButtonText="Create Role"
        />
    </div>
  );
}
