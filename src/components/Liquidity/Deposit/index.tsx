'use client'
import { useShowChart } from "@/src/state/user/hooks"
import Panel from '@/src/components/Liquidity/Deposit/Panel'
import Chart from '@/src/components/Liquidity/Deposit/Chart'
import { getPair } from '@/src/library/hooks/liquidity/useClassic'
import { useEffect, useState } from 'react'
import { Address } from 'viem'
import { useSearchParams } from "next/navigation"

const DepositLiquidity = () => {
  const searchParams = useSearchParams()
  const showChart = useShowChart()
  const [pairAddress, setPairAddress] = useState<Address>('0x')
  const [token0, setToken0] = useState(searchParams.get('token0'))
  const [token1, setToken1] = useState(searchParams.get('token1'))

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

  useEffect(() => {
    setToken0(searchParams.get('token0'))
    setToken1(searchParams.get('token1'))
    console.log('token1 :>> ', token1)
  }, [searchParams])


  return (
    <div className="flex flex-col items-start gap-6 mb-4 xl:gap-10 xl:flex-row">
      <div className="flex flex-col w-full h-[100%]">
        <div className="flex flex-wrap justify-center w-full h-[100%] xl:gap-5 mb-10 xl:flex-nowrap">
          <Panel />
          { showChart && <Chart token0={token0} token1={token1}/> }
        </div>
      </div>
    </div>
  )
}

export default DepositLiquidity
