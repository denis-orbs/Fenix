import { useState } from 'react'
import TokensSelector from '@/src/components/Liquidity/Common/TokensSelector'
import SetRange from './SetRange'
import { Button } from '@/src/components/UI'

const ConcentratedDepositLiquidityManual = () => {
  const [firstToken, setFirstToken] = useState({ name: 'Fenix', symbol: 'FNX' })
  const [firstValue, setFirstValue] = useState(0)
  const [secondToken, setSecondToken] = useState({ name: 'ethereum', symbol: 'ETH' })
  const [secondValue, setSecondValue] = useState(0)

  return (
    <>
      <SetRange />
      <TokensSelector
        firstToken={firstToken}
        secondToken={secondToken}
        firstValue={firstValue}
        secondValue={secondValue}
        setFirstToken={(token) => setFirstToken(token)}
        setSecondToken={(token) => setSecondToken(token)}
        setFirstValue={(value) => setFirstValue(value)}
        setSecondValue={(value) => setSecondValue(value)}
      />
      <Button className="w-full mx-auto !text-xs !h-[49px]" variant="tertiary">
        Create Position
      </Button>
    </>
  )
}

export default ConcentratedDepositLiquidityManual
