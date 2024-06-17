import { useEffect, useState } from 'react'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
import axios from 'axios'
import { Fuul } from '@fuul/sdk'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
// import { signMessage } from '@wagmi/core'
import { useSignMessage } from 'wagmi'
import {
  useIsReferralSystemInitialized,
  useSetReferralCodeCallback,
  useSetReferralSystemInitializedCallback,
} from './hooks'

export default function ReferralsUpdater() {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const { account, isConnected } = useActiveConnectionDetails()
  // Initialize Fuul SDK
  // Fuul project -> fenix
  const isReferralSystemInitialized = useIsReferralSystemInitialized()
  const setReferralSystemInitialized = useSetReferralSystemInitializedCallback()
  const setReferralCode = useSetReferralCodeCallback()
  const { signMessageAsync } = useSignMessage()

  useEffect(() => {
    const initializeFuul = async (attempts = 0) => {
      if (!process.env.NEXT_PUBLIC_FUUL_TRACKING_API_KEY) {
        return
      }
      try {
        await Fuul.init({
          apiKey: process.env.NEXT_PUBLIC_FUUL_TRACKING_API_KEY,
          debug: true,
        })
        setReferralSystemInitialized(true)
        console.log('Fuul initialized successfully!')
      } catch (error) {
        console.log('Failed to initialize Fuul:', error)
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

  useEffect(() => {
    const referrer = searchParams.get('referrer')
    if (referrer) {
      localStorage.setItem('referrer', referrer)
    }
  }, [searchParams])
  useEffect(() => {
    const handleUserReferral = async () => {
      const referrer = localStorage.getItem('referrer')
      const accountsAlreadyInvited = localStorage.getItem('accountsAlreadyInvited')
      const accounts = accountsAlreadyInvited ? JSON.parse(accountsAlreadyInvited) : []

      try {
        if (!referrer || !account || !isConnected) return
        if (!accounts.includes(account)) {
          const message =
            `[Rings Boost] Accept affiliate and boost your rings earnings by 5%.\n\n` +
            `Issued at: ${new Date().toLocaleString()}`
          const signature = await signMessageAsync({ message })
          if (!process.env.NEXT_PUBLIC_FUUL_TRACKING_API_KEY) {
            throw new Error('Fuul tracking API key is not set')
          }
          await Fuul.init({
            apiKey: process.env.NEXT_PUBLIC_FUUL_TRACKING_API_KEY,
            debug: false,
          })
          await Fuul.sendConnectWallet({
            address: account,
            signature,
            message,
          })

          accounts.push(account)
          localStorage.setItem('accountsAlreadyInvited', JSON.stringify(accounts))
        }
        console.log('end')
      } catch (error) {
        console.log(error)
      }
    }

    handleUserReferral()
  }, [account, signMessageAsync, isConnected])

  return null
}
