import Decorator from '@/src/app/components/Common/Layout/Background'
import Navigation from '@/src/app/components/Trade/Common/Navigation'

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
