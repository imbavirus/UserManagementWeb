import { z } from 'zod';
import { optionTypeSchema } from '../../optionType';
import { userProfileSchema, IUserProfile } from './userProfile';
import { IRole } from '../role/role';

// Define the Zod schema for the form values
export const userProfileFormSchema = userProfileSchema.extend({
    role: optionTypeSchema.refine(val => val !== undefined, { message: 'Required' }),
}).omit({
    // Omit the original ID field
    roleId: true,
});

// Infer the TypeScript type from the Zod schema
export type IUserProfileFormValues = z.infer<typeof userProfileFormSchema>;

// Factory function to create form values
export const UserProfileFormValues = (userProfile ?: IUserProfile) : IUserProfileFormValues => {
    // Handle the default case (new unit of measure)
    if (!userProfile) {
        return userProfileFormSchema.parse({});
    }

    // Fetch necessary list from Redux store if an existing unit of measure is provided
    const roles : Array<IRole> = [] // TODO: Fetch roles

    const { roleId, ...rest } = userProfile;

    // Transform the IUserProfile data into IUserProfileFormValues structure
    return userProfileFormSchema.parse({
        ...rest,
        role: roleId
            ? {
                label: roles.find(x => x.id === roleId)?.name ?? '',
                value: roleId,
            }
            : undefined,
    });
};

// Validation function using the Zod schema
export const validateUserProfileForm = (formValues : IUserProfileFormValues) : boolean => {
    try {
        userProfileFormSchema.parse(formValues);
        return true;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Unit of measure form validation failed:', error.errors);
        } else {
            console.error('An unexpected error occurred during validation:', error);
        }
        return false;
    }
};
