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

  if (!photo) return <div>Photograph not found!</div>;

  return (
    <Container photo={photo}>
      <Content photo={photo} />
    </Container>
  );
}
