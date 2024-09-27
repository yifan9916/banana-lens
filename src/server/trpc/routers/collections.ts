import { z } from 'zod';
import { eq } from 'drizzle-orm';

import { env } from '@/env';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { generateSignedUrl } from '@/libs/aws/cloudfront';
import { collectionsTable } from '@/server/db/schema';

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
      let collection = await ctx.db.query.collectionsTable.findFirst({
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

      if (collection) {
        // https://github.com/drizzle-team/drizzle-orm/discussions/1152
        if (env.NODE_ENV === 'production') {
          const photos = collection?.photosToCollections.filter((p) => {
            // return published photos with low and high res image files only
            const isPublished = p.photo.status === 'published';
            const lowResolution = p.photo.files.find(
              (f) => f.resolution === 'low'
            );
            const highResolution = p.photo.files.find(
              (f) => f.resolution === 'high'
            );

            return isPublished && lowResolution && highResolution;
          });

          collection.photosToCollections = photos;
        }

        collection.photosToCollections = collection.photosToCollections.map(
          (p) => {
            return {
              ...p,
              photo: {
                ...p.photo,
                files: p.photo.files.map((f) => ({
                  ...f,
                  url: generateSignedUrl(f.url),
                })),
              },
            };
          }
        );
      }

      return { collection };
    }),
  getCollections: publicProcedure.query(async ({ ctx }) => {
    let collections = await ctx.db
      .select()
      .from(collectionsTable)
      .orderBy(collectionsTable.id);

    if (env.NODE_ENV === 'development') {
      collections = collections.filter((c) => c.status === 'published');
    }

    return { collections };
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
