import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../trpc/init';
import { type Task, createTaskSchema } from '@/src/shared/schemas/task.schema';

const tasks: Task[] = [];
tasks.push({
    id: 'sample',
    title: 'Sample task',
    createdAt: new Date(),
    status: false
});

export const taskRouter = createTRPCRouter({
    getAll: baseProcedure
        .query(() => {
            return tasks;
        }),
    create: baseProcedure
        .input(createTaskSchema)
        .mutation(({ input }) => {
            const task: Task = {
                id: crypto.randomUUID(),
                title: input.title,
                status: false,
                createdAt: new Date()
            };
            tasks.push(task);
            return task;
        })
})