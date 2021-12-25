import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://virtualllollypop.netlify.app//.netlify/functions/lollygraph',
  cache: new InMemoryCache()
});