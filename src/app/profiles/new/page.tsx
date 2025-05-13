'use client';

import React, { useState } from 'react';
import {  UserProfile } from '@/@types/user/userProfile/userProfile';
import { createUserProfile } from '@/actions/userProfileActions';
import { UserProfileForm } from '@/components/forms/userProfileForm';
import { IUserProfileFormValues } from '@/@types/user/userProfile/userProfileFormValues';
import { useRouter } from 'next/navigation';
import { useSnackbar } from '@/lib/snackbarContext';

export default function UserProfilesPage() {
  const router = useRouter();
  const [formSubmitting, setFormSubmitting] = useState(false); 
  const { showSnackbar } = useSnackbar(); 

  const onFormClose = () => {
    router.push('/profiles');
  };

  const handleFormSubmit = async (values : IUserProfileFormValues) => {
    setFormSubmitting(true);
    console.log('Form submitted for new profile:', values);
    showSnackbar('Creating user profile...', 'info');
    try {
      const result = await createUserProfile(UserProfile(values));
      if (result?.data) {
        onFormClose();
        showSnackbar('User profile created successfully.', 'success');
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

  return (
    <div suppressHydrationWarning={true}>
      <UserProfileForm
        onSubmit={handleFormSubmit}
        onCancel={onFormClose}
        isLoading={formSubmitting}
        submitButtonText='Create Profile'
      />
    </div>
  );
}
