'use server';

import { z } from 'zod';
import { IUserProfile, userProfileSchema } from '@/@types/user/userProfile/userProfile';
import { actionClient } from '@/lib/safe-action';
import { callApiEndpoint } from '@/services/http/httpService';
import { idOnlySchema } from '@/@types/idOnly';


// This should be the relative path, as callApiEndpoint prepends API_BASE_URL
const userProfilesApiPath = '/api/UserProfiles';

export const createUserProfile = actionClient.schema(userProfileSchema).action(async ({ parsedInput }) => {
  const userProfile : IUserProfile = await callApiEndpoint(userProfilesApiPath, 'POST', parsedInput);
  return userProfile;
});

export const updateUserProfile = actionClient.schema(userProfileSchema).action(async ({ parsedInput }) => {
  const userProfile : IUserProfile = await callApiEndpoint(userProfilesApiPath, 'PUT', parsedInput);
  return userProfile;
});

export const getUserProfileById = actionClient
  .schema(idOnlySchema)
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput;
    const endpointWithId = `${userProfilesApiPath}/${id}`;

    const userProfile: IUserProfile = await callApiEndpoint(endpointWithId, 'GET');
    return userProfile;
  });

export const getAllUserProfiles = actionClient
  .schema(z.object({}).optional())
  .action(async () => {
    const userProfiles: IUserProfile[] = await callApiEndpoint(userProfilesApiPath, 'GET');
    return userProfiles;
  });
