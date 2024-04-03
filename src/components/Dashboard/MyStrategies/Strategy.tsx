'use client'
import Image from 'next/image'
import { Button, Switch } from '@/src/components/UI'
import Graph from './Graph'
import ComponentVisible from '@/src/library/hooks/useVisible'
import { fromWei } from '@/src/library/utils/numbers'
import { Token, fetchTokens } from '@/src/library/common/getAvailableTokens'
import { useEffect, useState } from 'react'

type options = {
  value: string
  label: string
}
export type positions = {
  id: string
  liquidity: string
  depositedToken0: string
  depositedToken1: string
  tickLower: {
    price0: string
    price1: string
  }
  tickUpper: {
    price0: string
    price1: string
  }
  token0: {
    name: string
    id: string
    symbol: string
  }
  token1: {
    id: string
    symbol: string
    name: string
  }
}

interface StrategyProps {
  row: positions
  options: options[]
  setModalSelected: (modal: string) => void
  setOpenModal: (modal: boolean) => void
}

const Strategy = ({ row, options, setModalSelected, setOpenModal }: StrategyProps) => {
  const { ref, isVisible, setIsVisible } = ComponentVisible(false)

  const handlerOpenModal = (option: string) => {
    setOpenModal(true)
    setModalSelected(option)
  }

  const [tokens, setTokens] = useState<Token[]>([])

  const tokensprice = async () => {
    setTokens(await fetchTokens())
    console.log('row.tickLower', row.tickUpper, row.tickLower)
  }
  useEffect(() => {
    tokensprice()
  }, [])

  const [showtoken0, setshowtoken0] = useState(true)

  const handlerSwitch = () => {
    setshowtoken0(!showtoken0)
  }

  return (
    <div className="steps-box w-auto xl:min-w-[350px]">
      <div className="relative z-10">
        <div className="relative text-white flex flex-col">
          <div className="flex justify-between items-center box-strategies">
            <div className="flex gap-4 items-center">
              <div className="flex items-center">
                <Image
                  src={`/static/images/tokens/${row.token0.symbol}.svg`}
                  alt="token"
                  className="rounded-full "
                  width={47}
                  height={47}
                />
                <Image
                  src={`/static/images/tokens/${row.token1.symbol}.svg`}
                  alt="token"
                  className="-ml-4 rounded-full"
                  width={47}
                  height={47}
                />
              </div>
              <div className="flex flex-col">
                <p>
                  {row.token0.symbol} / {row.token1.symbol}
                </p>
                <p className="text-xs">ID: {row.id}</p>
              </div>
            </div>
            {/* <div
              onClick={() => setIsVisible(!isVisible)}
              className="flex items-center justify-center cursor-pointer flex-shrink-0 w-12 h-12 px-4 transition-colors border rounded-lg border-shark-300 bg-shark-400 bg-opacity-40 hover:bg-outrageous-orange-400 relative"
            >
              <span className="text-lg icon-cog text-white"></span>
              {isVisible && (
                <div
                  ref={ref}
                  className="w-[300px] p-2 flex flex-col gap-1 rounded-[10px] bg-shark-400 absolute top-14 z-50  translate-x-1"
                >
                  {options.map((option, index) => {
                    return (
                      <Button
                        variant="default"
                        onClick={() => handlerOpenModal(option.value)}
                        key={index}
                        className="!py-1 !h-[33px]  !text-xs"
                      >
                        {option.label}
                      </Button>
                    )
                  })}
                </div>
              )}
            </div> */}
          </div>
          <div className="flex gap-2 my-2">
            <div className="flex flex-col gap-2 w-1/2 items-center bg-shark-400 bg-opacity-40 p-4  rounded-lg">
              <p className="text-white">
                APR <span className="icon-info text-xs"></span>
              </p>
              <h1 className="text-green-400 text-2xl">0.00%</h1>
            </div>
            <div className="bg-shark-400 bg-opacity-40 flex flex-col gap-2 w-1/2 items-center p-4  rounded-lg">
              <p className="text-white">
                Liquidity <span className="icon-info text-xs"></span>
              </p>
              <h1 className="text-white text-2xl">{Number(fromWei(row.liquidity)).toFixed(5)} LP</h1>
            </div>
          </div>
        </div>

        <div className="bg-shark-400 bg-opacity-40 rounded-lg">
          <div className="relative text-white flex items-center justify-center border-b border-shark-400">
            <div className="flex items-start flex-col p-4 w-1/2">
              <h4 className="text-sm text-white-400">{row.token0.symbol}</h4>
              <h4 className="text-sm text-white">
                {Number(row.depositedToken0).toFixed(5)} ${row.token0.symbol}
              </h4>
              <p className="text-xs text-white">
                ${' '}
                {(
                  Number(row.depositedToken0) *
                  Number(tokens.find((e) => e.tokenAddress.toLowerCase() === row.token0.id)?.priceUSD)
                ).toFixed(2)}
              </p>
            </div>
            <div className="flex items-start flex-col p-4 w-1/2 border-l border-shark-400">
              <h4 className="text-sm text-white-500">{row.token1.symbol}</h4>
              <h4 className="text-sm text-white">
                {' '}
                {Number(row.depositedToken1).toFixed(5)} ${row.token1.symbol}
              </h4>
              <p className="text-xs text-white">
                ${' '}
                {(
                  Number(row.depositedToken1) *
                  Number(tokens.find((e) => e.tokenAddress.toLowerCase() === row.token1.id)?.priceUSD)
                ).toFixed(2)}
              </p>
            </div>
          </div>

          <Graph
            tickLower={row.tickLower}
            tickUpper={row.tickUpper}
            token0Symbol={row.token0.symbol}
            token1Symbol={row.token1.symbol}
          />
        </div>
        <div className="items-center justify-center">
          <Button variant="tertiary" className="h-[38px] w-[90px] bg-opacity-40 items-center justify-center">
            <span className="text-l">Manage</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Strategy
