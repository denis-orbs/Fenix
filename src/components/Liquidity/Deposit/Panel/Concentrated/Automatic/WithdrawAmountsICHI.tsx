import { Button } from '@/src/components/UI'
import { NumericalInput } from '@/src/components/UI/Input'
import { INPUT_PRECISION } from '@/src/library/constants/misc'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { getUserBalance, IchiVault, SupportedDex, withdraw } from '@ichidao/ichi-vaults-sdk'
import { useToken0, useToken1 } from '@/src/state/liquidity/hooks'
import { formatAmount, toBN } from '@/src/library/utils/numbers'
import toast, { Toaster } from 'react-hot-toast'
import { getWeb3Provider } from '@/src/library/utils/web3'
import { IToken } from '@/src/library/types'
import { tokenAddressToSymbol } from '@/src/library/constants/tokenAddressToSymbol'
const BUTTON_TEXT_WITHDRAW = 'Withdraw'

const WithdrawAmountsICHI = ({
  token,
  allIchiVaultsByTokenPair,
  tokenList,
}: {
  token: IToken | undefined
  allIchiVaultsByTokenPair: IchiVault[] | undefined | null
  tokenList: IToken[]
}) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [selected, setIsSelected] = useState<string>('Choose one')
  const { account } = useActiveConnectionDetails()

  const web3Provider = getWeb3Provider()
  const dex = SupportedDex.Fenix

  const vaultAddress =
    allIchiVaultsByTokenPair?.find((vault) => {
      if (vault.tokenA.toLowerCase() === selected.toLowerCase() && vault.allowTokenA) {
        return true
      }
      if (vault.tokenB.toLowerCase() === selected.toLowerCase() && vault.allowTokenB) {
        return true
      }
      return false
    }) || null
  const [totalUserShares, setTotalUserShares] = useState<string>('0')
  const [amoutToWithdraw, setAmountToWithdraw] = useState<string>('')

  const getButtonText = () => {
    if (!account) return 'Connect Wallet'
    if (!vaultAddress) return 'Vault not available'
    if (!amoutToWithdraw || amoutToWithdraw == '0') return 'Enter an amount'
    if (amoutToWithdraw > totalUserShares) return 'Insufficient balance'
    return BUTTON_TEXT_WITHDRAW
  }

  // const NOT_USE_THIS_VAULT = '0x468e041af71b28be7c3b2ad9f91696a0206f0053' // BNB Vault in thena for testing

  // useEffect to get the total user shares (balance in the vault)
  useEffect(() => {
    if (!account || !vaultAddress) {
      setTotalUserShares('0')
      return
    }

    setIsSelected(vaultAddress.allowTokenA ? vaultAddress.tokenA.toLowerCase() : vaultAddress.tokenB.toLowerCase())
    const getTotalUserShares = async () => {
      const data = await getUserBalance(account, vaultAddress.id, web3Provider, dex)
      setTotalUserShares(data)
    }
    getTotalUserShares()
  }, [account, vaultAddress, web3Provider])
  useEffect(() => {
    if (allIchiVaultsByTokenPair && allIchiVaultsByTokenPair?.length > 0) {
      const firstToken = allIchiVaultsByTokenPair[0]
      setIsSelected(
        firstToken.allowTokenA ? firstToken.tokenA.toLocaleLowerCase() : firstToken.tokenB.toLocaleLowerCase()
      )
    }
  }, [allIchiVaultsByTokenPair])
  // withdraw function
  // FIXME: poner toast??
  const withdrawFromVault = async () => {
    if (getButtonText() !== BUTTON_TEXT_WITHDRAW) return
    if (!account) return
    if (!vaultAddress) return
    try {
      const txnDetails = await withdraw(account, amoutToWithdraw, vaultAddress.id, web3Provider, dex)
      toast.success('Withdrawal Transaction Sent')
      txnDetails.wait()
      toast.success('Withdrawal Successful')
    } catch (error: any) {
      if (error?.code == 401) return
      toast.error(error?.message)
    }
  }
  return (
    <>
      <div className="bg-shark-400 bg-opacity-40 px-[15px] py-[29px] md:px-[19px] border border-shark-950 rounded-[10px] mb-2.5">
        <div className="flex items-center mb-2 text-xs leading-normal w-full xl:w-3/5 justify-between">
          <div className=" text-white">Withdraw amounts</div>
          <span className="text-xs leading-normal text-shark-100 mr-4 flex items-center gap-x-2">
            <span className="icon-wallet text-xs"></span>
            Withdrawable: {totalUserShares != '0' ? formatAmount(totalUserShares) : '-'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full xl:w-3/5">
            <Toaster />
            <NumericalInput
              value={amoutToWithdraw}
              onUserInput={(value) => {
                setAmountToWithdraw(value)
              }}
              precision={INPUT_PRECISION}
              placeholder="0.0"
              className="bg-shark-400 bg-opacity-40 border border-shark-400 h-[50px] w-full rounded-lg outline-none px-3 text-white text-sm"
            />
            <div className="absolute right-2 top-[10px] flex items-center gap-1 max-md:hidden">
              <Button
                variant="tertiary"
                className="!py-1 !px-3"
                onClick={() => {
                  if (!totalUserShares || totalUserShares == '') return
                  setAmountToWithdraw(toBN(totalUserShares).div(2).toString())
                }}
              >
                Half
              </Button>
              <Button
                variant="tertiary"
                className="!py-1 !px-3"
                onClick={() => {
                  if (!totalUserShares || totalUserShares == '') return
                  setAmountToWithdraw(toBN(totalUserShares).toString())
                }}
              >
                Max
              </Button>
            </div>
          </div>

          <div className="relative xl:w-2/5 flex-shrink-0">
            <div className="bg-shark-400 bg-opacity-40 rounded-lg text-white px-4 flex items-center justify-between h-[50px]">
              {allIchiVaultsByTokenPair && allIchiVaultsByTokenPair.length !== 0 ? (
                <>
                  <div
                    className="w-full flex justify-between items-center gap-2"
                    onClick={() => setIsActive(!isActive)}
                  >
                    <div className="flex justify-center items-center gap-3">
                      {/* {selected !== 'Choose one' ? ( */}
                      <>
                        <Image
                          src={`/static/images/tokens/${tokenAddressToSymbol[selected]}.svg`}
                          alt="token"
                          className="w-6 h-6 rounded-full"
                          width={20}
                          height={20}
                        />
                        <span className="text-base">{tokenAddressToSymbol[selected]}</span>
                      </>
                    </div>
                    <span
                      className={`inline-block ml-2 text-xs icon-chevron md:text-sm ${isActive ? 'rotate-180' : ''}`}
                    />
                  </div>
                  <div
                    className={`rounded-lg absolute top-[calc(100%+10px)] w-[230px] left-1/2 max-md:-translate-x-1/2 md:w-full md:left-0 right-0 flex flex-col gap-[5px] overflow-auto scrollbar-hide z-20 p-3
                    ${isActive ? 'visible bg-shark-500 !bg-opacity-80 border-shark-200' : 'hidden'}`}
                  >
                    {allIchiVaultsByTokenPair.map((vault) => (
                      <div
                        className="flex justify-start items-center gap-3 cursor-pointer m-3 p-2 bg-shark-300 border-shark-200 rounded-md hover:bg-shark-100"
                        key={vault.id}
                        onClick={() => {
                          setIsActive(!isActive)
                          setIsSelected(
                            vault.allowTokenA ? vault.tokenA.toLocaleLowerCase() : vault.tokenB.toLocaleLowerCase()
                          )
                        }}
                      >
                        <Image
                          src={`/static/images/tokens/${
                            tokenAddressToSymbol[
                              vault.allowTokenA ? vault.tokenA.toLowerCase() : vault.tokenB.toLowerCase()
                            ]
                          }.svg`}
                          alt="token"
                          className="w-6 h-6 rounded-full"
                          width={20}
                          height={20}
                        />
                        <span className="text-base">
                          {
                            tokenAddressToSymbol[
                              vault.allowTokenA ? vault.tokenA.toLocaleLowerCase() : vault.tokenB.toLocaleLowerCase()
                            ]
                          }
                        </span>

                        {/* <span className="text-base">{token?.symbol}</span> */}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-sm text-shark-100">No vaults available</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Button onClick={withdrawFromVault} variant="tertiary" className="w-full mx-auto !text-xs !h-[49px]">
        {getButtonText()}
      </Button>
    </>
  )
}

export default WithdrawAmountsICHI
