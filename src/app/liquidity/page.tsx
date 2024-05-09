import Decorator from '@/src/components/Common/Layout/Background'
import Liquidity from '@/src/components/Liquidity'

export const metadata = {
  title: 'Provide Liquidity to Earn Rewards - Fenix Finance',
  description:
    // eslint-disable-next-line max-len
    'Fenix provides the most advanced liquidity platform on Blast with automated position management. Deposit liquidity and sit back to earn rewards.',
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
