/* eslint-disable @typescript-eslint/no-explicit-any */
import 'server-only'; // <-- ensure this file cannot be imported from the client
import { noop } from '@tanstack/react-query';
import {
  createTRPCOptionsProxy,
  unstable_createHydrateClient,
} from '@trpc/tanstack-react-query';
import type { TRPCQueryOptions } from '@trpc/tanstack-react-query';
import { headers } from 'next/headers';
import { cache } from 'react';
import { createTRPCContext } from '../server/trpc/init';
import { makeQueryClient } from './query-client';
import { appRouter } from '../server/trpc/root';

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);

const createContext = async () =>
    createTRPCContext({ headers: await headers() });

export const trpc = createTRPCOptionsProxy({
    ctx: createContext,
    router: appRouter,
    queryClient: getQueryClient,
});
// If your router is on a separate server, pass a client instead:
// createTRPCOptionsProxy({
//   client: createTRPCClient({ links: [httpLink({ url: '...' })] }),
//   queryClient: getQueryClient,
// });

// Sends the request's queries to client components, pending ones too
export const HydrateClient = unstable_createHydrateClient(getQueryClient);

export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T,
) {
  const queryClient = getQueryClient();
  if (queryOptions.queryKey[1]?.type === 'infinite') {
    void queryClient.infiniteQuery(queryOptions as any).catch(noop);
  } else {
    void queryClient.query(queryOptions).catch(noop);
  }
}

export const caller = appRouter.createCaller(createContext);