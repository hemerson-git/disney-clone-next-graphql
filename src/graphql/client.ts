import { GraphQLClient } from 'graphql-request';

const url = process.env.ENDPOINT || '';

export const clientAPI = new GraphQLClient(url, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPH_API}`,
  },
});
