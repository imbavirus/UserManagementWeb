'use client';

import React, { useEffect, useState } from 'react';
import { CustomTable } from '@/components/customTable';
import { IRole } from '@/@types/user/role/role';
import { getAllRoles } from '@/actions/roleActions';
import { useRouter } from 'next/navigation';
import { useSnackbar } from '@/lib/snackbarContext';

export default function RolesPage() {
  const [roles, setRoles] = useState<IRole[]>();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const loadRoles = async () => {
      setLoading(true);
      try {
        const data = await getAllRoles();
        setRoles(data?.data);
      } catch (err) {
        console.error('Failed to fetch roles:', err);
        showSnackbar('Failed to load roles.', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadRoles();
  }, [showSnackbar]);

  const handleAddRole = () => {
    router.push('/roles/new');
  };

  const handleEditRole = (role : IRole) => {
    router.push(`/roles/${role.id}/edit`);
  };

  // Define columns for the CustomTable
  const columns = [
    { key: 'name' as keyof IRole, header: 'Name' },
  ];

  return (
    <div suppressHydrationWarning={true}>
      <h1 className="text-2xl font-bold mb-6">Roles Management</h1>
      <CustomTable<IRole>
        data={roles ?? []}
        columns={columns}
        onAddItem={handleAddRole}
        onEditItem={handleEditRole}
        caption="Roles"
        isLoading={isLoading}
      />
    </div>
  );
}
