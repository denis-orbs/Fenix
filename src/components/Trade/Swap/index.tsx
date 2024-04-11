'use client'

import Panel from '@/src/components/Trade/Swap/Panel'
import TradeProcess from '@/src/components/Trade/Common/TradeProcess'
import { TRADE_PROCESS } from '../data'
import Chart from '@/src/components/Chart'

const Swap = () => {
  return (
    <div className="flex flex-col items-start gap-6 mb-4 xl:gap-10 xl:flex-row justify-center">
      <div className="flex flex-col w-full">
        <div className="flex flex-wrap w-full gap-5 mb-10 xl:flex-nowrap justify-center">
          {/* <iframe
        width="18000"
        height="600"
        src="https://widget.openocean.finance?p=JTIzMTkxMzEzJTI0KiUyNCUyMzFDMUYyMiUyNColMjQlMjMxOTEzMTMlMjQqJTI0JTIzMTkxMzEzJTI0KiUyNCUyM2ZmZiUyNColMjQlMjM4QzdGOEMlMjQqJTI0JTIzZmI1MzRmJTI0KiUyNCUyM2ZmZmZmZiUyNColMjQlMjMzMzMxNDclMjQqJTI0JTIzYjFhN2IxJTI0KiUyNCUyMzQ3OWE0YiUyNColMjQlMjNmNzUwMjklMjQqJTI0RmVuaXglMjBGaW5hbmNlJTI0KiUyNFJvYm90byUyNColMjQlMjQqJTI0JTI0KiUyNCUyNColMjQlMjQqJTI0Ymxhc3QlMjQqJTI0V0VUSCUyNColMjRVU0RCJTI0KiUyNA=="
      ></iframe> */}
          <Panel />

          {/* <Chart className="w-full xl:w-full" /> */}
        </div>
        {/* <div className="flex w-full">
        <TradeProcess title="Trade" steps={TRADE_PROCESS} />
        </div> */}
      </div>
    </div>
  )
}

export default Swap
