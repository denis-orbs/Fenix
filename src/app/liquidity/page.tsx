import Decorator from '@/src/components/Common/Layout/Background'
import Liquidity from '@/src/components/Liquidity'

export const metadata = {
  title: 'Liquidity - Fenix Finance',
  description:
    // eslint-disable-next-line max-len
    'Earn Swap Fees, Fenix Rings, Blast Gold and Blast Points',
}
const LiquidityPage = () => {
  return (
    <main>
      <div className="container">
        <Liquidity />
        <Decorator />
      </div>
    </main>
  )
}

export default LiquidityPage
