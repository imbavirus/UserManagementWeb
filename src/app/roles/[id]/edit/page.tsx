'use client';

import React, { useEffect, useState } from 'react';
import { IRole, Role } from '@/@types/user/role/role';
import { getRoleById, updateRole } from '@/actions/roleActions';
import { RoleForm } from '@/components/forms/roleForm';
import { IRoleFormValues } from '@/@types/user/role/roleFormValues';
import { useParams, useRouter } from 'next/navigation';
import { useSnackbar } from '@/lib/snackbarContext';

export default function RolesPage() {
  const { id } = useParams<{ id : Array<string> }>();
  const [role, setRole] = useState<IRole>();
  const [isLoading, setLoading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const router = useRouter();
  const { showSnackbar } = useSnackbar();  

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
        showSnackbar('Failed to load roles.', 'error'); 
      } finally {
        setLoading(false);
      }
    };

    loadRole();
  }, [id, router, showSnackbar]);

  const onFormClose = () => {
    router.push('/roles');
  };

  const handleFormSubmit = async (values : IRoleFormValues) => {
    setFormSubmitting(true);
    console.log('Form submitted for role edit:', values);
    showSnackbar('Updating role...', 'info');
    try {
      const result = await updateRole(Role(values));
      if (result?.data) {
        onFormClose();
        showSnackbar('Role updated successfully.', 'success');
      } else {
        console.error('Failed to create role:', result?.serverError || result?.validationErrors);
        showSnackbar('Failed to create role.', 'error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showSnackbar('Failed to create role.', 'error');
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
        submitButtonText='Edit Role'
      />
  );
}
