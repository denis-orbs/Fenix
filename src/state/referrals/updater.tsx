import { useEffect } from 'react'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
import axios from 'axios'
import { Fuul } from '@fuul/sdk'
import { usePathname, useRouter } from 'next/navigation'

export default function ReferralsUpdater() {
  const router = useRouter()
  const pathName = usePathname()
  // Initialize Fuul SDK
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_FUUL_TRACKING_API_KEY) return
    Fuul.init({ apiKey: process.env.NEXT_PUBLIC_FUUL_TRACKING_API_KEY })
  }, [])

  //   Pageview event
  useEffect(() => {
    const sendPageviewEvent = async () => {
      try {
        await Fuul.sendPageview()
      } catch (error) {
        console.error('Error sending pageview:', error)
      }
    }
    sendPageviewEvent()
  }, [pathName])

  return null
}
