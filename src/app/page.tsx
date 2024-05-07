/* eslint-disable max-len */
import Landing from '@/src/components/Landing'
import Main from '@/src/components/Landing/Main'

export const metadata = {
  title: 'Fenix Finance',
  description: "The Unified Trading and Liquidity Marketplace for Blast | Audited by @hatsfinance <br/> <a href='https://www.fenixfinance.io/trade/swap'>Trade</a> - <a href='https://www.fenixfinance.io/dashboard'>Dashboard</a> - <a href='https://www.fenixfinance.io/liquidity'>Liquidity</a> - <a href='https://www.fenixfinance.io/points-program'>Fenix Rings</a>",
}
const HomePage = () => {
  return (
    <main>
      <div className="pt-10 mx-auto">
        <Main/>
        <Landing />
      </div>
    </main>
  )
}

export default HomePage
