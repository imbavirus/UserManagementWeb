'use client';

import React, { useEffect, useState } from 'react';
import { CustomTable } from '@/components/customTable';
import { IRole } from '@/@types/user/role/role';
import { getAllRoles } from '@/actions/roleActions';
import { useRouter } from 'next/navigation';

export default function RolesPage() {
  const [roles, setRoles] = useState<IRole[]>();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadRoles = async () => {
      setLoading(true);
      try {
        const data = await getAllRoles();
        setRoles(data?.data);
      } catch (err) {
        console.error('Failed to fetch roles:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRoles();
  }, []);

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
