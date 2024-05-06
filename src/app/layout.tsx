'use client'

import '@/src/assets/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { Poppins } from 'next/font/google'
import Head from 'next/head'

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
import { createConfig, fallback, http, WagmiProvider } from 'wagmi'
import { blast, blastSepolia, holesky, polygon } from 'wagmi/chains'
import store, { persistor } from '../state'
import { usePathname } from 'next/navigation'
import Slippage from '../components/Modals/Slippage'
import { Toaster } from 'react-hot-toast'
import NotificationFeed from '../components/Common/Notification/NotificationFeed'

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const { wallets } = getDefaultWallets()

export const configwallets = createConfig({
  chains: [blast],
  transports: {
    [blast.id]: fallback([
      http('https://ancient-powerful-emerald.blast-mainnet.quiknode.pro/e93288d60f12f4fbb136d310242ac46df10b8f74/'),
      http('https://rpc.blast.io'),
    ]),
  },
})

export const config = getDefaultConfig({
  appName: 'Fenix Finance',
  projectId: '1c866fe90ffb8663a08a1b7412f1b8b4',

  chains: [
    {
      ...blast,
      iconUrl: '/static/chains/blast.png',
    },
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [blastSepolia] : []),
  ],
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  ssr: true,
})

const queryClient = new QueryClient()

const Updaters = dynamic(() => import('@/src/state/updater'), { ssr: false })
// Todas las clases que tienen como condicion "pathname === '/' son tomadas en cuenta para el landing page de forma que no modifiquen estilos importantes en el resto de la aplicación"
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body
        suppressHydrationWarning={true}
        className={`${poppins.className}  relative pt-[26px]  mix-blend-lighten ${pathname === '/' ? 'bg-cover ' : ''}`}
      >
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <WagmiProvider config={config}>
              <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                  initialChain={blast.id}
                  theme={midnightTheme({
                    accentColor:
                      'linear-gradient(90deg, rgba(254, 94, 53, 0.80) 10.49%, rgba(246, 119, 2, 0.80) 92.04%, rgba(255, 239, 118, 0.80) 158.76%)',
                    accentColorForeground: 'white',
                    fontStack: 'system',
                    overlayBlur: 'small',
                  })}
                >
                  <div className="flex flex-col min-h-screen">
                    <Updaters />
                    <Header />
                    <Slippage />
                    <Toaster />
                    <NotificationFeed />
                    <MobileHeader />
                    <div className="flex-1">{children}</div>
                    <div className="mt-auto">
                      <Footer />
                    </div>
                    <Decorator />
                  </div>
                </RainbowKitProvider>
              </QueryClientProvider>
            </WagmiProvider>
          </PersistGate>
        </ReduxProvider>
      </body>
    </html>
  )
}
