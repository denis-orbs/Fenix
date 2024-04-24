import { useEffect, useState } from 'react'

import { Button } from '@/src/components/UI'
import InputRange from '@/src/components/UI/SliderRange/InputRange'
import StrategyButton, { StrategyType } from './StrategyButton'
import Input from './Input'
import { formatNumber } from '@/src/library/utils/numbers'
import { IToken } from '@/src/library/types'

const SetRange = ({ setCurrentPercentage, currentPercentage, price1, price2, shownPercentage, token1, token2, multiplier }: {setCurrentPercentage: any, currentPercentage: any, price1: any, price2: any, shownPercentage: any, token1?: IToken, token2?: IToken, multiplier?: any}) => {
  const [currentStrategy, setCurrentStrategy] = useState<StrategyType | null>(null)
  const [currentPercentageShown, setCurrentPercentShown] = useState(5)

  useEffect(() => {
    if(currentStrategy == StrategyType.NARROW) setCurrentPercentage(2.5)
    if(currentStrategy == StrategyType.BALANCED) setCurrentPercentage(6)
    if(currentStrategy == StrategyType.WIDE) setCurrentPercentage(15)
    if(currentStrategy == StrategyType.FULL_RANGE) setCurrentPercentage(-1) //inf
  }, [currentStrategy])

  const handlePercentageChange = (percent: any) => {
    setCurrentPercentage(percent)
    setCurrentStrategy(null)
  }

  return (
    <div className="bg-shark-400 bg-opacity-40 py-[29px] px-[19px] border border-shark-950 rounded-[10px] mb-2.5">
      <div className="mb-2 text-xs leading-normal text-white">Selected Range</div>

      <div className="flex gap-[7px] mb-3">
        <Button
          variant={currentPercentage === 5 ? 'primary' : 'tertiary'}
          className="flex-grow"
          onClick={() => handlePercentageChange(5)}
        >
          5%
        </Button>
        <Button
          variant={currentPercentage === 10 ? 'primary' : 'tertiary'}
          className="flex-grow"
          onClick={() => handlePercentageChange(10)}
        >
          10%
        </Button>
        <Button
          variant={currentPercentage === 25 ? 'primary' : 'tertiary'}
          className="flex-grow"
          onClick={() => handlePercentageChange(25)}
        >
          25%
        </Button>
        <Button
          variant={currentPercentage === 50 ? 'primary' : 'tertiary'}
          className="flex-grow"
          onClick={() => handlePercentageChange(50)}
        >
          50%
        </Button>
        <Button
          variant={currentPercentage === 100 ? 'primary' : 'tertiary'}
          className="flex-grow"
          onClick={() => handlePercentageChange(100)}
        >
          100%
        </Button>
      </div>

      <div className="bg-shark-400 bg-opacity-40 border border-shark-950 px-5 py-2 flex justify-between items-center gap-2.5 rounded-[10px] mb-4">
        <div className="flex items-center gap-2 text-white opacity-75">
          <span>±</span>
          <span className="text-[30px] leading-normal font-light">{currentPercentageShown == -1 ? "Full Range" : currentPercentageShown}%</span>
        </div>
        <div className="max-w-[274px] flex-grow">
          <InputRange
            height={8.412}
            thumbSize={14.421}
            value={currentPercentage}
            min={1}
            max={100}
            disabled={false}
            onChange={(value) => handlePercentageChange(value)}
            onChangeShown={(value) => setCurrentPercentShown(value)}
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
        <Input title={`Min Price`} percent={`-${currentPercentage == -1 ? 0 : shownPercentage[0]}`} value={currentPercentage == -1 ? "0" : formatNumber((price1 < price2 ? price1 : price2) * multiplier, 6) as string} />
        <Input title={`Max Price`} percent={`+${currentPercentage == -1 ? "Infinity" : shownPercentage[1]}`} value={currentPercentage == -1 ? "Infinity" : formatNumber((price1 > price2 ? price1 : price2) * multiplier, 6) as string} />
      </div>
    </div>
  )
}

export default SetRange
