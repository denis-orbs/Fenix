import Decorator from '@/src/components/Common/Layout/Background'
import Liquidity from '@/src/components/Liquidity'

export const metadata = {
  title: 'Liquidity - Fenix Finance',
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
