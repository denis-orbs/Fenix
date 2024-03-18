'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/src/components/UI'
import SelectToken from '@/src/components/Modals/SelectToken'

import { IToken } from '@/src/library/types'
import { useBalance, useReadContract } from 'wagmi'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
import { ERC20_ABI } from '@/src/library/constants/abi'
import { BN_TEN, formatPrice, toBN } from '@/src/library/utils/numbers'

interface SwapProps {
  token: IToken
  value: number
  setToken: (token: IToken) => void
  setValue: (value: number) => void
}

const Swap = ({ token, setToken, setValue, value }: SwapProps) => {
  const [openSelectToken, setOpenSelectToken] = useState<boolean>(false)

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => setValue(parseFloat(e.target.value))
  const { account } = useActiveConnectionDetails()

  const tokenData = useReadContract({
    address: token.address,
    functionName: 'balanceOf',
    args: [account],
    abi: ERC20_ABI,
  })
  const [number, setNumber] = useState('-')
  useEffect(() => {
    if (tokenData.isSuccess) {
      const myNumber = tokenData.data as bigint
      const myBigNumber = toBN(myNumber.toString())
      const resultado = myBigNumber.div(BN_TEN.pow(token.decimals)).toString()
      setNumber(formatPrice(resultado, 6))
    }
  }, [tokenData, token.decimals])
  const handlerSelectToken = () => setOpenSelectToken(true)
  return (
    <div className="exchange-box-x1">
      <div className="flex items-center justify-between mb-3">
        <p className="text-white text-sm">Swap</p>
        <p className="text-shark-100 flex gap-3 text-sm items-center">
          <span className="icon-wallet text-xs"></span>
          <span>Available: {!tokenData.isLoading ? number : '-'}</span>
        </p>
      </div>
      <div className="flex flex-col xl:flex-row items-center gap-3">
        <div className="relative w-full xl:w-2/6">
          <div
            onClick={handlerSelectToken}
            className="bg-shark-400 bg-opacity-40 rounded-lg text-white px-4 flex items-center justify-between h-[50px] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Image
                src={`/static/images/tokens/${token.symbol}.svg`}
                alt="token"
                className="w-6 h-6 rounded-full"
                width={20}
                height={20}
              />
              <span className="text-base">{token.symbol}</span>
            </div>
            <span className="icon-chevron text-sm inline-block ml-2" />
          </div>
        </div>
        <div className="relative w-full xl:w-4/6">
          <input
            type="number"
            placeholder="0"
            onChange={onChangeInput}
            value={value}
            className="bg-shark-400 bg-opacity-40 border border-shark-400 h-[50px] w-full rounded-lg outline-none px-3 text-white text-sm"
          />
          <div className="absolute right-2 top-[10px] flex items-center gap-1">
            <Button variant="tertiary" className="!py-1 !px-3" onClick={() => setValue(toBN(number).div(2).toNumber())}>
              Half
            </Button>
            <Button variant="tertiary" className="!py-1 !px-3" onClick={() => setValue(toBN(number).toNumber())}>
              Max
            </Button>
          </div>
        </div>
      </div>
      <SelectToken openModal={openSelectToken} setOpenModal={setOpenSelectToken} setToken={setToken} />
    </div>
  )
}

export default Swap
