import { HydrateClient, trpc } from '@/libs/trpc/server';
import { Container } from './components/container';
import { Content } from './components/content';
import { getPhoto } from '@/libs/photography/get-photo';

type Props = {
  params: {
    collection: string;
    item: string;
  };
};

export default async function Page(props: Props) {
  const { params } = props;

  const photo = await getPhoto(params.item);

  if (!photo) return <div>Photograph not found! !</div>;

  await trpc.photos.getPhoto.prefetch({ key: params.item });

  return (
    <HydrateClient>
      <Container>
        <Content photo={photo} />
      </Container>
    </HydrateClient>
  );
}
