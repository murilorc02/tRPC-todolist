import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createTRPCContext } from '@/src/server/trpc/init';
import { appRouter } from '@/src/server/trpc/root';

const handler = (req: Request) =>
    fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        createContext: () => createTRPCContext({ headers: req.headers }),
    });

export { handler as GET, handler as POST };