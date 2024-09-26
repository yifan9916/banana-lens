import { trpc } from '../../trpc/react';
import { processCollection } from './process-collection';

export const useCollection = (key: string) => {
  const { data } = trpc.collections.getCollection.useQuery({ key: key });

  console.log('data', data);
  // TODO
  if (!data?.collection) return;

  const collection = processCollection(data.collection);

  return collection;
};
