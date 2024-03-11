import createApolloClient from './index'

// const baseClient = createApolloClient(`https://api.thegraph.com/subgraphs/name/navid-fkh/symmio_base`)
// const baseClient082 = createApolloClient(`https://api.studio.thegraph.com/query/62472/intentx-main_082/version/latest`)

const blastClient = createApolloClient(
  `https://api.studio.thegraph.com/query/67572/fenix-protocol-subgraph/version/latest`
)

export default function getProtocolCoreClient() {
  return blastClient
}
