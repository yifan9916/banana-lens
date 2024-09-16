import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';

// flexible presigner for various S3 operations/simple programmatic uploads
// revisit when looking to implement file downloads
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { env } from '@/env';

const MAX_FILE_SIZE_IN_MB = 1024 * 1024 * 50; // ~50MB

const s3 = new S3Client({
  region: env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export const getPresignedPost = async (key: string, contentType: string) => {
  const { url, fields } = await createPresignedPost(s3, {
    Bucket: env.AWS_BUCKET_NAME,
    Key: key,
    Conditions: [
      ['content-length-range', 0, MAX_FILE_SIZE_IN_MB],
      ['starts-with', '$Content-Type', contentType],
    ],
    Fields: {
      acl: 'bucket-owner-full-control',
      'Content-Type': contentType,
    },
    Expires: 600,
  });

  return { url, fields };
};
