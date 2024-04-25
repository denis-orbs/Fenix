'use client'
const generateChartUrl = (tokenA: string, tokenB: string) => {
  const baseUrls: {
    [key: string]: string
  } = {
    '0x4300000000000000000000000000000000000003/0x4300000000000000000000000000000000000004':
      'https://www.defined.fi/blast/0x7be481d464cad7ad99500ce8a637599eb8d0fcdb?quoteToken=token0&embedded=1&hideTxTable=1&hideSidebar=1&embedColorMode=DEFAULT', // USDB/WETH
    '0x4300000000000000000000000000000000000003/0xf7bc58b8d8f97adc129cfc4c9f45ce3c0e1d2692':
      'https://www.defined.fi/blast/0xecb1c17a51d782ac2757e2ab568d159854b9b4bd?quoteToken=token0&embedded=1&hideTxTable=1&hideSidebar=1&embedColorMode=DEFAULT', // USDB/WBTC
    '0x4300000000000000000000000000000000000004/0xf7bc58b8d8f97adc129cfc4c9f45ce3c0e1d2692':
      'https://dexscreener.com/zksync/0xe5716Ad6873f7d9919b0A72f5b33570f77c1a615?embed=1&theme=dark&trades=0&info=0', // WETH/WBTC
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/0xf7bc58b8d8f97adc129cfc4c9f45ce3c0e1d2692':
      'https://dexscreener.com/zksync/0xe5716Ad6873f7d9919b0A72f5b33570f77c1a615?embed=1&theme=dark&trades=0&info=0', // ETH/WBTC
    '0x4300000000000000000000000000000000000003/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee':
      'https://www.defined.fi/blast/0x7be481d464cad7ad99500ce8a637599eb8d0fcdb?quoteToken=token0&embedded=1&hideTxTable=1&hideSidebar=1&embedColorMode=DEFAULT', // USDB/EETH
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
  console.log(token0, token1, 'token0, token1')
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
