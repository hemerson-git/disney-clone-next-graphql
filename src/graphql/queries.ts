import { gql } from 'graphql-request';

export const VideosQuery = gql`
  query {
    videos {
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

export const VideoQuery = gql`
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
