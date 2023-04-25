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

export const VideoSeenMutation = gql`
  mutation ($slug: String!) {
    updateVideo(where: { slug: $slug }, data: { seen: true }) {
      id
      seen
      title
    }
  }
`;

export const VideoPublish = gql`
  mutation publishVideo($slug: String) {
    publishVideo(where: { slug: $slug }, to: PUBLISHED) {
      slug
    }
  }
`;

export const AccountQuery = gql`
  query {
    account(where: { id: "clgudsadp4tsd0am32k4mj0w9" }) {
      avatar {
        url
      }
      username
    }
  }
`;
