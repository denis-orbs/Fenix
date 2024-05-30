import { useEffect, useState } from 'react'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
import axios from 'axios'
import { Fuul } from '@fuul/sdk'
import { usePathname, useRouter } from 'next/navigation'
// import { signMessage } from '@wagmi/core'
import { config } from '@/src/app/layout'
import { useSignMessage } from 'wagmi'
import {
  useIsReferralSystemInitialized,
  useSetReferralCodeCallback,
  useSetReferralSystemInitializedCallback,
} from './hooks'

export default function ReferralsUpdater() {
  const pathName = usePathname()
  const { account } = useActiveConnectionDetails()
  // Initialize Fuul SDK
  const isReferralSystemInitialized = useIsReferralSystemInitialized()
  const setReferralSystemInitialized = useSetReferralSystemInitializedCallback()
  const setReferralCode = useSetReferralCodeCallback()

  useEffect(() => {
    const initializeFuul = async (attempts = 0) => {
      if (!process.env.NEXT_PUBLIC_FUUL_TRACKING_API_KEY) {
        console.log('Fuul tracking API key is not set')
        return
      }
      try {
        await Fuul.init({
          apiKey: process.env.NEXT_PUBLIC_FUUL_TRACKING_API_KEY,
          debug: process.env.NODE_ENV === 'development',
        })
        setReferralSystemInitialized(true)
      } catch (error) {
        console.error('Failed to initialize Fuul:', error)
        const maxAttempts = 3
        if (attempts < maxAttempts) {
          setTimeout(() => initializeFuul(attempts + 1), 2000)
        }
      }
    }

    initializeFuul()
  }, [])

  useEffect(() => {
    if (!account || !isReferralSystemInitialized) return
    const getAffiliateCode = async () => {
      try {
        const affiliateCode = await Fuul.getAffiliateCode(account)
        if (affiliateCode) {
          setReferralCode(affiliateCode)
        } else {
          setReferralCode('')
        }
      } catch (error) {
        setReferralCode('')
      }
    }
    getAffiliateCode()
  }, [account, isReferralSystemInitialized])

  //   Pageview event
  useEffect(() => {
    if (!isReferralSystemInitialized) return
    const sendPageviewEvent = async () => {
      try {
        await Fuul.sendPageview()
      } catch (error) {
        console.error('Error sending pageview:', error)
      }
    }
    sendPageviewEvent()
  }, [pathName, isReferralSystemInitialized])

  return null
}
