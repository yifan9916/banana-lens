import { z } from 'zod';
import { eq } from 'drizzle-orm';

import { procedure, router } from './trpc';
import { db } from '../db';
import { photosTable } from '../db/schema';

export const appRouter = router({
  getPhotos: procedure.query(async (opts) => {
    const photos = await db.select().from(photosTable);

    return { photos };
  }),
  updatePhoto: procedure
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
