import { createPublicClient, fallback, http } from 'viem'
import { mainnet, blast } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: blast,
  transport: fallback([
    http('https://ancient-powerful-emerald.blast-mainnet.quiknode.pro/e93288d60f12f4fbb136d310242ac46df10b8f74/'),
    http('https://rpc.blast.io'),
  ]),
})
