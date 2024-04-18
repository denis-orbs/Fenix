'use client'

import Image from 'next/image'
import { Button } from '@/src/components/UI'
import { useAccount, useBalance } from 'wagmi'
import { IToken } from '@/src/library/types'
import { useEffect, useState } from 'react'
import { getTokenBalance } from '@/src/library/hooks/web3/useTokenBalance'
import { Address } from 'viem'
import { ethers } from 'ethers'
import { formatNumber } from '@/src/library/utils/numbers'

interface ExchangeBoxProps {
  title?: string
  token: IToken
  onOpenModal?: () => void
  variant?: 'primary' | 'secondary'
  onTokenValueChange?: (arg0: any, token: any) => void
  value?: any
}

const ExchangeBox = ({ title, token, onOpenModal, variant, onTokenValueChange, value }: ExchangeBoxProps) => {
  const boxVariant = variant === 'secondary' ? 'exchange-box-x2' : 'exchange-box-x1'
  const availableAlign = title ? 'justify-between' : 'justify-end'
  const account = useAccount()
  const [balance, setBalance] = useState('0')

  useEffect(() => {
    const asyncFn = async () => {
      const b = await getTokenBalance(token.address as Address, account.address as Address)
      setBalance(b)
    }

    asyncFn()
  }, [token, account.address])

  const handleOnChange = (e: any) => {
    if (onTokenValueChange) onTokenValueChange(e.target.value.length > 0 ? e.target.value : 0, token)
  }

  const handleHalf = () => {
    if (onTokenValueChange) {    
      onTokenValueChange(ethers.utils.formatEther((BigInt(balance) / BigInt(2)).toString()), token)
    }
  }

  const handleMax = () => {
    if (onTokenValueChange) {
      onTokenValueChange(ethers.utils.formatEther(balance.toString()), token)
    }
  }

  return (
    <div className={boxVariant}>
      <div className={`flex items-center mb-3 ${availableAlign}`}>
        {title && <p className="text-white font-medium">{title}</p>}
        <p className="text-shark-100 flex gap-3 text-sm items-center">
          <span className="icon-wallet text-xs"></span>
          <span>
            Available: {`${formatNumber(Number(balance) / (10**token.decimals), 8)}`} {token.symbol}
          </span>
        </p>
      </div>
      <div className="flex flex-col xl:flex-row items-center gap-3">
        <div className="relative w-full xl:w-2/5">
          <div
            className="bg-shark-400 bg-opacity-40 rounded-lg text-white px-4 flex items-center justify-between h-[50px]"
            onClick={onOpenModal ? () => onOpenModal() : undefined}
          >
            <div className="flex items-center gap-2">
              <Image src={`${token.img ? token.img : '/static/images/tokens/FNX.svg'}`} alt="token" className="w-6 h-6 rounded-full" width={20} height={20} />
              <span className="text-base">{token.symbol}</span>
            </div>
            <span className="icon-chevron text-sm inline-block ml-2" />
          </div>
        </div>
        <div className="relative w-full xl:w-3/5">
          <input
            type="number"
            placeholder="0"
            className="bg-shark-400 bg-opacity-40 border border-shark-400 h-[50px] w-full rounded-lg outline-none px-3 text-white text-sm"
            onChange={handleOnChange}
            value={value}
          />
          <div className="absolute right-2 top-[10px] flex items-center gap-1">
            <Button variant="tertiary" className="!py-1 !px-3" onClick={handleHalf}>
              Half
            </Button>
            <Button variant="tertiary" className="!py-1 !px-3" onClick={handleMax}>
              Max
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExchangeBox
