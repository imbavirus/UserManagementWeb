'use client';

import React, { useEffect, useState } from 'react';
import { IRole, Role } from '@/@types/user/role/role';
import { getRoleById, updateRole } from '@/actions/roleActions';
import { RoleForm } from '@/components/forms/roleForm';
import { IRoleFormValues } from '@/@types/user/role/roleFormValues';
import { useParams, useRouter } from 'next/navigation';

export default function RolesPage() {
  const { id } = useParams<{ id : Array<string> }>();
  const [role, setRole] = useState<IRole>();
  const [isLoading, setLoading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const router = useRouter();
  

  useEffect(() => {
    const loadRole = async () => {
      setLoading(true);

      const roleIdString = id?.[0];
      const numericId = parseInt(roleIdString, 10);
      if (isNaN(numericId)) {
        router.push('/roles');
        return;
      }

      try {
        const data = await getRoleById({ id: numericId});
        setRole(data?.data);
      } catch (err) {
        console.error('Failed to fetch roles:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRole();
  }, [id, router]);

  const onFormClose = () => {
    router.push('/roles');
  };

  const handleFormSubmit = async (values : IRoleFormValues) => {
    setFormSubmitting(true);
    console.log('Form submitted for role edit:', values);
    try {
      const result = await updateRole(Role(values));
      if (result?.data) {
        onFormClose();
      } else {
        console.error('Failed to create role:', result?.serverError || result?.validationErrors);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setFormSubmitting(false);
    }
  };
  if (!role) {
    return <div>Loading...</div>;

  }

  return (
      <RoleForm
        defaultValues={role}
        onSubmit={handleFormSubmit}
        onCancel={onFormClose}
        isLoading={formSubmitting || isLoading}
        submitButtonText="Edit Role"
      />
  );
}
