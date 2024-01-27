/* eslint-disable import/no-default-export */
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Decorator from '@/components/Layout/Decorator'
import Footer from '@/components/Layout/Footer'
import Header from '@/components/Layout/Header'

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
      <body suppressHydrationWarning={true} className={`${poppins.className} relative`}>
        <Header />
        {children}
        <Footer />


        <Decorator />
      </body>
    </html>
  )
}
