import Image from 'next/image'
import { Button } from '@/src/components/UI'
import { useEffect, useState } from 'react'
import TokensSelector from '@/src/components/Liquidity/Common/TokensSelector'
import ExchangeBox from '@/src/components/Liquidity/Common/ExchangeBox'
import SelectToken from '@/src/components/Modals/SelectToken'
import { getLiquidityRemoveQuote, getTokenReserve } from '@/src/library/hooks/liquidity/useClassic'
import { Address } from 'viem'
import { IToken } from '@/src/library/types'
import Separator from '@/src/components/Trade/Common/Separator'
import { useAccount, useWriteContract } from 'wagmi'
import { ROUTERV2_ABI } from '@/src/library/constants/abi'
import { contractAddressList } from '@/src/library/constants/contactAddresses'
import { ethers } from 'ethers'

const Classic = ({
  depositType,
}: {
  depositType: 'VOLATILE' | 'STABLE' | 'CONCENTRATED_AUTOMATIC' | 'CONCENTRATED_MANUAL'
  tokenSwap: { name: string; symbol: string }
  tokenFor: { name: string; symbol: string }
}) => {
  const [firstToken, setFirstToken] = useState({ name: 'Fenix', symbol: 'FNX', id: 0, decimals: 18, address: "0x52f847356b38720B55ee18Cb3e094ca11C85A192" as Address } as IToken)
  const [firstValue, setFirstValue] = useState(0)
  const [secondToken, setSecondToken] = useState({ name: 'Ethereum', symbol: 'ETH', id: 1, decimals: 18, address: "0x4300000000000000000000000000000000000004" as Address } as IToken)
  const [secondValue, setSecondValue] = useState(0)
  const [firstReserve, setFirstReserve] = useState(0)
  const [secondReserve, setSecondReserve] = useState(0)
  const [optionActive, setOptionActive] = useState<'ADD' | 'WITHDRAW'>('ADD')
  const [openSelectToken, setOpenSelectToken] = useState<boolean>(false)
  const [lpValue, setLpValue] = useState(0)
  
  const account = useAccount()
  const { writeContractAsync } = useWriteContract()

  const handlerOption = (option: 'ADD' | 'WITHDRAW') => {
    setOptionActive(option)
    setFirstValue(0);
    setSecondValue(0);
  }

  useEffect(()=> {
    const asyncGetReserve = async () => {
        const reserve: any = await getTokenReserve(firstToken.address as Address, secondToken.address as Address, depositType === 'STABLE')

        if(reserve[0] == 0 || reserve[1] == 0) {
          setFirstReserve(1)
          setSecondReserve(1)
        } else {
          setFirstReserve(reserve[0])
          setSecondReserve(reserve[1])
        }
    }

    asyncGetReserve();
  }, [firstToken, secondToken])


  const handleOnTokenValueChange = (input: any, token: IToken) => {
    if(input.length > 0 && !input.endsWith(".")) input = parseFloat(input).toString()
    if(input.length > 0 && input.endsWith("..")) input = input.slice(0, -1)

    if(optionActive == "ADD") {
      // TODO: handle if pair is not created
      if(firstToken.address === token.address) {
        setSecondValue(parseFloat(input) * Number(secondReserve) / Number(firstReserve))
        setFirstValue(input)
      } else {
        setFirstValue(parseFloat(input) * Number(firstReserve) / Number(secondReserve))
        setSecondValue(input)
      }
    }
  }

  const handleOnLPTokenValueChange = (input: any, token: IToken) => {
    if(input.length > 0 && !input.endsWith(".")) input = parseFloat(input).toString()
    if(input.length > 0 && input.endsWith("..")) input = input.slice(0, -1)

    setLpValue(input)

    if(optionActive == "WITHDRAW") {
      const asyncGetWithdrawTokens = async () => {
        const tokens: any = await getLiquidityRemoveQuote(input, firstToken.address as Address, secondToken.address as Address, depositType === 'STABLE')
        setFirstValue(Number(tokens[0])/1e18)
        setSecondValue(Number(tokens[1])/1e18)
      }

      asyncGetWithdrawTokens();
    }
  }

  const handleAddLiquidity = async () => {
    // TODO values check
    await writeContractAsync({ 
      abi: ROUTERV2_ABI,
      address: contractAddressList.v2router as Address,
      functionName: 'addLiquidity', 
      // TODO: handle deadline and slippage
      args: [
        firstToken.address as Address, 
        secondToken.address as Address, 
        depositType === 'STABLE', 
        ethers.parseUnits(firstValue.toString(), 'ether'), 
        ethers.parseUnits(secondValue.toString(), 'ether'), 
        0, 
        0, 
        account.address as Address, 
        parseInt((+new Date()/1000).toString())+60*60
      ], 
    }).then(() => {
      console.log("Add LP tx is sent.")
    })
  }

  const handleRemoveLiquidity = async () => {
    // TODO values check
    writeContractAsync({ 
      abi: ROUTERV2_ABI,
      address: contractAddressList.v2router as Address,
      functionName: 'removeLiquidity', 
      // TODO: handle deadline and slippage
      args: [
        firstToken.address as Address, 
        secondToken.address as Address, 
        depositType === 'STABLE', 
        ethers.parseUnits(lpValue.toString(), 'ether'), 
        0, 
        0, 
        account.address as Address, 
        parseInt((+new Date()/1000).toString())+60*60
      ], 
    }).then(() => {
      console.log("Remove LP tx is sent.")
    })
  }

  return (
    <>
      <div className="bg-shark-400 bg-opacity-40 py-[11px] px-[19px] flex items-center justify-between gap-2.5 border border-shark-950 rounded-[10px] mb-2.5 max-md:items-start">
        <div>
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="flex items-center flex-shrink-0">
              <Image
                src="/static/images/tokens/FNX.svg"
                alt="token"
                className="rounded-full max-md:w-5 max-md:h-5"
                width={30.5}
                height={30.5}
              />
              <Image
                src="/static/images/tokens/ETH.svg"
                alt="token"
                className="-ml-2.5 md:-ml-4 rounded-full max-md:w-5 max-md:h-5"
                width={30.5}
                height={30.5}
              />
            </div>
            <div className="flex flex-col gap-px">
              <h5 className="text-xs md:text-sm text-white leading-normal font-medium">FNX / ETH</h5>
              <div className="flex items-center gap-[5px] max-md:flex-wrap">
                {'VOLATILE' === depositType ? (
                  <Button variant="tertiary" className="!py-1 h-[28px] max-md:!text-xs flex-shrink-0">
                    Volatile Pool
                  </Button>
                ) : 'CONCENTRATED_AUTOMATIC' === depositType || 'CONCENTRATED_MANUAL' === depositType ? (
                  <Button
                    variant="tertiary"
                    className="!py-1 hover:!border-none !bg-green-500 !border !border-solid !border-1 !border-green-400 !bg-opacity-40 h-[28px] max-md:!text-xs flex-shrink-0"
                  >
                    Concentrated
                  </Button>
                ) : 'STABLE' === depositType ? (
                  <Button variant="tertiary" className="!px-5 !py-0 h-[28px] max-md:!text-xs flex-shrink-0">
                    Stable Pool
                  </Button>
                ) : null}

                <Button
                  variant="tertiary"
                  className="!px-5 !py-0 h-[28px] !border-opacity-100 [&:not(:hover)]:border-shark-200 !bg-shark-300 !bg-opacity-40 max-md:!text-xs flex-shrink-0"
                >
                  0.3%
                </Button>
                <Button
                  variant="tertiary"
                  className="!p-0 h-[28px] w-[33px] !border-opacity-100 [&:not(:hover)]:border-shark-200 !bg-shark-300 !bg-opacity-40 max-md:!text-xs flex-shrink-0"
                >
                  <span className="icon-info"></span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center text-xs leading-normal max-md:flex-wrap gap-[5px]">
            <div className="text-white">Liquidity</div>
            <div className="flex items-center gap-2.5">
              <p className="flex gap-[5px] items-center text-shark-100 flex-shrink-0">
                <Image
                  src="/static/images/tokens/FNX.svg"
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                <span>2,313,873.46</span>
              </p>
              <p className="flex gap-[5px] items-center text-shark-100 flex-shrink-0">
                <Image
                  src="/static/images/tokens/ETH.svg"
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                <span>225.38</span>
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs leading-normal text-white">
          <div className="md:mb-[5px] text-right">APR</div>

          <p className="py-[5px] px-5 border border-solid bg-shark-400 rounded-[10px] bg-opacity-40 border-1 border-shark-300">
            0%
          </p>
        </div>
      </div>

      <div className="bg-shark-400 bg-opacity-40 p-[13px] md:py-[11px] md:px-[19px] flex gap-1.5 md:gap-2.5 border border-shark-950 rounded-[10px] mb-2.5">
        <Button
          onClick={() => handlerOption('ADD')}
          className="w-full h-[38px] mx-auto !text-xs"
          variant={optionActive === 'ADD' ? 'primary' : 'secondary'}
        >
          Add
        </Button>
        <Button
          onClick={() => handlerOption('WITHDRAW')}
          className="w-full h-[38px] mx-auto !text-xs"
          variant={optionActive === 'WITHDRAW' ? 'primary' : 'secondary'}
        >
          Withdraw
        </Button>
      </div>

      <div className="flex flex-col gap-1 relative">
        {optionActive === 'WITHDRAW' && (
          <>
            <div className="mb-3">
              {
                // TODO: handle LP tokens list
              }
              <ExchangeBox token={{ name: 'Fenix/Ether LP', symbol: 'FNX/ETH LP', id: 0, decimals: 18, address: "0x2AA504586d6CaB3C59Fa629f74c586d78b93A025" as Address } as IToken} onOpenModal={() => setOpenSelectToken(true)} variant="primary" onTokenValueChange={handleOnLPTokenValueChange} />

              <SelectToken openModal={openSelectToken} setOpenModal={setOpenSelectToken} setToken={setFirstToken} />
            </div>
            <Separator single />
          </>
        )}
        <TokensSelector
          firstToken={firstToken}
          setFirstToken={setFirstToken}
          firstValue={firstValue}
          setFirstValue={setFirstValue}
          secondToken={secondToken}
          setSecondToken={setSecondToken}
          secondValue={secondValue}
          setSecondValue={setSecondValue}
          onTokenValueChange={handleOnTokenValueChange}
        />
      </div>

      <Button className="w-full mx-auto !text-xs !h-[49px]" variant="tertiary" onClick={
        () => {
          optionActive == 'ADD' ? handleAddLiquidity() : handleRemoveLiquidity()
        }
      }>
        Create Position
      </Button>
    </>
  )
}

export default Classic