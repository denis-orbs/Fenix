import { Button } from '@/src/components/UI'
import { useIchiVault } from '@/src/library/hooks/web3/useIchi'
import { formatAmount, formatCurrency, formatDollarAmount, toBN } from '@/src/library/utils/numbers'
import { BasicPool, PoolData } from '@/src/state/liquidity/types'
import Image from 'next/image'
import { useState } from 'react'

interface RowDataProps {
  row: BasicPool
  titleHeader?: string
  titleHeader2?: string
  titleButton?: string
  titleButton2?: string
  activeRange?: boolean
}

export default function MobileRowNew({
  row,
  titleHeader,
  titleHeader2,
  titleButton,
  titleButton2,
  activeRange,
}: RowDataProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [openInfo, setOpenInfo] = useState<boolean>(false)

  const aprIchi = useIchiVault(row.token0.id, row.token1.id)
  let aprdisplayIchi
  if (aprIchi && aprIchi.length > 0) {
    if (aprIchi[0].hasOwnProperty('apr')) aprdisplayIchi = aprIchi[0].apr[1].apr.toFixed(0)
  }

  return (
    <>
      <div className={`border border-shark-950 px-3 py-2 rounded-[10px] bg-shark-400 bg-opacity-60 ${'lg:hidden'}`}>
        <div className="flex gap-[9px] items-center justify-around pb-2">
          <div className="relative flex items-center">
            <Image
              src={`/static/images/tokens/${row.token0.symbol}.svg`}
              alt="token"
              className="w-10 h-10 -mr-5 rounded-full"
              width={32}
              height={32}
            />
            <Image
              src={`/static/images/tokens/${row.token1.symbol}.svg`}
              alt="token"
              className="w-10 h-10 rounded-full"
              width={32}
              height={32}
            />
          </div>
          <div className="flex flex-col">
            <div>
              <h5 className="text-sm font-semibold leading-normal mb-1.5">
                {row.token0.symbol} / {row.token1.symbol}
              </h5>
              <div className="flex items-center gap-2">
                <span className="text-white py-2 px-6 text-xs rounded-lg button-primary">Concentrated</span>
                <span className="!py-2 !h-[38px] px-4  text-xs font-400 text-white border border-solid bg-shark-400 rounded-lg bg-opacity-40 border-1 border-shark-300">
                  {formatAmount(toBN(row.fee).div(10000), 3)}%
                </span>
                <Button
                  variant="tertiary"
                  className="!h-[38px] !text-xs border !border-shark-300 !rounded-lg !bg-shark-400 !bg-opacity-40 !px-4"
                >
                  <span className="icon-info text-lg"></span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        {activeRange && (
          <div className="flex justify-between border mt-[21px] items-center  mb-2.5 border-shark-300 p-4 rounded-lg">
            <h1 className="text-xs">Range</h1>
            <div className={`flex items-center justify-center`}>
              <div className="flex gap-2 items-center">
                <span className="bg-green-600 w-4 h-4 rounded-full border-4 border-black"></span>
                <div className="text-xs flex flex-col">
                  <p className="text-shark-100 text-xs">Min Price</p>
                  <span className="p-2  text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300 text-xs">
                    $0.00
                  </span>
                </div>
                <div className="text-xs flex flex-col">
                  <p className="text-shark-100 text-xs">Max Price</p>
                  <span className="p-2 text-xs text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
                    $0.00
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-1  mb-2.5">
          <div className="flex items-center justify-between">
            <div
              className="flex flex-col items-center w-[25%] justify-between border border-shark-300 p-4 rounded-lg
            "
            >
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium leading-normal">APR</span>
              </div>
              <div className=" relative flex gap-[7px]">
                <div className="ml-auto text-xs leading-normal">
                  {' '}
                  {aprdisplayIchi
                    ? formatAmount(
                        toBN(row?.apr || 0)
                          .plus(aprdisplayIchi)
                          .div(2)
                          .toString(),
                        2
                      )
                    : formatAmount(row?.apr, 2)}
                  %
                </div>
                <div
                  className="flex items-center gap-[5px] cursor-pointer
                    text-shark-100 hover:text-transparent hover:bg-gradient-to-r hover:from-outrageous-orange-500 hover:to-festival-500 hover:bg-clip-text"
                >
                  <span
                    className="icon-info"
                    onMouseEnter={() => setOpenInfo(true)}
                    onMouseLeave={() => setOpenInfo(false)}
                  ></span>
                </div>
                {openInfo && (
                  <div className="absolute z-10 bg-shark-950 rounded-lg border border-shark-300 w-auto xl:w-[250px] top-9 px-5 py-3 left-0 xl:-left-12">
                    <div className="flex justify-between items-center gap-3">
                      <p className="text-sm pb-1">Average</p>
                      <p className="text-sm pb-1 text-chilean-fire-600">{formatAmount(row?.apr, 2)}%</p>
                    </div>
                    {/* <div className="flex justify-between items-center">
                      <p className="text-sm pb-1">Narrow</p>
                      <p className="text-sm pb-1 text-chilean-fire-600">55.956%</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm pb-1">Balanced</p>
                      <p className="text-sm pb-1 text-chilean-fire-600">19.139%</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm pb-1">Wide</p>
                      <p className="text-sm pb-1 text-chilean-fire-600">16.281%</p>
                    </div> */}
                    {aprIchi && aprIchi.length > 0 && (
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Ichi</p>
                        <p className="text-sm text-chilean-fire-600">
                          {aprdisplayIchi == null || aprdisplayIchi < 0 ? '0' : aprdisplayIchi}%
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div
              className="flex flex-col items-center w-[35%] justify-between border border-shark-300 p-3 rounded-lg
            "
            >
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium leading-normal">Point Stack</span>
              </div>
              <div className="flex justify-center items-center gap-2 ">
                <span className="flex flex-row justify-center gap-2">
                  {row.token0.symbol !== 'axlUSDC' && row.token1.symbol !== 'axlUSDC' && (
                    <>
                      <Image
                        src={`/static/images/point-stack/fenix-ring.svg`}
                        alt="token"
                        className={`rounded-full w-7 h-7`}
                        width={20}
                        height={20}
                      />
                      <Image
                        src={`/static/images/point-stack/blast.svg`}
                        alt="token"
                        className={`rounded-full w-7 h-7`}
                        width={20}
                        height={20}
                      />
                      <Image
                        src={`/static/images/point-stack/blast-gold.svg`}
                        alt="token"
                        className={`rounded-full w-7 h-7`}
                        width={20}
                        height={20}
                      />
                    </>
                  )}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center w-[39%] justify-between border  border-shark-300 p-4 rounded-lg">
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium leading-normal">TVL</span>
              </div>
              <div className="flex flex-col">
                <div className="ml-auto text-xs leading-normal">
                  {/* TVL AQUI */}
                  {formatDollarAmount(Number(row.totalValueLockedUSD))}
                </div>
                <div className="flex gap-2.5 text-shark-100">
                  <div className="flex items-center gap-[5px]"></div>
                  <div className="flex items-center gap-[5px]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center w-[49.5%] justify-between border border-shark-300 p-4 rounded-lg">
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium leading-normal">
                  {titleHeader?.length === 0 ? 'Volume' : titleHeader}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xs leading-normal">{formatDollarAmount(Number(row.volumeUSD))}</div>
                <div className="flex xs:gap-2.5 text-shark-100 max-xs:flex-col">
                  <div className="flex items-center gap-[5px]">
                    <Image
                      src={`/static/images/tokens/${row.token0.symbol}.svg`}
                      alt="token"
                      className="w-2.5 h-2.5 rounded-full"
                      width={10}
                      height={10}
                    />
                    <span className="text-xs leading-normal">
                      {formatCurrency(Number(row.volumeToken0), 2)} {row.token0.symbol}{' '}
                    </span>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <Image
                      src={`/static/images/tokens/${row.token1.symbol}.svg`}
                      alt="token"
                      className="w-2.5 h-2.5 rounded-full"
                      width={10}
                      height={10}
                    />
                    <span className="text-xs leading-normal">
                      {formatCurrency(Number(row.volumeToken1), 2)} {row.token1.symbol}{' '}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center w-[49.5%] justify-between border border-shark-300 p-4 rounded-lg">
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium leading-normal">
                  {titleHeader2 === '' ? 'Fees' : titleHeader2}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xs leading-normal">{formatDollarAmount(row.feesUSD)}</div>
                <div className="flex xs:gap-2.5 text-shark-100 max-xs:flex-col">
                  <div className="flex items-center gap-[5px]">
                    <Image
                      src={`/static/images/tokens/${row.token0.symbol}.svg`}
                      alt="token"
                      className="w-2.5 h-2.5 rounded-full"
                      width={10}
                      height={10}
                    />
                    <span className="text-xs leading-normal">
                      {formatCurrency(toBN(row.feesToken0), 2)} {row.token0.symbol}
                    </span>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <Image
                      src={`/static/images/tokens/${row.token1.symbol}.svg`}
                      alt="token"
                      className="w-2.5 h-2.5 rounded-full"
                      width={10}
                      height={10}
                    />
                    <span className="text-xs leading-normal">
                      {' '}
                      {formatCurrency(toBN(row.feesToken1), 2)} {row.token1.symbol}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-center">
            {titleButton2 === '' ? (
              <Button
                variant="tertiary"
                className="flex items-center gap-2 w-full"
                href={`/liquidity/deposit?type=CONCENTRATED_MANUAL&token0=${row.token0.id}&token1=${row.token1.id}`}
              >
                <span className="icon-circles"></span>
                Deposit
              </Button>
            ) : (
              <Button variant="tertiary" className="flex items-center gap-2 w-full" href="/liquidity/deposit">
                <span className="icon-logout"></span>
                Manage
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
