import { getSignedUrl } from '@aws-sdk/cloudfront-signer';

export const cloudfrontDistributionDomain =
  'https://dfx6ax10jig7t.cloudfront.net';

const MINUTE_IN_MS = 1000 * 60 * 60;

export const generateSignedUrl = (url: string) => {
  const signedUrl = getSignedUrl({
    url,
    dateLessThan: new Date(Date.now() + MINUTE_IN_MS).toString(),
    keyPairId: process.env.CLOUDFRONT_KEY_PAIR_ID!,
    privateKey: process.env.CLOUDFRONT_PRIVATE_KEY!,
  });

  return signedUrl;
};
