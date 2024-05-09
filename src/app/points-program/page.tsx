/* eslint-disable max-len */
import Decorator from '@/src/components/Common/Layout/Background'
import PointsProgram from '@/src/components/PointsProgram'
import React from 'react'


export const metadata = {
  title: 'Deposit Liquidity to Earn Fenix Rings - Fenix Finance',
  description:
    'Fenix Rings will be convertible into the Fenix Airdrop at our token generation event. Take a stake in the main trading and liquidity marketplace for Blast.',
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
