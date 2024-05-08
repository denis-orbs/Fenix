/* eslint-disable max-len */
import Landing from '@/src/components/Landing'
import Main from '@/src/components/Landing/Main'

export const metadata = {
  title: 'Fenix Finance',
  description: 'The Unified Trading and Liquidity Marketplace for Blast',
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
