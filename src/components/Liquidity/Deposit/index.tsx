'use client'

import Panel from '@/src/components/Liquidity/Deposit/Panel'
import Chart from '@/src/components/Chart'
import { getPair } from '@/src/library/hooks/liquidity/useClassic'
import { useEffect, useState } from 'react'
import { Address } from 'viem'

const DepositLiquidity = () => {
  const [pairAddress, setPairAddress] = useState<Address>('0x')
  useEffect(() => {
    const asyncGetPair = async () => {
      const hash = window.location.hash
      const hashValue = hash.substring(1)
      const pairString = hashValue.split('-')
      if (pairString.length < 1) return

      const pair: any = await getPair(pairString[1] as Address, pairString[2] as Address, pairString[0] === 'STABLE')
      if (pair != '0x0') setPairAddress(pair)
      else setPairAddress('0x0000000000000000000000000000000000000000')
    }

    asyncGetPair()
  }, [])
  return (
    <div className="flex flex-col items-start gap-6 mb-4 xl:gap-10 xl:flex-row">
      <div className="flex flex-col w-full">
        <div className="flex flex-wrap w-full gap-5 mb-10 xl:flex-nowrap">
          <Panel />
          <iframe
            id="dextools-widget"
            title="DEXTools Trading Chart"
            width="10000"
            height="730"
            src={`https://www.dextools.io/widget-chart/en/blast/pe-light/0xf00da13d2960cf113edcef6e3f30d92e52906537?theme=dark&chartType=1&chartResolution=30&drawingToolbars=true`}
          ></iframe>

          {/* <Chart className="w-full xl:w-full" /> */}
        </div>
      </div>
    </div>
  )
}

export default DepositLiquidity
