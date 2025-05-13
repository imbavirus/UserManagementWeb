'use client';

import React, { useEffect, useState } from 'react';
import {  IUserProfile, UserProfile } from '@/@types/user/userProfile/userProfile';
import { getUserProfileById, updateUserProfile } from '@/actions/userProfileActions';
import { UserProfileForm } from '@/components/forms/userProfileForm';
import { IUserProfileFormValues } from '@/@types/user/userProfile/userProfileFormValues';
import { useParams, useRouter } from 'next/navigation';
import { useSnackbar } from '@/lib/snackbarContext';

export default function UserProfilesPage() {
  const { id } = useParams<{ id : Array<string> }>();
  const [userProfile, setUserProfile] = useState<IUserProfile>();
  const [isLoading, setLoading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const router = useRouter();
  const { showSnackbar } = useSnackbar();  

  useEffect(() => {
    const loadUserProfile = async () => {
      setLoading(true);

      const profileIdString = id?.[0];
      const numericId = parseInt(profileIdString, 10);
      if (isNaN(numericId)) {
        router.push('/profiles');
        return;
      }

      try {
        const data = await getUserProfileById({ id: numericId});
        setUserProfile(data?.data);
      } catch (err) {
        console.error('Failed to fetch user profiles:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [id, router]);

  const onFormClose = () => {
    router.push('/profiles');
  };

  const handleFormSubmit = async (values : IUserProfileFormValues) => {
    setFormSubmitting(true);
    console.log('Form submitted for profile edit:', values);
    showSnackbar('Updating user profile...', 'info');
    try {
      const result = await updateUserProfile(UserProfile(values));
      if (result?.data) {
        onFormClose();
        showSnackbar('User profile updated successfully.', 'success');
      } else {
        console.error('Failed to create user profile:', result?.serverError || result?.validationErrors);
        showSnackbar('Failed to create user profile.', 'error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showSnackbar('Failed to create user profile.', 'error');
    } finally {
      setFormSubmitting(false);
    }
  };
  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
      <UserProfileForm
        defaultValues={userProfile}
        onSubmit={handleFormSubmit}
        onCancel={onFormClose}
        isLoading={formSubmitting || isLoading}
        submitButtonText='Edit Profile'
      />
  );
}
