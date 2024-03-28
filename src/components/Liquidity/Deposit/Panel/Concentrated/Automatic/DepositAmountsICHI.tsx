import { Button } from '@/src/components/UI'
import { ichiVaultABI } from '@/src/library/constants/abi'
import { useERC20Balance } from '@/src/library/hooks/web3/erc20/useERC20Balance'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
import Image from 'next/image'
import { useState } from 'react'
import { useWriteContract } from 'wagmi'

const DepositAmountsICHI = ({ token }: { token: { name: string; symbol: string } }) => {
  const token0 = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619' // Wrapped Ether
  const [token0DepositAmount, setToken0DepositAmount] = useState('')
  const { account: userAddress, chain, chainId } = useActiveConnectionDetails()
  const depositVault = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'
  const { writeContract } = useWriteContract()

  const { tokenBalance: tokenBalance0 } = useERC20Balance({
    tokenAddress: token0,
    tokenDecimals: 18,
    owner: userAddress,
  })
  console.log(tokenBalance0?.toString())
  const createPosition = async () => {
    try {
      writeContract({
        abi: ichiVaultABI,
        address: depositVault,
        functionName: 'deposit',
        args: [],
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="bg-shark-400 bg-opacity-40 px-[15px] py-[29px] md:px-[19px] border border-shark-950 rounded-[10px] mb-2.5">
      <div className="text-xs leading-normal text-white mb-2">Deposit amounts</div>
      <div className="flex items-center gap-3">
        <div className="relative w-full xl:w-3/5">
          <input
            type="text"
            placeholder="0"
            className="bg-shark-400 bg-opacity-40 border border-shark-400 h-[50px] w-full rounded-lg outline-none px-3 text-white text-sm"
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
              <Image
                src={`/static/images/tokens/${token.symbol}.png`}
                alt="token"
                className="w-6 h-6 rounded-full"
                width={20}
                height={20}
              />
              <span className="text-base">{token.symbol}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepositAmountsICHI
