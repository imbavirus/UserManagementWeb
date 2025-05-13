import { z } from 'zod';
import { roleSchema, IRole } from './role';

// Define the Zod schema for the form values
export const roleFormSchema = roleSchema.extend({
});

// Infer the TypeScript type from the Zod schema
export type IRoleFormValues = z.infer<typeof roleFormSchema>;

// Factory function to create form values
export const RoleFormValues = (role ?: IRole) : IRoleFormValues => {
    // Handle the default case (new role)
    try {
        if (!role) {
            return roleFormSchema.parse({});
        }

        return roleFormSchema.parse({
            ...role,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Role form validation failed:', error.errors);
        } else {
            console.error('An unexpected error occurred during validation:', error);
        }
        return {} as IRoleFormValues;
    }
};

// Validation function using the Zod schema
export const validateRoleForm = (formValues : IRoleFormValues) : boolean => {
    try {
        roleFormSchema.parse(formValues);
        return true;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Role form validation failed:', error.errors);
        } else {
            console.error('An unexpected error occurred during validation:', error);
        }
        return false;
    }
};
