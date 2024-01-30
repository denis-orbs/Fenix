/* eslint-disable import/no-default-export */
import Liquidity from '@/components/Liquidity'
import LiquidityReadMoreModal from '@/components/Modals/Liquidity/ReadMore'

export default function Home() {
  return (
    <main>
      <div className="p-5">
        <Liquidity />

        <LiquidityReadMoreModal />
      </div>
    </main>
  )
}
