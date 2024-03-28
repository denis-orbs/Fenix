import { Button } from '@/src/components/UI'
import Image from 'next/image'
import { createConfig, useReadContract, useWriteContract } from 'wagmi'
import { gammaUniProxyABI } from '../../../../../../library/constants/abi/gammaUniProxyABI'
import { useEffect, useState } from 'react'
import { erc20Abi, http } from 'viem'
import { useERC20Balance } from '@/src/library/hooks/web3/erc20/useERC20Balance'
import { BN_ONE, toBN } from '@/src/library/utils/numbers'
import { call } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'
import { polygon } from 'wagmi/chains'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'

const DepositAmountsGAMMA = ({
  firstToken,
  secondToken,
}: {
  firstToken: { name: string; symbol: string }
  secondToken: { name: string; symbol: string }
}) => {
  const gammaUniProxy = '0xA42d55074869491D60Ac05490376B74cF19B00e6'
  const gammaHypervisor = '0x02203f2351E7aC6aB5051205172D3f772db7D814'
  const token1 = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270' // Wrapped Matic
  const token0 = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619' // Wrapped Ether
  const userAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
  const [token0DepositAmount, setToken0DepositAmount] = useState('')
  const [token1DepositAmount, setToken1DepositAmount] = useState('')
  const [token0UserBalance, setToken0UserBalance] = useState('')
  const [token1UserBalance, setToken1UserBalance] = useState('')
  // const [token1DepositAmountRange, setToken1DepositAmountRange] = useState<[number, number]>([0, 0])
  // use input number formatter
  const { account, chain, chainId } = useActiveConnectionDetails()
  const [token1DepositRange, setToken1DepositRange] = useState<[number, number]>([0, 0])
  const token1RangeResult = useReadContract({
    address: gammaUniProxy,
    abi: gammaUniProxyABI,
    functionName: 'getDepositAmount',
    args: [gammaHypervisor, token0, token0DepositAmount],
    chainId: chainId,
  })
  // useEffect(() => {
  //   setToken1DepositRange((token1RangeResult?.data || [0, 0]) as [number, number])
  //   console.log('rendering')
  // }, [token1RangeResult])
  // const token1DepositRange = (token1RangeResult?.data || [0, 0]) as [number, number]
  console.log(BN_ONE.div(999999999))
  const { writeContract } = useWriteContract()

  const { tokenBalance: tokenBalance0 } = useERC20Balance({
    tokenAddress: token0,
    tokenDecimals: 18,
    owner: userAddress,
  })

  const { tokenBalance: tokenBalance1 } = useERC20Balance({
    tokenAddress: token1,
    tokenDecimals: 18,
    owner: userAddress,
  })
  useEffect(() => {
    if (tokenBalance0) setToken0UserBalance(tokenBalance0?.toString())
  }, [tokenBalance0])

  useEffect(() => {
    if (tokenBalance1) setToken1UserBalance(tokenBalance1?.toString())
  }, [tokenBalance1])
  const createPosition = async () => {
    try {
      // console.log(
      //   toBN(token0DepositAmount)
      //     .multipliedBy(10 ** 18)
      //     .toNumber()
      // )
      // writeContract({
      //   abi: erc20Abi,
      //   address: token0,
      //   functionName: 'approve',
      //   args: [
      //     gammaUniProxy,
      //     BigInt(
      //       toBN(1)
      //         .multipliedBy(10 ** 18)
      //         .toNumber()
      //     ),
      //   ],
      // })
      // writeContract({
      //   abi: gammaUniProxyABI,
      //   address: gammaUniProxy,
      //   functionName: 'transferClearance',
      //   args: [token0],
      // })
      writeContract({
        abi: gammaUniProxyABI,
        address: gammaUniProxy,
        functionName: 'deposit',
        args: [
          toBN(token0DepositAmount)
            .multipliedBy(10 ** 18)
            .toNumber(),
          toBN(token1DepositAmount)
            .multipliedBy(10 ** 18)
            .toNumber(),
          userAddress,
          gammaHypervisor,
        ],
      })
    } catch (error) {
      console.log(error)
    }
  }
  console.log(token1DepositRange)
  // useEffect(() => {
  //   console.log(token1DepositRange[0] == 0)
  //   console.log()
  //   if (Number(token0DepositAmount) < 0 || Number(token1DepositAmount) < 0) {
  //     setBtnText('Create Position')
  //   } else if (token1DepositRange[0] == 0 && token1DepositRange[1] == 0) {
  //     console.log('entro')
  //     setBtnText('Token 0 position has to be bigger')
  //   } else if (
  //     Number(token1DepositAmount) > token1DepositRange[1] ||
  //     Number(token1DepositAmount) < token1DepositRange[0]
  //   ) {
  //     setBtnText(`The range of token 1 has to be between ${token1DepositRange[0]} and ${token1DepositRange[1]}`)
  //   } else {
  //     // setBtnText('Enter amounts')
  //   }
  // }, [token0DepositAmount, token1DepositAmount, token1DepositRange])
  return (
    <div className="bg-shark-400 bg-opacity-40 px-[15px] py-[29px] md:px-[19px] border border-shark-950 rounded-[10px] mb-2.5">
      <div className="text-xs leading-normal text-white mb-2">Deposit amounts</div>
      <div className="flex items-center gap-3 mb-[14px]">
        <div className="relative w-full xl:w-3/5">
          <input
            type="text"
            placeholder="0"
            className="bg-shark-400 bg-opacity-40 border border-shark-400 h-[50px] w-full rounded-lg outline-none px-3 text-white text-sm"
            value={token0DepositAmount}
            onChange={(e) => setToken0DepositAmount(e.target.value)}
          />
          <div className="absolute right-2 top-[10px] flex items-center gap-1 max-md:hidden">
            <Button
              variant="tertiary"
              className="!py-1 !px-3"
              onClick={() => setToken0DepositAmount(tokenBalance0?.div(2).toString() || '0')}
            >
              Half
            </Button>
            <Button
              variant="tertiary"
              className="!py-1 !px-3"
              onClick={() => setToken0DepositAmount(token0UserBalance.toString() || '0')}
            >
              Max
            </Button>
          </div>
        </div>

        <div className="relative xl:w-2/5 flex-shrink-0">
          <div className="bg-shark-400 bg-opacity-40 rounded-lg text-white px-4 flex items-center justify-between h-[50px]">
            <div className="flex items-center gap-2">
              <Image
                src={`/static/images/tokens/${firstToken.symbol}.png`}
                alt="token"
                className="w-6 h-6 rounded-full"
                width={20}
                height={20}
              />
              <span className="text-base">{firstToken.symbol}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative w-full xl:w-3/5">
          <input
            type="text"
            placeholder="0"
            className="bg-shark-400 bg-opacity-40 border border-shark-400 h-[50px] w-full rounded-lg outline-none px-3 text-white text-sm"
            value={token1DepositAmount}
            onChange={(e) => setToken1DepositAmount(e.target.value)}
          />
          <div className="absolute right-2 top-[10px] flex items-center gap-1 max-md:hidden">
            <Button
              variant="tertiary"
              className="!py-1 !px-3"
              onClick={() => {
                setToken1DepositAmount(toBN(token1DepositRange[1]).div(2).toString())
              }}
            >
              Half
            </Button>
            <Button
              variant="tertiary"
              className="!py-1 !px-3"
              onClick={() => {
                setToken1DepositAmount(toBN(token1DepositRange[1]).toString())
              }}
            >
              Max
            </Button>
          </div>
        </div>

        <div className="relative xl:w-2/5 flex-shrink-0">
          <div className="bg-shark-400 bg-opacity-40 rounded-lg text-white px-4 flex items-center justify-between h-[50px]">
            <div className="flex items-center gap-2">
              <Image
                src={`/static/images/tokens/${secondToken.symbol}.png`}
                alt="token"
                className="w-6 h-6 rounded-full"
                width={20}
                height={20}
              />
              <span className="text-base">{secondToken.symbol}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepositAmountsGAMMA
