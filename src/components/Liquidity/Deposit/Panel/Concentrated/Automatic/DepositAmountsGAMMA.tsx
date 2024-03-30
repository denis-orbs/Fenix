import { Button } from '@/src/components/UI'
import Image from 'next/image'
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
import { erc20Abi, parseEther } from 'viem'
import { useAccount, useSendTransaction, useWalletClient, useWriteContract } from 'wagmi'
import { gammaUniProxyABI } from '@/src/library/constants/abi'
import useERC20Allowance from '@/src/library/hooks/web3/erc20/useERC20Allowance'
import { ethers } from 'ethers'
import { useApproveTokenIfNeeded } from '@/src/library/hooks/web3/erc20/userERC20ApproveIfNeeded'
import { getTokenAllowance } from '@/src/library/hooks/liquidity/useClassic'

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
  const result = useWalletClient()
  const { writeContractAsync } = useWriteContract()
  // const { approveIfNeeded: token0approveIfNeeded } = useApproveTokenIfNeeded({
  //   tokenAddress: token0,
  //   spenderAddress: gammaProxySmartContract,
  //   userAddress,
  //   amountNeeded: BigInt(token0Amount),
  // })
  // const { approveIfNeeded: token1approveIfNeeded } = useApproveTokenIfNeeded({
  //   tokenAddress: token1,
  //   spenderAddress: gammaProxySmartContract,
  //   userAddress,
  //   amountNeeded: BigInt(token1TypedValue),
  // })
  console.log(token1Range)
  const { data: hash, sendTransaction } = useSendTransaction()
  // const token0Allowance = useERC20Allowance(token0, userAddress, gammaHypervisorSmartContract)
  // const token1Allowance = useERC20Allowance(token1, userAddress, gammaHypervisorSmartContract)
  const createPosition = async () => {
    try {
      // Check if the user has enough allowance deposit the tokens in the gamma proxy contract
      // TODO: We have the hook useApproveTokenIfNeeded but it's not working
      const token0Allowance = await getTokenAllowance(token0, userAddress, gammaHypervisorSmartContract)
      if (token0Allowance < token0Amount) {
        await writeContractAsync({
          address: token0,
          abi: erc20Abi,
          functionName: 'approve',
          args: [gammaHypervisorSmartContract, ethers.MaxUint256],
        })
      }
      const token1Allowance = await getTokenAllowance(token1, userAddress, gammaHypervisorSmartContract)
      if (token1Allowance < token1TypedValue) {
        await writeContractAsync({
          address: token1,
          abi: erc20Abi,
          functionName: 'approve',
          args: [gammaHypervisorSmartContract, ethers.MaxUint256],
        })
      }
      // const result = await sendTransaction({
      //   to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
      //   value: parseEther('0.01'),
      // })
      // await writeContractAsync({
      //   address: token0,
      //   abi: erc20Abi,
      //   functionName: 'transfer',
      //   args: ['0xe8F3450CA5f0a47B79EEce4AE1002b2e675B9aD0', parseEther('0.1')],
      // })

      // LPToken.approve(staking_contract, amount)
      // 6111220567744n, 1271204815n,
      await writeContractAsync(
        {
          abi: gammaUniProxyABI,
          address: gammaProxySmartContract,
          functionName: 'deposit',
          args: [
            ethers.parseUnits(token1TypedValue, 18),
            ethers.parseUnits(token0TypedValue, 18),
            userAddress,
            gammaHypervisorSmartContract,
            [0n, 0n, 0n, 0n],
          ],
        },
        {
          onSuccess: (data) => {
            alert('Transaction sent! TxHash: ' + data)
          },
          onError: (error) => {
            console.error('Transaction error:', error)
          },
        }
      )
    } catch (error) {
      console.log(error)
    }
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
              onClick={() => setToken0TypedValue(token0Balance?.div(2).toFixed(18).toString() || '0')}
            >
              Half
            </Button>
            <Button
              variant="tertiary"
              className="!py-1 !px-3"
              onClick={() => setToken0TypedValue(token0Balance?.toFixed(18).toString() || '0')}
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
                setToken1TypedValue(toBN(ethers.formatUnits(token1Range[1], 18)).div(2).toFixed(18).toString())
              }}
            >
              Half
            </Button>
            <Button
              variant="tertiary"
              className="!py-1 !px-3"
              onClick={() => {
                setToken1TypedValue(toBN(ethers.formatUnits(token1Range[1], 18)).toFixed(18).toString())
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
