import { z } from 'zod';

export const taskSchema = z.object({
    id: z.string(),
    title: z.string().min(1),
    status: z.boolean(),
    createdAt: z.date(),
});

export const createTaskSchema = taskSchema.pick({ title: true });
export const updateTaskSchema = taskSchema.pick({ id: true }).extend({
    title: z.string().min(1).optional(),
    status: z.boolean().optional()
});

export type Task = z.infer<typeof taskSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;