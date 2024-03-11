import Decorator from '@/src/components/Common/Layout/Background'
import Navigation from '@/src/components/Trade/Common/Navigation'

interface TradeLayoutProps {
  children: React.ReactNode
}

const TradeLayout = ({ children }: TradeLayoutProps) => {
  return (
    <section className="container py-5">
      <Navigation />
      {children}
      <Decorator />
    </section>
  )
}

export default TradeLayout
