import { Button } from '@/src/components/UI'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
import {
  useSetToken0TypedValue,
  useSetToken1TypedValue,
  useToken0,
  useToken0TypedValue,
  useToken1,
  useToken1TypedValue,
} from '@/src/state/liquidity/hooks'
// import { useToken0Balance, useToken1Balance } from '@/src/library/hooks/useBalance'
import { erc20Abi, parseEther } from 'viem'
import { useReadContract, useReadContracts, useWriteContract } from 'wagmi'
import { NumericalInput } from '@/src/components/UI/Input'
import { INPUT_PRECISION } from '@/src/library/constants/misc'
import { IToken } from '@/src/library/types'
import { gammaVaults } from '@/src/components/Liquidity/Deposit/Panel/Concentrated/Automatic/gammaVaults'
import { gammaHypervisorABI } from '@/src/library/constants/abi/gammaHypervisorABI'
import { formatPrice, toBN } from '@/src/library/utils/numbers'
import { ethers } from 'ethers'
import { getWeb3Provider } from '@/src/library/utils/web3'
import { useNotificationAdderCallback } from '@/src/state/notifications/hooks'
import { NotificationDuration, NotificationType } from '@/src/state/notifications/types'

const WithdrawAmountsGAMMA = ({
  firstToken,
  secondToken,
  tokenList,
}: {
  firstToken: { name: string; symbol: string }
  secondToken: { name: string; symbol: string }
  tokenList: IToken[]
}) => {
  const addNotification = useNotificationAdderCallback()

  const { account } = useActiveConnectionDetails() as { account: `0x${string}` }
  const token0 = useToken0()
  const token1 = useToken1()
  const token0TypedValue = useToken0TypedValue()
  const token1TypedValue = useToken1TypedValue()
  const setToken0TypedValue = useSetToken0TypedValue()
  const setToken1TypedValue = useSetToken1TypedValue()
  const vaultId = gammaVaults.find(
    (vault) =>
      (vault?.token0?.toLowerCase() === token0 && vault?.token1?.toLowerCase() === token1) ||
      (vault?.token1?.toLowerCase() === token0 && vault?.token0?.toLowerCase() === token1)
  )?.id
  const vaultData = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        address: vaultId as `0x${string}`,
        functionName: 'balanceOf',
        args: [account],
      },
      {
        abi: erc20Abi,
        address: vaultId as `0x${string}`,
        functionName: 'decimals',
      },
    ],
  })

  const vaultDecimals = vaultData?.data?.[1]?.result || 18
  const userVaultBalance = ethers.utils.formatUnits(vaultData?.data?.[0]?.result?.toString() || '0', vaultDecimals)

  // const { tokenBalance: token0Balance } = useToken0Balance()
  // const { tokenBalance: token1Balance } = useToken1Balance()

  const token0Amount = useToken0TypedValue()

  const { writeContractAsync } = useWriteContract()
  const withdraw = async () => {
    if (!vaultId) return
    //
    await writeContractAsync(
      {
        address: vaultId as `0x${string}`,
        functionName: 'withdraw',
        abi: gammaHypervisorABI,
        args: [BigInt(token0TypedValue * 10 ** vaultDecimals), account, account, [0n, 0n, 0n, 0n]],
      },
      {
        onSuccess: async (txHash) => {
          const web3Provider = getWeb3Provider()
          setToken0TypedValue('')
          addNotification({
            id: crypto.randomUUID(),
            message: 'Withdraw successful',
            notificationType: NotificationType.SUCCESS,
            txHash,
            notificationDuration: NotificationDuration.DURATION_5000,
            createTime: new Date().toISOString(),
          })
          await web3Provider.waitForTransaction(txHash)
          vaultData?.refetch()
          setTimeout(() => {
            vaultData?.refetch()
          }, 1000)
        },
      }
    )
  }

  return (
    <div className="bg-shark-400 bg-opacity-40 px-[15px] py-[29px] md:px-[19px] border border-shark-950 rounded-[10px] mb-2.5">
      {vaultId ? (
        <>
          {' '}
          <div className="text-xs leading-normal text-white ">Withdraw amounts</div>
          <div className="flex items-end gap-3 mb-[14px]">
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
                <Button
                  variant="tertiary"
                  className="!py-1 !px-3"
                  onClick={() =>
                    toBN(userVaultBalance).gt(0) &&
                    setToken0TypedValue(toBN(formatPrice(userVaultBalance, 14)).div(2).toString())
                  }
                >
                  Half
                </Button>
                <Button
                  variant="tertiary"
                  className="!py-1 !px-3"
                  onClick={() =>
                    toBN(userVaultBalance).gt(0) &&
                    setToken0TypedValue(toBN(formatPrice(userVaultBalance, 14)).toString())
                  }
                  //   onClick={() => {
                  //     toBN(token0Balance).gt(0) &&
                  //       handleToken0InputChange(toBN(formatPrice(token0Balance, 14)).toString())
                  //   }}
                >
                  Max
                </Button>
              </div>
            </div>

            <div className="relative xl:w-2/5 flex-shrink-0">
              <span className="text-xs leading-normal text-shark-100 mr-4 flex items-center gap-x-2 mb-1">
                {/*
            <span className="icon-wallet text-xs"></span>
*/}
                {/*
            LP Tokens: 234234234 ($34.33)
*/}
              </span>
              <div className="bg-shark-400 bg-opacity-40 rounded-lg text-white px-4 flex items-center justify-between h-[50px]">
                <div className="flex items-center w-full">
                  <div className="flex justify-start flex-col">
                    {/*  <Image
                    src={`/static/images/tokens/${token?.symbol}.svg`}
                    alt="token"
                    className="w-6 h-6 rounded-full"
                    width={20}
                    height={20}
                />*/}
                    <span>LP Tokens</span>
                    {/*
                <span className="text-base">{token?.symbol}</span>
*/}{' '}
                    {/*   <span className={'text-xs leading-normal text-shark-100'}> 0.34 WETH ($11.22)</span>
                <span className={'text-xs leading-normal text-shark-100'}>0.22 USDB ($4.45)</span>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <Button
        variant={'tertiary'}
        disabled={!vaultId || token0TypedValue > userVaultBalance}
        onClick={withdraw}
        walletConfig={{
          needSupportedChain: true,
          needWalletConnected: true,
        }}
        className="w-full mx-auto !text-xs !h-[49px] mt-4"
      >
        {vaultId ? (token0TypedValue > userVaultBalance ? 'Insufficient balance' : 'Withdraw') : 'Vault not available'}
      </Button>
    </div>
  )
}

export default WithdrawAmountsGAMMA
