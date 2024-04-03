'use client'

import Panel from '@/src/components/Trade/Swap/Panel'
import TradeProcess from '@/src/components/Trade/Common/TradeProcess'
import { TRADE_PROCESS } from '../data'
import Chart from '@/src/components/Chart'

const Swap = () => {
  return (
    <div className="flex flex-col items-start gap-6 mb-4 xl:gap-10 xl:flex-row">
      {/* <div className="flex flex-col w-full"> */}
      {/* <div className="flex flex-wrap w-full gap-5 mb-10 xl:flex-nowrap"> */}
      <iframe
        width="18000"
        height="600"
        src={
          'https://widget.openocean.finance?p=JTIzMTkxMzEzJTI0KiUyNCUyMzFDMUYyMiUyNColMjQl' +
          'MjMxOTEzMTMlMjQqJTI0JTIzMTkxMzEzJTI0KiUyNCUyM2ZmZiUyNColMjQlMjM4QzdGOEMlMjQqJTI0' +
          'JTIzZmI1MzRmJTI0KiUyNCUyM2ZmZmZmZiUyNColMjQlMjMzMzMxNDclMjQqJTI0JTIzYjFhN2IxJTI0' +
          'KiUyNCUyMzQ3OWE0YiUyNColMjQlMjNmNzUwMjklMjQqJTI0RmVuaXglMjBGaW5hbmNlJTI0KiUyNFJv' +
          'Ym90byUyNColMjQlMjQqJTI0JTI0KiUyNCUyNColMjQlMjQqJTI0Ymxhc3QlMjQqJTI0V0VUSCUyNCol' +
          'MjRVU0RCJTI0KiUyNA=='
        }
      ></iframe>
      {/* <Panel /> */}

      {/* <Chart className="w-full xl:w-full" /> */}
      {/* </div> */}
      <div className="flex w-full">{/* <TradeProcess title="Trade" steps={TRADE_PROCESS} /> */}</div>
      {/* </div> */}
    </div>
  )
}

export default Swap
