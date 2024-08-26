import { z } from 'zod';
import { eq } from 'drizzle-orm';

import { createTRPCRouter, publicProcedure } from '../trpc';
import { cameraMetadataTable } from '@/server/db/schema';

export const metadataRouter = createTRPCRouter({
  createMetadata: publicProcedure
    .input(
      z.object({
        photoId: z.number(),
        camera: z.enum(['SonyA7M4', 'iPhone15ProMax']),
        aperture: z.string(),
        focalLength: z.string(),
        shutterSpeed: z.string(),
        iso: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const metadata = await ctx.db
        .insert(cameraMetadataTable)
        .values({
          photoId: input.photoId,
          camera: input.camera,
          aperture: input.aperture,
          focalLength: input.focalLength,
          iso: input.iso,
          shutterSpeed: input.shutterSpeed,
        })
        .returning();

      return { metadata };
    }),
  updateMetadata: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          photoId: z.number(),
          camera: z.enum(['SonyA7M4', 'iPhone15ProMax']),
          aperture: z.string(),
          focalLength: z.string(),
          shutterSpeed: z.string(),
          iso: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [metadata] = await ctx.db
        .update(cameraMetadataTable)
        .set(input.data)
        .where(eq(cameraMetadataTable.id, input.id))
        .returning();

      return { metadata };
    }),
});
