import { useTranslations } from 'next-intl';

import { useCollection } from '@/libs/photography/use-collection';
import type { CollectionKey } from '@/libs/photography/types';
import { Container } from './components/container';
import { Content } from './components/content';

type Props = {
  params: {
    collection: string;
    item: string;
  };
};

export default function Page(props: Props) {
  const { params } = props;
  const collectionKey = params.collection as CollectionKey;

  const dict = useTranslations(`Photography.Collection.${collectionKey}.Item`);
  const collection = useCollection(collectionKey);

  const image = collection.items.filter((img) => {
    return `${img.id}.jpg` === params.item;
  })[0];

  return (
    <Container>
      <Content
        image={image}
        title={dict(`${image.id}.title`)}
        description={dict(`${image.id}.description`)}
      />
    </Container>
  );
}
