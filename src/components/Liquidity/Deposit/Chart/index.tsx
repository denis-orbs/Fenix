'use client'

const Chart = ({ token0, token1 }: { token0?: string | null, token1?: string | null }) => {
  return (
    <div className={`flex flex-col w-[100%] xl:rounded-2xl max-xl:rounded-b-2xl max-xl:pb-4 max-xl:h-[600px] xl:h-[525px] px-3 xl:border xl:border-shark-950 xl:p-[3px] max-xl:bg-shark-400 max-xl:bg-opacity-40`}>
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
