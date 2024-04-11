import { useEffect, useState } from 'react'

import PairSelector from '@/src/components/Liquidity/Common/PairSelector'
import CLMProviderSelector from '@/src/components/Liquidity/Deposit/Panel/Concentrated/Automatic/CLMProviderSelector'
import DepositAmountsICHI from '@/src/components/Liquidity/Deposit/Panel/Concentrated/Automatic/DepositAmountsICHI'
import DepositAmountsGAMMA from '@/src/components/Liquidity/Deposit/Panel/Concentrated/Automatic/DepositAmountsGAMMA'
import {
  useSetToken0,
  useSetToken1,
  useToken0,
  useToken0Data,
  useToken1,
  useToken1Data,
} from '@/src/state/liquidity/hooks'
import { tokenList } from '@/src/library/constants/tokenList'

import { Button } from '@/src/components/UI'

const providers = [
  {
    label: 'ICHI',
    value: '1',
    apr: -1,
    src: 'https://ichi.org/',
    logo: {
      src: '/static/images/providers/ichi.svg',
      width: 63.75,
      height: 21,
    },
  },
]

const Automatic = () => {
  const [firstToken, setFirstToken] = useState({ name: 'Fenix', symbol: 'FNX' })
  const [secondToken, setSecondToken] = useState({ name: 'ethereum', symbol: 'ETH' })
  const [currentProvider, setCurrentProvider] = useState<string>('1')
  const token0 = useToken0()
  const token1 = useToken1()
  const setToken0 = useSetToken0()
  const setToken1 = useSetToken1()
  const token0Data = useToken0Data()
  const token1Data = useToken1Data()
  // Defaults tokens
  // useEffect(() => {
  //   setToken0(tokenList[0].address)
  //   setToken1(tokenList[1].address)
  // }, [])

  return (
    <>
      <PairSelector
        firstToken={token0Data}
        secondToken={token1Data}
        setFirstToken={(token) => setToken0(token.address)}
        setSecondToken={(token) => setToken1(token.address)}
      />
      <CLMProviderSelector
        providers={providers}
        currentProvider={currentProvider}
        setCurrentProvider={setCurrentProvider}
      />

      {currentProvider === '1' && <DepositAmountsICHI token={token0Data} />}
      {currentProvider === '2' && <DepositAmountsGAMMA firstToken={firstToken} secondToken={secondToken} />}

      {/* <Button className="w-full mx-auto !text-xs !h-[49px]" variant="tertiary">
        Create Position
      </Button> */}
    </>
  )
}

export default Automatic
