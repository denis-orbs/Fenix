import Swap from '@/src/components/Trade/Swap'
import TradeLayout from '@/src/components/Trade/Common/Layout'
export const metadata = {
  title: 'Swap - Fenix Finance',
  description:
    // eslint-disable-next-line max-len
    'Trade on Blast',
}

const TradePage = () => {
  return (
    <TradeLayout>
      <Swap />
    </TradeLayout>
  )
}

export default TradePage
