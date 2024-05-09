import { AlgebraSubgraph, ProtocolSubgraph } from '../../web3/ContractAddresses'
import createApolloClient from './index'

// const baseClient = createApolloClient(`https://api.thegraph.com/subgraphs/name/navid-fkh/symmio_base`)
// const baseClient082 = createApolloClient(`https://api.studio.thegraph.com/query/62472/intentx-main_082/version/latest`)

export const blastClient = createApolloClient(ProtocolSubgraph)

export default function getProtocolCoreClient() {
  return blastClient
}
export const alebraClient = createApolloClient(AlgebraSubgraph)
export function getAlgebraClient() {
  return alebraClient
}
