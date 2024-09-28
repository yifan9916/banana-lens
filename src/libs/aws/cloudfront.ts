import { getSignedUrl } from '@aws-sdk/cloudfront-signer';

import { env } from '@/env';

export const cloudfrontDistributionDomain =
  'https://dfx6ax10jig7t.cloudfront.net';

const HOUR_IN_MS = 1000 * 60 * 60;

export const generateSignedUrl = (url: string) => {
  const isPublicFile = url.indexOf('/public/') !== -1;

  if (isPublicFile) return url;

  const signedUrl = getSignedUrl({
    url,
    dateLessThan: new Date(Date.now() + HOUR_IN_MS).toString(),
    keyPairId: env.CLOUDFRONT_KEY_PAIR_ID,
    privateKey: env.CLOUDFRONT_PRIVATE_KEY,
  });

  return signedUrl;
};
