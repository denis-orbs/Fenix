import Decorator from '@/src/components/Common/Layout/Background'
import Liquidity from '@/src/components/Liquidity'

export const metadata = {
  title: 'Liquidity - Fenix Finance',
  description:
    // eslint-disable-next-line max-len
    "The Unified Trading and Liquidity Marketplace for Blast | Audited by @hatsfinance <br/> <a href='https://www.fenixfinance.io/trade/swap'>Trade</a> - <a href='https://www.fenixfinance.io/dashboard'>Dashboard</a> - <a href='https://www.fenixfinance.io/liquidity'>Liquidity</a> - <a href='https://www.fenixfinance.io/points-program'>Fenix Rings</a>",
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
