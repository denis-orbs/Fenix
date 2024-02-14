/* eslint-disable import/no-default-export */
import Image from 'next/image'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import Head from 'next/head'
import { Poppins, Michroma } from 'next/font/google'

import Footer from '@/components/Common/Layout/Footer'
import Header from '@/components/Common/Layout/Header'
import MobileHeader from '@/components/Common/Layout/Header/Mobile'

export const metadata: Metadata = {
  title: 'Fenix',
  description: 'Finance App',
}

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body suppressHydrationWarning={true} className={`${poppins.className} relative py-3`}>
        <Header />
        <MobileHeader />
        {children}
        <Footer />

      </body>
    </html>
  )
}
