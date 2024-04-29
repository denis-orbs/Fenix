import { useEffect, useState } from 'react'

import { Button } from '@/src/components/UI'
import InputRange from '@/src/components/UI/SliderRange/InputRange'
import StrategyButton, { StrategyType } from './StrategyButton'
import Input from './Input'
import { formatNumber } from '@/src/library/utils/numbers'
import { IToken } from '@/src/library/types'

const SetRange = ({
  setCurrentPercentage,
  currentPercentage,
  price1,
  price2,
  shownPercentage,
  token1,
  token2,
  multiplier,
  handleMinMaxInput,
  isInverse,
}: {
  setCurrentPercentage: any
  currentPercentage: any
  price1: any
  price2: any
  shownPercentage?: any
  token1?: IToken
  token2?: IToken
  multiplier?: any
  handleMinMaxInput?: any
  isInverse?: any
}) => {
  const [currentStrategy, setCurrentStrategy] = useState<StrategyType | null>(null)
  const [currentPercentageShown, setCurrentPercentShown] = useState([5, 5])

  useEffect(() => {
    if (currentStrategy == StrategyType.NARROW) handlePercentageChange([-2.5, 2.5], false)
    if (currentStrategy == StrategyType.BALANCED) handlePercentageChange([-6, 6], false)
    if (currentStrategy == StrategyType.WIDE) handlePercentageChange([-15, 15], false)
    if (currentStrategy == StrategyType.FULL_RANGE) handlePercentageChange([-1, -1]) //inf
  }, [currentStrategy])

  const handlePercentageChange = (percent: any, s = true) => {
    if (percent[0] != -1 && percent[1] != -1) {
      percent[0] = isInverse ? invertPercentage(-percent[0]) : percent[0]
      percent[1] = isInverse ? invertPercentage(-percent[1]) : percent[1]
    }
    setCurrentPercentage([percent[0], percent[1]])
    if (s) setCurrentStrategy(null)
  }

  function invertPercentage(percent: number) {
    const remaining = 1 + percent / 100
    return (1 / remaining - 1) * 100
  }

  return (
    <div className="bg-shark-400 bg-opacity-40 py-[29px] px-[19px] border border-shark-950 rounded-[10px] mb-2.5">
      <div className="mb-2 text-xs leading-normal text-white">Selected Range</div>

      <div className="flex gap-[7px] mb-3">
        <Button
          variant={currentPercentage[0] === -5 && currentPercentage[1] === 5 ? 'primary' : 'tertiary'}
          className="flex-grow"
          onClick={() => handlePercentageChange([-5, 5])}
        >
          5%
        </Button>
        <Button
          variant={currentPercentage[0] === -10 && currentPercentage[1] === 10 ? 'primary' : 'tertiary'}
          className="flex-grow"
          onClick={() => handlePercentageChange([-10, 10])}
        >
          10%
        </Button>
        <Button
          variant={currentPercentage[0] === -25 && currentPercentage[1] === 25 ? 'primary' : 'tertiary'}
          className="flex-grow"
          onClick={() => handlePercentageChange([-25, 25])}
        >
          25%
        </Button>
        <Button
          variant={currentPercentage[0] === -50 && currentPercentage[1] === 50 ? 'primary' : 'tertiary'}
          className="flex-grow"
          onClick={() => handlePercentageChange([-50, 50])}
        >
          50%
        </Button>
        <Button
          variant={currentPercentage[0] === -100 && currentPercentage[1] === 100 ? 'primary' : 'tertiary'}
          className="flex-grow"
          onClick={() => handlePercentageChange([-100, 100])}
        >
          100%
        </Button>
      </div>

      <div className="bg-shark-400 bg-opacity-40 border border-shark-950 px-5 py-2 flex justify-between items-center gap-2.5 rounded-[10px] mb-4">
        <div className="flex items-center gap-2 text-white opacity-75">
          <span>±</span>
          <span className="text-[30px] leading-normal font-light">
            {currentPercentageShown[0] == -1 && currentPercentageShown[1] == -1
              ? 'Full Range'
              : `${currentPercentageShown[1]}`}
            %
          </span>
        </div>
        <div className="max-w-[274px] flex-grow">
          <InputRange
            height={8.412}
            thumbSize={14.421}
            value={currentPercentageShown[1]}
            min={1}
            max={100}
            disabled={false}
            onChange={(value) => handlePercentageChange([-value, value])}
            onChangeShown={(value) => setCurrentPercentShown([-value, value])}
          />
        </div>
      </div>

      <div className="flex gap-2.5 mb-4">
        <StrategyButton
          strategyType={StrategyType.NARROW}
          currentStrategy={currentStrategy}
          onClick={(strategy) => setCurrentStrategy(strategy)}
        />
        <StrategyButton
          strategyType={StrategyType.BALANCED}
          currentStrategy={currentStrategy}
          onClick={(strategy) => setCurrentStrategy(strategy)}
        />
        <StrategyButton
          strategyType={StrategyType.WIDE}
          currentStrategy={currentStrategy}
          onClick={(strategy) => setCurrentStrategy(strategy)}
        />
        <StrategyButton
          strategyType={StrategyType.FULL_RANGE}
          currentStrategy={currentStrategy}
          onClick={(strategy) => setCurrentStrategy(strategy)}
        />
      </div>

      <div className="flex gap-[21px]">
        <Input
          title={`Min Price (${token2?.symbol} per ${token1?.symbol})`}
          percent={`${currentPercentage[0] == -1 && currentPercentage[1] == -1 ? 0 : isInverse ? invertPercentage(currentPercentage[1]).toFixed(1) : currentPercentage[0].toFixed(1)}`}
          value={
            currentPercentage[0] == -1 && currentPercentage[1] == -1
              ? '0'
              : (formatNumber(isInverse ? 1 / (price2 * multiplier) : price1 / multiplier, 6) as string)
          }
          onChange={(value: any) => {
            value.target.value = value.target.value * multiplier
            handleMinMaxInput(value, isInverse)
          }}
        />
        <Input
          title={`Max Price (${token2?.symbol} per ${token1?.symbol})`}
          percent={`${currentPercentage[0] == -1 && currentPercentage[1] == -1 ? 'Infinity' : isInverse ? invertPercentage(currentPercentage[0]).toFixed(1) : currentPercentage[1].toFixed(1)}`}
          value={
            currentPercentage[0] == -1 && currentPercentage[1] == -1
              ? 'Infinity'
              : (formatNumber(isInverse ? 1 / (price1 * multiplier) : price2 / multiplier, 6) as string)
          }
          onChange={(value: any) => {
            value.target.value = value.target.value * multiplier
            handleMinMaxInput(value, !isInverse)
          }}
        />
      </div>
    </div>
  )
}

export default SetRange
