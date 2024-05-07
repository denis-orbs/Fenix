/* eslint-disable max-len */
import Decorator from '@/src/components/Common/Layout/Background'
import Dashboard from '@/src/components/Dashboard'

export const metadata = {
  title: 'Dashboard - Fenix Finance',
  description:
    "The Unified Trading and Liquidity Marketplace for Blast | Audited by @hatsfinance <br/> <a href='https://www.fenixfinance.io/trade/swap'>Trade</a> - <a href='https://www.fenixfinance.io/dashboard'>Dashboard</a> - <a href='https://www.fenixfinance.io/liquidity'>Liquidity</a> - <a href='https://www.fenixfinance.io/points-program'>Fenix Rings</a>",
}

const DashboardPage = () => {
  return (
    <main>
      <div className="container">
        <Dashboard />
        <Decorator />
      </div>
    </main>
  )
}

export default DashboardPage
