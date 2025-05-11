import { z } from 'zod';

export const optionTypeSchema = z.object({
    label: z.string(),
    value: z.union([z.string(), z.number()]),
});

export type IOptionType = z.infer<typeof optionTypeSchema>;
