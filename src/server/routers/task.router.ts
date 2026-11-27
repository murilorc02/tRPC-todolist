import { baseProcedure, createTRPCRouter } from '../trpc/init';
import { type Task, createTaskSchema, deleteTaskSchema, updateTaskSchema } from '@/src/shared/schemas/task.schema';

const tasks: Task[] = [];

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
        }),
    update: baseProcedure
        .input(updateTaskSchema)
        .mutation(({ input }) => {
            const toUpdate = tasks.find((task) => task.id === input.id);
            if (toUpdate === undefined) throw new Error("Task not found");

            if (input.status !== undefined) toUpdate.status = input.status;
            if (input.title !== undefined) toUpdate.title = input.title;

            return toUpdate;
        }),
    delete: baseProcedure
        .input(deleteTaskSchema)
        .mutation(({ input }) => {
            const index = tasks.findIndex((task) => task.id === input.id);
            if (index === -1) throw new Error("Task not found");
            const [deleted] = tasks.splice(index, 1);
            return deleted;
        })
})