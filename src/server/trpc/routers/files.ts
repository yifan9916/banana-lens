import { z } from 'zod';

import { getPresignedPost } from '@/libs/aws/s3';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const filesRouter = createTRPCRouter({
  createPresignedUrl: publicProcedure
    .input(
      z.object({
        key: z.string(),
        type: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const presignedPost = await getPresignedPost(input.key, input.type);

      return { ...presignedPost };
    }),
});
