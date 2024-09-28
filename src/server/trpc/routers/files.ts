import { z } from 'zod';
import { eq } from 'drizzle-orm';

import { createTRPCRouter, publicProcedure } from '../trpc';
import { deleteFileFromS3, generatePresignedPost } from '@/libs/aws/s3';
import { generateSignedUrl } from '@/libs/aws/cloudfront';
import { filesTable } from '@/server/db/schema';

export const filesRouter = createTRPCRouter({
  createPresignedPost: publicProcedure
    .input(
      z.object({
        key: z.string(),
        folder: z.string(),
        type: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const presignedPost = await generatePresignedPost(
        input.key,
        input.folder,
        input.type
      );

      return { ...presignedPost };
    }),
  createSignedUrl: publicProcedure
    .input(
      z.object({
        url: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const signedUrl = generateSignedUrl(input.url);

      return { signedUrl };
    }),
  createFile: publicProcedure
    .input(
      z.object({
        url: z.string(),
        photoId: z.number(),
        resolution: z.enum(['low', 'high']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const file = await ctx.db
        .insert(filesTable)
        .values({
          url: input.url,
          photoId: input.photoId,
          resolution: input.resolution,
        })
        .returning();

      return { file };
    }),
  updateFile: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          url: z.string(),
          resolution: z.enum(['low', 'high']),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const oldFile = await ctx.db.query.filesTable.findFirst({
        where: (table, funcs) => funcs.eq(table.id, input.id),
      });

      if (oldFile) {
        deleteFileFromS3(oldFile.url);
      }

      const [file] = await ctx.db
        .update(filesTable)
        .set(input.data)
        .where(eq(filesTable.id, input.id))
        .returning();

      return { file };
    }),
  deleteFile: publicProcedure
    .input(
      z.object({
        id: z.number(),
        url: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const file = await ctx.db
        .delete(filesTable)
        .where(eq(filesTable.id, input.id));

      deleteFileFromS3(input.url);

      return { file };
    }),
});
