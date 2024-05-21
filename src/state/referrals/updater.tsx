import { useEffect } from 'react'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
import axios from 'axios'
import { Fuul } from '@fuul/sdk'
import { usePathname, useRouter } from 'next/navigation'
import { signMessage } from '@wagmi/core'
import { config } from '@/src/app/layout'

export default function ReferralsUpdater() {
  const router = useRouter()
  const pathName = usePathname()
  const { account } = useActiveConnectionDetails()
  // Initialize Fuul SDK
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_FUUL_TRACKING_API_KEY) {
      console.error('Fuul tracking API key is not set')
      return
    }
    Fuul.init({ apiKey: process.env.NEXT_PUBLIC_FUUL_TRACKING_API_KEY, debug: true })
  }, [])

  //   Pageview event
  useEffect(() => {
    const sendPageviewEvent = async () => {
      try {
        await Fuul.sendPageview(pathName)
      } catch (error) {
        console.error('Error sending pageview:', error)
      }
    }
    sendPageviewEvent()
  }, [pathName])
  useEffect(() => {
    const connectWallet = async () => {
      // if (!account) return
      // const signature = await signMessage({
      //   message: 'Accept affiliate on 18-Aug 2023 00:00:00',
      // })
      // console.log(signature)
      // console.log('yeii')
      // const test = await Fuul.sendConnectWallet({
      //   address: account,
      //   signature: signature,
      //   message: 'Accept affiliate on 18-Aug 2023 00:00:00',
      //   accountChainId: 81457,
      // })
      // console.log(test)
    }
    // connectWallet()
  }, [account])

  return null
}
