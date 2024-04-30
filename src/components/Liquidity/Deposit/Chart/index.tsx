'use client'

import { NATIVE_ETH_LOWERCASE } from '@/src/library/Constants'

const generateChartUrl = (tokenA: string, tokenB: string) => {
  tokenA = tokenA === NATIVE_ETH_LOWERCASE ? '0x4300000000000000000000000000000000000004' : tokenA
  tokenB = tokenB === NATIVE_ETH_LOWERCASE ? '0x4300000000000000000000000000000000000004' : tokenB

  // all pools should be on lower case
  const baseUrls: {
    [key: string]: string
  } = {
    '0x4300000000000000000000000000000000000003/0x4300000000000000000000000000000000000004':
      'https://www.defined.fi/blast/0x1d74611f3ef04e7252f7651526711a937aa1f75e?quoteToken=token0&embedded=1&hideTxTable=1&hideSidebar=1&embedColorMode=DEFAULT&quoteCurrency=TOKEN', // USDB/WETH

    '0x4300000000000000000000000000000000000004/0xf7bc58b8d8f97adc129cfc4c9f45ce3c0e1d2692':
      'https://www.defined.fi/blast/0xc066a3e5d7c22bd3beaf74d4c0925520b455bb6f?quoteToken=token0&embedded=1&hideTxTable=1&hideSidebar=1&embedColorMode=DEFAULT&quoteCurrency=TOKEN', // WETH/WBTC

    '0x4300000000000000000000000000000000000004/0xeb466342c4d449bc9f53a865d5cb90586f405215':
      'https://www.defined.fi/blast/0x86d1da56fc79accc0daf76ca75668a4d98cb90a7?quoteToken=token0&embedded=1&hideTxTable=1&hideSidebar=1&embedColorMode=DEFAULT&quoteCurrency=TOKEN',
  }

  const key = `${tokenA}/${tokenB}`
  const reversedKey = `${tokenB}/${tokenA}`

  if (baseUrls[key]) {
    return `${baseUrls[key]}`
  } else if (baseUrls[reversedKey]) {
    return `${baseUrls[reversedKey]}`
  }
  return null
}
const Chart = ({ token0, token1 }: { token0?: string | null; token1?: string | null }) => {
  //  console.log(token0, token1, 'token0, token1')
  if (!token0 || !token1) return null
  const chartUrl = generateChartUrl(token0.toLowerCase(), token1.toLowerCase())
  if (!chartUrl) return null
  return (
    <div
      className={`flex flex-col w-[100%] xl:rounded-2xl max-xl:rounded-b-2xl max-xl:pb-4 max-xl:h-[600px] xl:h-[525px] px-3 xl:border xl:border-shark-950 xl:p-[3px] max-xl:bg-shark-400 max-xl:bg-opacity-40`}
    >
      <iframe height="100%" width="100%" src={chartUrl} allow="clipboard-write" className="rounded-lg" />
    </div>
  )
}

export default Chart
