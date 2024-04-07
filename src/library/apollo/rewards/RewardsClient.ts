import { ApolloClient, InMemoryCache } from '@apollo/client'

const rewardsClient = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/67572/fenix-bribev3/version/latest',
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
})

export default rewardsClient
