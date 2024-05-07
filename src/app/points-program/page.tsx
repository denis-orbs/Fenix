/* eslint-disable max-len */
import Decorator from '@/src/components/Common/Layout/Background'
import PointsProgram from '@/src/components/PointsProgram'
import React from 'react'


export const metadata = {
  title: 'Fenix Rings - Fenix Finance',
  description:
    "The Unified Trading and Liquidity Marketplace for Blast | Audited by @hatsfinance <br/> <a href='https://www.fenixfinance.io/trade/swap'>Trade</a> - <a href='https://www.fenixfinance.io/dashboard'>Dashboard</a> - <a href='https://www.fenixfinance.io/liquidity'>Liquidity</a> - <a href='https://www.fenixfinance.io/points-program'>Fenix Rings</a>",
}

const PointsProgramPage = () => {
  return (
    <div className="container">
      <Decorator />
      <PointsProgram />
    </div>
  )
}

export default PointsProgramPage
