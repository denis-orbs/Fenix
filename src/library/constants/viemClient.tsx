import { createPublicClient, http } from 'viem'
import { mainnet, blastSepolia } from 'viem/chains'
 
export const publicClient = createPublicClient({
  chain: blastSepolia,
  transport: http()
})