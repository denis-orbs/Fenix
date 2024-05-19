import { config } from '@/src/app/layout'
import { Button } from '@/src/components/UI'
import { NumericalInput } from '@/src/components/UI/Input'
import { gammaUniProxyABI } from '@/src/library/constants/abi/gammaUniProxyABI'
import { INPUT_PRECISION } from '@/src/library/constants/misc'
import useDebounce from '@/src/library/hooks/useDebounce'
import { IToken } from '@/src/library/types'
import {
  useSetToken0,
  useSetToken0TypedValue,
  useSetToken1TypedValue,
  useToken0,
  useToken0TypedValue,
  useToken1,
  useToken1TypedValue,
} from '@/src/state/liquidity/hooks'
import { readContract } from '@wagmi/core'
import { useEffect } from 'react'

import { useReadContract } from 'wagmi'

const DepositAmountsGAMMA = ({ tokenList }: { tokenList: IToken[] }) => {
  const token0 = useToken0()
  const token1 = useToken1()
  const token1TypedValue = useToken1TypedValue()
  const token0TypedValue = useToken0TypedValue()
  console.log(token0)
  console.log(token1)
  const setToken0TypedValue = useSetToken0TypedValue()
  const setToken1TypedValue = useSetToken1TypedValue()
  console.log(tokenList)
  const setToken0 = useSetToken0()

  const pool = '0x1d74611f3ef04e7252f7651526711a937aa1f75e'
  const hypervisor = '0x7e35e1da52d710a5b115c294be3a1221988af150'
  const uniProxy = '0x0Fd7b24781c229A539b42010f3dBd8D236E6896B'
  const token0Address = '0x4300000000000000000000000000000000000003' // USDB
  const token1Address = '0x4300000000000000000000000000000000000004' // WETH

  const abc = useReadContract({
    address: uniProxy,
    abi: gammaUniProxyABI,
    functionName: 'getDepositAmount',
    args: [hypervisor, token1Address, 100000000000n],
  })
  useEffect(() => {
    const a = async () => {
      if (!token0TypedValue || token0TypedValue == '0') {
        setToken1TypedValue('')
        return
      }
      const res = await readContract(config, {
        address: uniProxy,
        abi: gammaUniProxyABI,
        functionName: 'getDepositAmount',
        args: [hypervisor, token0Address, BigInt(token0TypedValue * 10 ** 18)],
      })
      setToken1TypedValue(res[0].toString())
      console.log(res)
    }
    a()
  }, [token0TypedValue, setToken1TypedValue])

  useEffect(() => {
    const a = async () => {
      if (!token1TypedValue || token1TypedValue == '0') {
        setToken0TypedValue('')
        return
      }
      const res = await readContract(config, {
        address: uniProxy,
        abi: gammaUniProxyABI,
        functionName: 'getDepositAmount',
        args: [hypervisor, token1Address, BigInt(token1TypedValue * 10 ** 18)],
      })
      setToken0TypedValue(res[0].toString())
      console.log(res)
    }
    a()
  }, [token1TypedValue, setToken0TypedValue])

  console.log(token0TypedValue)
  console.log(abc?.data)
  console.log(abc?.isError)
  console.log(abc?.error)
  console.log(abc)
  return (
    <div className="bg-shark-400 bg-opacity-40 px-[15px] py-[29px] md:px-[19px] border border-shark-950 rounded-[10px] mb-2.5">
      <div className="text-xs leading-normal text-white mb-2">Deposit amounts</div>
      <div className="flex items-center gap-3 mb-[14px]">
        <div className="relative w-full xl:w-3/5">
          <NumericalInput
            value={token0TypedValue}
            onUserInput={(value) => {
              setToken0TypedValue(value)
            }}
            precision={INPUT_PRECISION}
            placeholder="0.0"
            className="bg-shark-400 bg-opacity-40 border border-shark-400 h-[50px] w-full rounded-lg outline-none px-3 text-white text-s"
          />
          <div className="absolute right-2 top-[10px] flex items-center gap-1 max-md:hidden">
            <Button variant="tertiary" className="!py-1 !px-3">
              Half
            </Button>
            <Button variant="tertiary" className="!py-1 !px-3">
              Max
            </Button>
          </div>
        </div>

        <div className="relative xl:w-2/5 flex-shrink-0">
          <div className="bg-shark-400 bg-opacity-40 rounded-lg text-white px-4 flex items-center justify-between h-[50px]">
            <div className="flex items-center gap-2">
              {/* <Image
                src={`/static/images/tokens/${firstToken.symbol}.png`}
                alt="token"
                className="w-6 h-6 rounded-full"
                width={20}
                height={20}
              />
              <span className="text-base">{firstToken.symbol}</span> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative w-full xl:w-3/5">
          <NumericalInput
            value={token1TypedValue}
            onUserInput={(value) => {
              setToken1TypedValue(value)
            }}
            precision={INPUT_PRECISION}
            placeholder="0.0"
            className="bg-shark-400 bg-opacity-40 border border-shark-400 h-[50px] w-full rounded-lg outline-none px-3 text-white text-s"
          />
          <div className="absolute right-2 top-[10px] flex items-center gap-1 max-md:hidden">
            <Button variant="tertiary" className="!py-1 !px-3">
              Half
            </Button>
            <Button variant="tertiary" className="!py-1 !px-3">
              Max
            </Button>
          </div>
        </div>

        <div className="relative xl:w-2/5 flex-shrink-0">
          <div className="bg-shark-400 bg-opacity-40 rounded-lg text-white px-4 flex items-center justify-between h-[50px]">
            <div className="flex items-center gap-2">
              {/* <Image
                src={`/static/images/tokens/${secondToken.symbol}.png`}
                alt="token"
                className="w-6 h-6 rounded-full"
                width={20}
                height={20}
              />
              <span className="text-base">{secondToken.symbol}</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepositAmountsGAMMA
