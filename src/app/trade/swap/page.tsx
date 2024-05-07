import Swap from '@/src/components/Trade/Swap'
import TradeLayout from '@/src/components/Trade/Common/Layout'
export const metadata = {
  title: 'Swap - Fenix Finance',
  description:
    // eslint-disable-next-line max-len
    "The Unified Trading and Liquidity Marketplace for Blast | Audited by @hatsfinance <br/> <a href='https://www.fenixfinance.io/trade/swap'>Trade</a> - <a href='https://www.fenixfinance.io/dashboard'>Dashboard</a> - <a href='https://www.fenixfinance.io/liquidity'>Liquidity</a> - <a href='https://www.fenixfinance.io/points-program'>Fenix Rings</a>",
}

const TradePage = () => {
  return (
    <TradeLayout>
      <Swap />
    </TradeLayout>
  )
}

export default TradePage
