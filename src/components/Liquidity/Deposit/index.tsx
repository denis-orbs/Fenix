'use client'
import { Switch } from '@/src/components/UI'
import { useSetChart, useShowChart } from "@/src/state/swap-chart/hooks"
import Panel from '@/src/components/Liquidity/Deposit/Panel'
import Chart from '@/src/components/Liquidity/Deposit/Chart'
import { getPair } from '@/src/library/hooks/liquidity/useClassic'
import { useEffect, useState } from 'react'
import { Address } from 'viem'

const DepositLiquidity = () => {
  const showChart = useShowChart()
  const setChart = useSetChart()
  const [isChartVisible, setIsChartVisible] = useState(showChart)
  const handleSwitch = () => {
    setChart(!isChartVisible)
    setIsChartVisible(prevState => !prevState)
  }
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
      <div className="flex flex-col w-full h-[100%]">
        <div className="flex flex-wrap justify-center w-full h-[100%] xl:gap-5 mb-10 xl:flex-nowrap">
          <Panel />
          { showChart && <Chart /> }
          <div className={`flex items-center gap-3 w-[100%] justify-center py-4 xl:hidden ${showChart ? 'max-xl:bg-shark-400 max-xl:bg-opacity-40 max-xl:rounded-b-2xl' : ''}`}>
            <Switch active={showChart} setActive={handleSwitch} />
            <div className='text-xs text-shark-100 font-normal whitespace-nowrap'>{showChart ? 'Hide' : 'Show'} Trading View</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepositLiquidity
