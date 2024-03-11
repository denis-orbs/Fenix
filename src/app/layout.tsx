'use client'

import '@rainbow-me/rainbowkit/styles.css'
import '@/src/assets/styles/globals.css'
import type { Metadata } from 'next'
import Head from 'next/head'
import { Poppins } from 'next/font/google'

import Decorator from '@/src/components/Common/Layout/Background'
import Footer from '@/src/components/Common/Layout/Footer'
import Header from '@/src/components/Common/Layout/Header'
import MobileHeader from '@/src/components/Common/Layout/Header/Mobile'

import {
  getDefaultConfig,
  getDefaultWallets,
  lightTheme,
  midnightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { createConfig, WagmiConfig, WagmiProvider } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, arbitrumSepolia, blast, blastSepolia } from 'wagmi/chains'
import { argentWallet, trustWallet, ledgerWallet } from '@rainbow-me/rainbowkit/wallets'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as ReduxProvider } from 'react-redux'
import store, { persistor } from '../state'
import { PersistGate } from 'redux-persist/integration/react'
import dynamic from 'next/dynamic'

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const { wallets } = getDefaultWallets()
const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: '1c866fe90ffb8663a08a1b7412f1b8b4',
  chains: [blast, blastSepolia],
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  ssr: true, // If your dApp uses server side rendering (SSR)
})

const queryClient = new QueryClient()

const Updaters = dynamic(() => import('@/src/state/updater'), { ssr: false })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body suppressHydrationWarning={true} className={`${poppins.className} relative pt-[26px] pb-5`}>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <WagmiProvider config={config}>
              <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                  theme={midnightTheme({
                    accentColor:
                      'linear-gradient(90deg, rgba(254, 94, 53, 0.80) 10.49%, rgba(246, 119, 2, 0.80) 92.04%, rgba(255, 239, 118, 0.80) 158.76%)',
                    accentColorForeground: 'white',
                    fontStack: 'system',
                    overlayBlur: 'small',
                  })}
                >
                  <Updaters />
                  <Header />
                  <MobileHeader />
                  {children}
                  <Footer />
                  <Decorator />
                </RainbowKitProvider>
              </QueryClientProvider>
            </WagmiProvider>
          </PersistGate>
        </ReduxProvider>
      </body>
    </html>
  )
}
