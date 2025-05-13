'use server';

import { IRole, roleSchema } from '@/@types/user/role/role';
import { actionClient } from '@/lib/safe-action';
import { callApiEndpoint } from '@/services/http/httpService';
import { idOnlySchema } from '@/@types/idOnly';


// This should be the relative path, as callApiEndpoint prepends API_BASE_URL
const rolesApiPath = '/api/Roles';

export const createRole = actionClient
  .schema(roleSchema)
  .action(async ({ parsedInput }) => {
    const role : IRole = await callApiEndpoint(rolesApiPath, 'POST', parsedInput);
    return role;
});

export const updateRole = actionClient
  .schema(roleSchema)
  .action(async ({ parsedInput }) => {
    const role : IRole = await callApiEndpoint(rolesApiPath, 'PUT', parsedInput);
    return role;
});

export const getRoleById = actionClient
  .schema(idOnlySchema)
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput;
    const endpointWithId = `${rolesApiPath}/${id}`;

    const role: IRole = await callApiEndpoint(endpointWithId, 'GET');
    return role;
  });

export const getAllRoles = actionClient
  .action(async () => {
    const roles: IRole[] = await callApiEndpoint(rolesApiPath, 'GET');
    return roles;
  });
