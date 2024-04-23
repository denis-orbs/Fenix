'use client'

import { useSearchParams } from "next/navigation"

const Chart = () => {
  const searchParams = useSearchParams()
  const token0 = searchParams.get('token0')
  const token1 = searchParams.get('token1')
  return (
    <div className={`flex flex-col w-[100%] xl:rounded-2xl max-xl:h-[600px] px-3 xl:border xl:border-shark-950 xl:p-[3px] max-xl:bg-shark-400 max-xl:bg-opacity-40`}>
      <iframe
        height="100%"
        width="100%"
        id="defined-embed"
        title="Defined Embed"
        src="https://www.defined.fi/sol/2aPsSVxFw6dGRqWWUKfwujN6WVoyxuhjJaPzYaJvGDDR?quoteToken=token0&embedded=1&hideTxTable=1&hideSidebar=1&embedColorMode=DEFAULT"
        frameBorder="0"
        allow="clipboard-write"
        className="rounded-lg"
      />
    </div>
  )
}

export default Chart
