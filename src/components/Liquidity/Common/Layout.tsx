import Navigation from '@/src/components/Liquidity/Common/Navigation'
import Decorator from '@/src/components/Common/Layout/Background'

interface LiquidityLayoutProps {
  children: React.ReactNode
}

const LiquidityLayout = ({ children }: LiquidityLayoutProps) => {
  return (
    <section className="container py-5">
      <Navigation />
      {children}
      <Decorator />
    </section>
  )
}

export default LiquidityLayout
