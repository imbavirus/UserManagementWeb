import { z } from 'zod';
import { optionTypeSchema } from '../../optionType';
import { userProfileSchema, IUserProfile } from './userProfile';
import { IRole } from '../role/role';

// Define the Zod schema for the form values
export const userProfileFormSchema = userProfileSchema.extend({
    role: optionTypeSchema.refine(val => val !== undefined, { message: 'Required' }).default({ value: '', label: 'Select Role' }),
}).omit({
    // Omit the original ID field
    roleId: true,
});

// Infer the TypeScript type from the Zod schema
export type IUserProfileFormValues = z.infer<typeof userProfileFormSchema>;

// Factory function to create form values
export const UserProfileFormValues = (roles : Array<IRole>, userProfile ?: IUserProfile) : IUserProfileFormValues => {
    // Handle the default case (new user profile)
    if (!userProfile) {
        const val =  userProfileFormSchema.parse({});
        return val;
    }

    const { roleId, ...rest } = userProfile;

    // Transform the IUserProfile data into IUserProfileFormValues structure
    return userProfileFormSchema.parse({
        ...rest,
        role: roleId
            ? {
                label: roles.find(x => x.id === roleId)?.name ?? '',
                value: roleId,
            }
            : { value: '', label: 'Select Role' },
    });
};

// Validation function using the Zod schema
export const validateUserProfileForm = (formValues : IUserProfileFormValues) : boolean => {
    try {
        userProfileFormSchema.parse(formValues);
        return true;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('User profile form validation failed:', error.errors);
        } else {
            console.error('An unexpected error occurred during validation:', error);
        }
        return false;
    }
};
