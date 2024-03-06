'use client'
import '@/src/assets/styles/globals.css'
import type { Metadata } from 'next'
import Head from 'next/head'
import { Poppins } from 'next/font/google'

import Decorator from '@/src/app/components/Common/Layout/Background'
import Footer from '@/src/app/components/Common/Layout/Footer'
import Header from '@/src/app/components/Common/Layout/Header'
import MobileHeader from '@/src/app/components/Common/Layout/Header/Mobile'

import { getDefaultWallets, lightTheme, midnightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, arbitrumSepolia } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const { chains, publicClient } = configureChains(
  [arbitrum],
  [alchemyProvider({ apiKey: 'HnZD2JznEg0TvSdDvtgBjxbXdk5j8-yX' }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: '1c866fe90ffb8663a08a1b7412f1b8b4',
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body suppressHydrationWarning={true} className={`${poppins.className} relative pt-[26px] pb-5`}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            chains={chains}
            theme={midnightTheme({
              accentColor:
                'linear-gradient(90deg, rgba(254, 94, 53, 0.80) 10.49%, rgba(246, 119, 2, 0.80) 92.04%, rgba(255, 239, 118, 0.80) 158.76%)',
              accentColorForeground: 'white',
              fontStack: 'system',
              overlayBlur: 'small',
            })}
          >
            <Header />
            <MobileHeader />
            {children}
            <Footer />
            <Decorator />
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}
