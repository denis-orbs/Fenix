/* eslint-disable import/no-default-export */
import Image from 'next/image'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import Head from 'next/head'
import { Poppins } from 'next/font/google'

import Footer from '@/components/Common/Layout/Footer'
import Header from '@/components/Common/Layout/Header'
import MobileHeader from '@/components/Common/Layout/Header/Mobile'
import Decorator from '@/components/Common/Layout/Background'

export const metadata: Metadata = {
  title: 'Fenix',
  description: 'Finance App',
}

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
//good
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

      <body suppressHydrationWarning={true} className={`${poppins.className} relative pt-[26px] pb-5`}>
        <Header />
        <MobileHeader />
        {children}
        <Footer />
        <Decorator />
      </body>
    </html>
  )
}
