import { z } from 'zod';
import { baseModelSchema } from '../../baseModel';
import { IUserProfileFormValues } from './userProfileFormValues';

// Define the Zod schema based on the IUserProfile interface
export const userProfileSchema = baseModelSchema.extend({
    name: z.string().min(1, 'Name is required').max(255, 'Name can only be up to 255 characters long.'),
    email: z.string().email().min(1, 'Email is required').max(255, 'Email can only be up to 255 characters long.'),
    bio: z.string().min(1, 'Bio is required').max(255, 'Bio can only be up to 255 characters long.'),
    receiveNewsletter: z.boolean().default(false),
    roleId: z.number(),
});

// Infer TypeScript type (replaces the original interface)
export type IUserProfile = z.infer<typeof userProfileSchema>;

// Convert form values into a valid userProfile object
export function UserProfile(formValues : IUserProfileFormValues) : IUserProfile {
    const { role, ...rest } = formValues;

    return userProfileSchema.parse({
        ...rest,
        roleId: role?.value ? Number(role.value) : undefined,
    });
};
