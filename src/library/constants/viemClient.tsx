import { createPublicClient, http } from 'viem'
import { mainnet, blast } from 'viem/chains'
 
export const publicClient = createPublicClient({
  chain: blast,
  transport: http()
})