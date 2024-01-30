/* eslint-disable import/no-default-export */
import Liquidity from '@/components/Liquidity'
import LiquidityReadMoreModal from '@/components/Modals/Liquidity/ReadMore'

export default function HomePage() {
  return (
    <main>
      <div className="py-5 max-w-[1820px] mx-auto ">
        <Liquidity />

        <LiquidityReadMoreModal />
      </div>
    </main>
  )
}
