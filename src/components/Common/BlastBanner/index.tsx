'use client'
import { useState } from 'react'

import { Button } from '@/src/components/UI'

const BlastBanner = () => {
  const [close, setClose] = useState<boolean>(false)

  if (close) return null

  const handlerClose = () => setClose(true)

  return (
    <div className="blast-banner">
      <div className="text-white absolute text-sm right-3 top-2 z-20 cursor-pointer" onClick={handlerClose}>
        <span className="icon-x"></span>
      </div>
      <div className="relative z-10">
        <p className="text-white text-xs">Deposit liquidty to earn your share of</p>
        <h4 className="text-gradient text-sm xs:text-base md:text-xl lg:text-2xl">
          Blast Gold, Blast Points and Fenix Orbits
        </h4>
      </div>
      <Button variant="primary" className="relative z-10" href="/liquidity">
        <span>Deposit Now</span>
      </Button>
    </div>
  )
}

export default BlastBanner
