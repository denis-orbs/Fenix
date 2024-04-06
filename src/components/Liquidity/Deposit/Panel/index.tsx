'use client'

import { use, useState } from 'react'

import { Button, Switch } from '@/src/components/UI'
import Classic from '@/src/components/Liquidity/Deposit/Panel/Classic'
import Automatic from '@/src/components/Liquidity/Deposit/Panel/Concentrated/Automatic'
import Manual from '@/src/components/Liquidity/Deposit/Panel/Concentrated/Manual'
import { IToken } from '@/src/library/types'
import { useGammaCreatePosition } from '@/src/library/hooks/web3/useGamma'

const Panel = () => {
  const [depositType, setDepositType] = useState<
    'VOLATILE' | 'STABLE' | 'CONCENTRATED_AUTOMATIC' | 'CONCENTRATED_MANUAL'
  >('VOLATILE')

  const [tokenSwap, setTokenSwap] = useState<IToken>({ name: 'Fenix', symbol: 'FNX' })
  const [tokenFor, setTokenFor] = useState<IToken>({ name: 'ethereum', symbol: 'ETH' })

  const handlerSwitch = () =>
    setDepositType('CONCENTRATED_AUTOMATIC' === depositType ? 'VOLATILE' : 'CONCENTRATED_AUTOMATIC')

  const activeSwitch = depositType === 'CONCENTRATED_AUTOMATIC' || depositType === 'CONCENTRATED_MANUAL'
  const { createPosition: createGammaPosition } = useGammaCreatePosition()
  const createPosition = async () => {
    if (depositType === 'CONCENTRATED_AUTOMATIC') {
      createGammaPosition()
    }
  }
  return (
    <section className="box-panel-trade">
      <div className="w-full flex flex-col xl:flex-row justify-between gap-12 items-center relative z-10">
        <div className="w-full relative">
          <div className="flex items-center justify-between mb-[25px] font-semibold">
            <h4 className="text-lg md:text-xl text-white font-medium">New Position</h4>
            <div className="flex items-center gap-[13px]">
              <div className="flex items-center gap-[9px] h-10">
                <Switch active={activeSwitch} setActive={handlerSwitch} />
                <span className="text-shark-100 text-xs leading-normal">Concentrated</span>
              </div>
              <div className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] p-2.5 border border-shark-200 bg-shark-300 bg-opacity-40 rounded-[10px] flex items-center justify-center">
                <span className="icon-cog text-white"></span>
              </div>
            </div>
          </div>

          <div className="bg-shark-400 bg-opacity-40 p-[13px] md:py-[11px] md:px-[19px] flex gap-1.5 md:gap-2.5 border border-shark-950 rounded-[10px] mb-2.5">
            {depositType === 'CONCENTRATED_AUTOMATIC' || depositType === 'CONCENTRATED_MANUAL' ? (
              <>
                <Button
                  className="w-full h-[38px] mx-auto !text-xs"
                  variant={depositType === 'CONCENTRATED_AUTOMATIC' ? 'primary' : 'secondary'}
                  onClick={() => setDepositType('CONCENTRATED_AUTOMATIC')}
                >
                  Automatic
                </Button>
                <Button
                  className="w-full h-[38px] mx-auto !text-xs"
                  variant={depositType === 'CONCENTRATED_MANUAL' ? 'primary' : 'secondary'}
                  onClick={() => setDepositType('CONCENTRATED_MANUAL')}
                >
                  Manual
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="w-full h-[38px] mx-auto !text-xs"
                  variant={depositType === 'STABLE' ? 'primary' : 'secondary'}
                  onClick={() => setDepositType('STABLE')}
                >
                  Stable
                </Button>
                <Button
                  className="w-full h-[38px] mx-auto !text-xs"
                  variant={depositType === 'VOLATILE' ? 'primary' : 'secondary'}
                  onClick={() => setDepositType('VOLATILE')}
                >
                  Volatile
                </Button>
              </>
            )}
          </div>

          {(depositType === 'VOLATILE' || depositType === 'STABLE') && (
            <Classic depositType={depositType} tokenSwap={tokenSwap} tokenFor={tokenFor} />
          )}

          {depositType === 'CONCENTRATED_AUTOMATIC' && <Automatic />}
          {depositType === 'CONCENTRATED_MANUAL' && <Manual />}
          {depositType === 'CONCENTRATED_MANUAL' && (
            <Button className="w-full mx-auto !text-xs !h-[49px]" variant="tertiary" onClick={createPosition}>
              Create Position
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

export default Panel
