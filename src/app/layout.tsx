'use client'

import '@/src/assets/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { Poppins } from 'next/font/google'
import Head from 'next/head'
import { http, type Chain } from 'viem'

import Decorator from '@/src/components/Common/Layout/Background'
import Footer from '@/src/components/Common/Layout/Footer'
import Header from '@/src/components/Common/Layout/Header'
import MobileHeader from '@/src/components/Common/Layout/Header/Mobile'

import { getDefaultConfig, getDefaultWallets, midnightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { argentWallet, ledgerWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { WagmiProvider } from 'wagmi'
import { blast, blastSepolia, localhost, polygon } from 'wagmi/chains'
import store, { persistor } from '../state'

console.log(typeof localhost)

export const polygonFork = {
  id: 31337,
  name: 'Polygon Fork',
  nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  rpcUrls: {
    default: { http: ['http://localhost:8545'] },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    },
  },
} as const satisfies Chain
const poppins = Poppins({
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
const { wallets } = getDefaultWallets()
export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: '1c866fe90ffb8663a08a1b7412f1b8b4',
  chains: [polygonFork, polygon, blast, blastSepolia],
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
