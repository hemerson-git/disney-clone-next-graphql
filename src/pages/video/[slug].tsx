import { NextPageContext } from 'next';
import { clientAPI } from '@/graphql/client';
import { VideoQuery } from '@/graphql/queries';
import { Video } from '@/graphql/generated/graphql';

type DataProps = {
  video: Video;
};

export const getServerSideProps = async (pageContext: NextPageContext) => {
  const pageSlug = pageContext.query.slug;

  const variables = {
    pageSlug,
  };

  const data = (await clientAPI.request(VideoQuery, variables)) as DataProps;
  const { video } = data;

  return {
    props: {
      video,
    },
  };
};

function Video({ video }: DataProps) {
  return (
    <div>
      <h1>{video?.title}</h1>
    </div>
  );
}

export default Video;
