import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';
import { photosToCollectionsTable } from '@/server/db/schema';

export const photosToCollections = createTRPCRouter({
  addPhotoToCollection: publicProcedure
    .input(
      z.object({
        photoId: z.number(),
        collectionId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.db
        .insert(photosToCollectionsTable)
        .values({
          photoId: input.photoId,
          collectionId: input.collectionId,
        })
        .returning();

      return { data };
    }),
});
