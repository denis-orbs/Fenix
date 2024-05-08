/* eslint-disable max-len */
import Decorator from '@/src/components/Common/Layout/Background'
import PointsProgram from '@/src/components/PointsProgram'
import React from 'react'


export const metadata = {
  title: 'Fenix Rings - Fenix Finance',
  description: 'Track your Rings balance for the Fenix airdrop',
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
