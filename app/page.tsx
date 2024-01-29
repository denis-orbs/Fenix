/* eslint-disable import/no-default-export */
import Header from "@/components/Layout/Header"
import Liquidity from '@/components/Liquidity'


export default function Home() {
  return (
    <main>
      <div className="p-5">
        <Header />
        <Liquidity />
      </div>
    </main>
  )
}
