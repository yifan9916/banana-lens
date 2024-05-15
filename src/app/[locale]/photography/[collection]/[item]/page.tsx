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
  const dict = useTranslations('Photography.Collection.europe.Item');

  const collectionKey = params.collection as CollectionKey;
  const collection = useCollection(collectionKey);

  const image = collection.items.filter((img) => {
    return `${img.id}.jpg` === params.item;
  })[0];

  return (
    <Container>
      <Content
        image={image}
        title={dict('alberobello-01.title')}
        description={dict('alberobello-01.description')}
      />
    </Container>
  );
}
