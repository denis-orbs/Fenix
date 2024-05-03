import Swap from '@/src/components/Trade/Swap'
import TradeLayout from '@/src/components/Trade/Common/Layout'
export const metadata = {
  title: 'Swap - Fenix Finance',
}

const TradePage = () => {
  return (
    <TradeLayout>
      <Swap />
    </TradeLayout>
  )
}

export default TradePage
