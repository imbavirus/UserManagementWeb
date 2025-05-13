'use client';

import React, { useEffect, useState } from 'react';
import { CustomTable } from '@/components/customTable';
import { IUserProfile } from '@/@types/user/userProfile/userProfile';
import { getAllUserProfiles } from '@/actions/userProfileActions';
import { useSnackbar } from '@/lib/snackbarContext';
import { useRouter } from 'next/navigation';

export default function UserProfilesPage() {
  const [userProfiles, setUserProfiles] = useState<IUserProfile[]>();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const loadUserProfiles = async () => {
      setLoading(true);
      showSnackbar('Loading user profiles...', 'info');
      try {
        const data = await getAllUserProfiles();
        setUserProfiles(data?.data);
        showSnackbar('User profiles loaded successfully.', 'success');
      } catch (err) {
        console.error('Failed to fetch user profiles:', err);
        showSnackbar('Failed to load user profiles.', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadUserProfiles();
  }, [showSnackbar]);

  const handleAddUserProfile = () => {
    router.push('/profiles/new');
  };

  const handleEditUserProfile = (userProfile : IUserProfile) => {
    router.push(`/profiles/${userProfile.id}/edit`);
  };

  // Define columns for the CustomTable
  const columns = [
    { key: 'name' as keyof IUserProfile, header: 'Name' },
    { key: 'email' as keyof IUserProfile, header: 'Email' },
    { key: 'role.name' as keyof IUserProfile, header: 'Role' },
    { key: 'bio' as keyof IUserProfile, header: 'Bio' },
    { key: 'receiveNewsletter' as keyof IUserProfile, header: 'Receive Newsletter' },
  ];

  return (
    <div suppressHydrationWarning={true}>
      <h1 className="text-2xl font-bold mb-6">User Profiles Management</h1>
      <CustomTable<IUserProfile>
        data={userProfiles ?? []}
        columns={columns}
        onAddItem={handleAddUserProfile}
        onEditItem={handleEditUserProfile}
        caption="User Profiles"
        isLoading={isLoading}
      />
    </div>
  );
}
