import { z } from 'zod';
import { baseModelSchema } from '../../baseModel';
import { IRoleFormValues } from './roleFormValues';

export const roleSchema = baseModelSchema.extend({
    name: z.string().min(1, 'Name is required').max(255, 'Name can only be up to 255 characters long.'),
});

// Infer TypeScript type (replaces the original interface)
export type IRole = z.infer<typeof roleSchema>;

export function Role(formValues : IRoleFormValues) : IRole {
    return roleSchema.parse({
        ...formValues,
    });
};
