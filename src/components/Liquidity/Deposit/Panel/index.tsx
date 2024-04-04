'use client'

import { useEffect, useState } from 'react'

import { Button, Switch } from '@/src/components/UI'
import Classic from '@/src/components/Liquidity/Deposit/Panel/Classic'
import Automatic from '@/src/components/Liquidity/Deposit/Panel/Concentrated/Automatic'
import Manual from '@/src/components/Liquidity/Deposit/Panel/Concentrated/Manual'
import { Address, IToken } from '@/src/library/types'
import { isAddress } from 'viem'

const Panel = () => {
  const [depositType, setDepositType] = useState<
    'VOLATILE' | 'STABLE' | 'CONCENTRATED_AUTOMATIC' | 'CONCENTRATED_MANUAL'
  >('CONCENTRATED_AUTOMATIC')

  const [tokenSwap, setTokenSwap] = useState<IToken>({ name: 'Fenix', symbol: 'FNX', id: 0, decimals: 18, address: "0xCF0A6C7cf979Ab031DF787e69dfB94816f6cB3c9" as Address, img: "/static/images/tokens/FNX.svg" } as IToken)
  const [tokenFor, setTokenFor] = useState<IToken>({ name: 'Ethereum', symbol: 'ETH', id: 1, decimals: 18, address: "0x4200000000000000000000000000000000000023" as Address, img: "/static/images/tokens/WETH.svg" } as IToken)
  const [defaultPairs, setDefaultPairs] = useState<Address[]>([])
  const [defaultPairsTokens, setDefaultPairsTokens] = useState<IToken[]>([])

  useEffect(() => {
    const hash = window.location.hash;
    const hashValue = hash.substring(1);
    const pairString = hashValue.split("-")
    if(pairString.length < 1) return

    if(pairString[0] == "auto") setDepositType("CONCENTRATED_AUTOMATIC")
    if(pairString[0] == "manual") setDepositType("CONCENTRATED_MANUAL")
    if(pairString[0] == "stable") setDepositType("STABLE")
    if(pairString[0] == "volatile") setDepositType("VOLATILE")

    if(!isAddress(pairString[1]) || !isAddress(pairString[2])) return
    setDefaultPairs([pairString[1], pairString[2]])
  }, []);

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await fetch('https://fenix-api-testnet.vercel.app/token-prices', {
          method: 'GET',
        })
        const responseData = await response.json()
        const parsedData = responseData.map((item: any) => {
          return {
            id: 0,
            name: item.basetoken.name,
            symbol: item.basetoken.symbol,
            address: item.basetoken.address,
            decimals: 18,
            img: item.logourl,
            isCommon: item.common,
            price: parseFloat(item.priceUSD)
          }
        })

        const newDefaultPairsTokens: [IToken, IToken] = [{} as IToken, {} as IToken];
        if(defaultPairs.length > 0) {
          parsedData.map((item: any) => {
            if(item.address.toLowerCase() == defaultPairs[0]?.toLowerCase()) newDefaultPairsTokens[0] = item
            if(item.address.toLowerCase() == defaultPairs[1]?.toLowerCase()) newDefaultPairsTokens[1] = item
          })
          setDefaultPairs([])
        }
        setDefaultPairsTokens(newDefaultPairsTokens)
      } catch (error) {
      }
    }

    defaultPairs.length > 0 ? getList() : {}
  }, [defaultPairs])

  const handlerSwitch = () => setDepositType(('CONCENTRATED_AUTOMATIC' === depositType || 'CONCENTRATED_MANUAL' === depositType) ? 'VOLATILE' : 'CONCENTRATED_AUTOMATIC')

  const activeSwitch = depositType === 'CONCENTRATED_AUTOMATIC' || depositType === 'CONCENTRATED_MANUAL'
  
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
            <Classic depositType={depositType} tokenSwap={tokenSwap} tokenFor={tokenFor} defaultPairs={defaultPairsTokens} />
          )}

          {depositType === 'CONCENTRATED_AUTOMATIC' && <Automatic />}
          {depositType === 'CONCENTRATED_MANUAL' && <Manual defaultPairs={defaultPairsTokens}/>}
        </div>
      </div>
    </section>
  )
}

export default Panel
