'use client'

import Community from './Community'
import HowItWorks from './HowItWorks'
import Insights from './Insights'
import Overview from './Overview'
import Partners from './Partners'
import Security from './Security'
import Supercharged from './SuperCharged'

const Landing = () => {
  return (
    <main>
      <HowItWorks />
      <Supercharged/>
      <Overview />
      <Partners />
      <Insights/>
      <Community/>
      <Security />
    </main>
  )
}

export default Landing
