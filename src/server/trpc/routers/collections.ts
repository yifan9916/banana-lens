import { z } from 'zod';
import { eq } from 'drizzle-orm';

import { createTRPCRouter, publicProcedure } from '../trpc';
import { collectionsTable } from '@/server/db/schema';
import { env } from '@/env';

export const collectionsRouter = createTRPCRouter({
  createCollection: publicProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [collection] = await ctx.db
        .insert(collectionsTable)
        .values({
          key: input.key,
        })
        .returning();

      return { collection };
    }),
  getCollection: publicProcedure
    .input(
      z.object({
        key: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const collection = await ctx.db.query.collectionsTable.findFirst({
        where: (table, funcs) => funcs.eq(table.key, input.key),
        with: {
          photosToCollections: {
            with: {
              photo: {
                with: {
                  cameraMetadata: true,
                  files: true,
                },
              },
            },
            orderBy: (table, funcs) => funcs.asc(table.photoId),
          },
        },
        orderBy: (table, funcs) => funcs.asc(table.id),
      });

      if (env.NODE_ENV === 'production' && collection) {
        // https://github.com/drizzle-team/drizzle-orm/discussions/1152
        const photos = collection?.photosToCollections.filter(
          (p) => p.photo.status === 'published'
        );

        collection.photosToCollections = photos;
      }

      return { collection };
    }),
  getCollections: publicProcedure.query(async ({ ctx }) => {
    const collections = await ctx.db
      .select()
      .from(collectionsTable)
      .orderBy(collectionsTable.id);

    const publishedCollections = collections.filter(
      (c) => c.status === 'published'
    );

    return {
      collections:
        env.NODE_ENV === 'production' ? publishedCollections : collections,
    };
  }),
  updateCollection: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          key: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const collection = await ctx.db
        .update(collectionsTable)
        .set(input.data)
        .where(eq(collectionsTable.id, input.id))
        .returning();

      return { collection };
    }),
  deleteCollection: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const collection = ctx.db
        .delete(collectionsTable)
        .where(eq(collectionsTable.id, input.id))
        .returning();

      return { collection };
    }),
});
