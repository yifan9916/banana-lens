import { z } from 'zod';
import { eq } from 'drizzle-orm';

import { createCallerFactory, createTRPCRouter, publicProcedure } from './trpc';
import { db } from '../db';
import { photosTable } from '../db/schema';

export const appRouter = createTRPCRouter({
  getPhoto: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async (opts) => {
      const photo = await db
        .select()
        .from(photosTable)
        .where(eq(photosTable.id, opts.input.id));

      return { photo };
    }),
  getPhotos: publicProcedure.query(async (opts) => {
    const photos = await db.select().from(photosTable);

    return { photos };
  }),
  updatePhoto: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          title: z.string().optional(),
          views: z.number().optional(),
        }),
      })
    )
    .mutation(async (opts) => {
      const photo = await db
        .update(photosTable)
        .set(opts.input.data)
        .where(eq(photosTable.id, opts.input.id));

      return { photo };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createServerCaller = createCallerFactory(appRouter);
