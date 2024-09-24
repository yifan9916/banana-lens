import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { v4 as uuidv4 } from 'uuid';

// flexible presigner for various S3 operations/simple programmatic uploads
// revisit when looking to implement file downloads
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// import { env } from '@/env';

const MAX_FILE_SIZE_IN_MB = 1024 * 1024 * 50; // ~50MB

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const generatePresignedPost = async (
  key: string,
  contentType: string
) => {
  const { url, fields } = await createPresignedPost(s3, {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `${uuidv4()}-${key}`,
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

export const deleteFileFromS3 = async (url: string) => {
  const key = url.replace(
    `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/`,
    ''
  );

  const deleteCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
  });

  try {
    s3.send(deleteCommand);
    console.log(`File ${key} deleted successfully`);
  } catch (e) {
    console.error(`Error deleting file ${key}:`, e);
  }
};
