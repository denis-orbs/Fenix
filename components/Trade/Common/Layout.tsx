import Navigation from '@/components/Trade/Common/Navigation'

interface TradeLayoutProps {
  children: React.ReactNode
}

const TradeLayout = ({ children }: TradeLayoutProps) => {
  return (
    <section className="container">
      <Navigation />
      {children}
    </section>
  )
}

export default TradeLayout
