import { NextPageContext } from 'next';
import { clientAPI } from '@/graphql/client';
import { GraphQLClient, gql } from 'graphql-request';

export const getServerSideProps = async (pageContext: NextPageContext) => {
  const pageSlug = pageContext.query.slug;

  const query = gql`
    query ($pageSlug: String!) {
      video(where: { slug: $pageSlug }) {
        createdAt
        id
        title
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
  `;

  const variables = {
    pageSlug,
  };

  const data = await clientAPI.request(query, variables);
  const { video } = data;

  return {
    props: {
      video,
    },
  };
};

function Video({ video }) {
  return (
    <div>
      <h1>{video?.title}</h1>
    </div>
  );
}

export default Video;
