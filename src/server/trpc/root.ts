import { taskRouter } from '../routers/task.router';
import { createTRPCRouter } from './init';

export const appRouter = createTRPCRouter({
    task: taskRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;