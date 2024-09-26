import { z } from 'zod';
import { eq } from 'drizzle-orm';

import { createTRPCRouter, publicProcedure } from '../trpc';
import { photosTable } from '@/server/db/schema';
import { generateSignedUrl } from '@/libs/aws/cloudfront';

export const photosRouter = createTRPCRouter({
  createPhoto: publicProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [photo] = await ctx.db
        .insert(photosTable)
        .values({
          key: input.key,
        })
        .returning();

      return { photo };
    }),
  getPhoto: publicProcedure
    .input(
      z.object({
        key: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const photo = await ctx.db.query.photosTable.findFirst({
        where: (table, funcs) => funcs.eq(table.key, input.key),
        with: {
          cameraMetadata: true,
          photosToCollections: {
            with: {
              collection: true,
            },
          },
          files: true,
        },
      });

      return { photo };
    }),
  getPhotos: publicProcedure.query(async ({ ctx }) => {
    const photos = await ctx.db.query.photosTable.findMany({
      with: {
        cameraMetadata: true,
        files: true,
        photosToCollections: {
          with: {
            collection: true,
          },
        },
      },
      orderBy: (table, funcs) => funcs.desc(table.updatedAt),
    });

    const signedPhotos = photos.map((p) => {
      return {
        ...p,
        files: p.files.map((f) => ({
          ...f,
          url: generateSignedUrl(f.url),
        })),
      };
    });

    return { photos: signedPhotos };
  }),
  updatePhoto: publicProcedure
    .input(
      z.object({
        key: z.string(),
        collection: z.string().optional(), // TODO used in use-increment-view check if this can be removed
        data: z.object({
          status: z.enum(['published', 'draft']).optional(),
          views: z.number().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [photo] = await ctx.db
        .update(photosTable)
        .set(input.data)
        .where(eq(photosTable.key, input.key))
        .returning();

      return { photo };
    }),
  deletePhoto: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const photo = await ctx.db
        .delete(photosTable)
        .where(eq(photosTable.id, input.id))
        .returning();

      return { photo };
    }),
});
