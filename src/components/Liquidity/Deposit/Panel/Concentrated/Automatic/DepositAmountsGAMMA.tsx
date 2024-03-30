import { Button } from '@/src/components/UI'
import Image from 'next/image'
import { createConfig, http, useSendTransaction, useWriteContract } from 'wagmi'
import { toBN } from '@/src/library/utils/numbers'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
import { useGammaSmartContracts, useGammaToken1Range } from '@/src/library/hooks/web3/useGamma'
import {
  useSetToken0TypedValue,
  useSetToken1TypedValue,
  useToken0,
  useToken0TypedValue,
  useToken1,
  useToken1TypedValue,
} from '@/src/state/liquidity/hooks'
import { useToken0Balance, useToken1Balance } from '@/src/library/hooks/useTokenBalance'
import { gammaUniProxyABI } from '@/src/library/constants/abi'
import { simulateContract } from 'viem/actions'
import { polygonFork } from '@/src/app/layout'
import { erc20Abi, parseEther } from 'viem'
import { polygon } from 'viem/chains'
import { ethers } from 'ethers'
import { useWalletClient } from 'wagmi'

const DepositAmountsGAMMA = ({
  firstToken,
  secondToken,
}: {
  firstToken: { name: string; symbol: string }
  secondToken: { name: string; symbol: string }
}) => {
  const { account: userAddress } = useActiveConnectionDetails() as { account: `0x${string}` }
  const token0 = useToken0()
  const token1 = useToken1()
  const token0TypedValue = useToken0TypedValue()
  const token1TypedValue = useToken1TypedValue()
  const setToken0TypedValue = useSetToken0TypedValue()
  const setToken1TypedValue = useSetToken1TypedValue()
  const { tokenBalance: token0Balance } = useToken0Balance()
  const { tokenBalance: token1Balance } = useToken1Balance()
  const { gammaProxySmartContract, gammaHypervisorSmartContract } = useGammaSmartContracts(token0, token1)
  const token0Amount = useToken0TypedValue()
  const token1Range = useGammaToken1Range()
  const { writeContractAsync, writeContract } = useWriteContract()
  const result = useWalletClient()
  console.log(result)
  // simulateContract / WriteContract
  // writeContractAsync
  // necesito la config
  const { data: hash, sendTransaction } = useSendTransaction()

  const createPosition = async () => {
    try {
      sendTransaction({ to: '0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3', value: parseEther('0.1') })
      return
      await writeContractAsync(
        {
          address: token0,
          abi: erc20Abi,
          functionName: 'transfer',
          args: ['0xe8F3450CA5f0a47B79EEce4AE1002b2e675B9aD0', parseEther('0.1')],
        },
        {
          onSuccess: async (x) => {
            console.log('success', x, +new Date())
            //  const transaction = await publicClient.waitForTransactionReceipt({ hash: x })
            //  console.log(transaction.status)
          },
          onError: (e) => {
            console.log('error', e)
          },
        }
      )
    } catch (error) {
      console.log(error)
    }

    //  const handleAddLiquidity = async () => {
    //    // TODO values check
    //    await writeContractAsync(
    //      {

    //      },
    //      {
    //        onSuccess: async (x) => {
    //          console.log('success', x, +new Date())
    //         //  const transaction = await publicClient.waitForTransactionReceipt({ hash: x })
    //         //  console.log(transaction.status)
    //        },
    //        onError: (e) => {
    //          console.log('error', e)
    //        },
    //      }
    //    )
  }
  return (
    <div className="bg-shark-400 bg-opacity-40 px-[15px] py-[29px] md:px-[19px] border border-shark-950 rounded-[10px] mb-2.5">
      <div className="text-xs leading-normal text-white mb-2">Deposit amounts</div>
      <div className="flex items-center gap-3 mb-[14px]">
        <div className="relative w-full xl:w-3/5">
          <input
            type="text"
            placeholder="0"
            className="bg-shark-400 bg-opacity-40 border border-shark-400 h-[50px] w-full rounded-lg outline-none px-3 text-white text-sm"
            value={token0TypedValue}
            onChange={(e) => setToken0TypedValue(e.target.value)}
          />
          <div className="absolute right-2 top-[10px] flex items-center gap-1 max-md:hidden">
            <Button
              variant="tertiary"
              className="!py-1 !px-3"
              onClick={() => setToken0TypedValue(token0Balance?.div(2).toString() || '0')}
            >
              Half
            </Button>
            <Button
              variant="tertiary"
              className="!py-1 !px-3"
              onClick={() => setToken0TypedValue(token0Balance?.toString() || '0')}
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
            value={token1TypedValue}
            onChange={(e) => setToken1TypedValue(e.target.value)}
          />
          <div className="absolute right-2 top-[10px] flex items-center gap-1 max-md:hidden">
            <Button
              variant="tertiary"
              className="!py-1 !px-3"
              onClick={() => {
                setToken1TypedValue(toBN(Number(token1Range[1])).div(2).toString())
              }}
            >
              Half
            </Button>
            <Button
              variant="tertiary"
              className="!py-1 !px-3"
              onClick={() => {
                setToken1TypedValue(toBN(Number(token1Range[1])).toString())
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
      <Button onClick={createPosition}>Create Position</Button>
    </div>
  )
}

export default DepositAmountsGAMMA
