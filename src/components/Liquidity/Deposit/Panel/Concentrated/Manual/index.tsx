import { useEffect, useState } from 'react'
import TokensSelector from '@/src/components/Liquidity/Common/TokensSelector'
import SetRange from './SetRange'
import { Button } from '@/src/components/UI'
import { Address, maxUint256 } from 'viem'
import { IToken } from '@/src/library/types'
import { CL_MANAGER_ABI, ERC20_ABI } from '@/src/library/constants/abi'
import { contractAddressList } from '@/src/library/constants/contactAddresses'
import { useAccount, useWriteContract } from 'wagmi'
import { publicClient } from '@/src/library/constants/viemClient'
import toast, { Toaster } from 'react-hot-toast'
import { getTokenAllowance } from '@/src/library/hooks/liquidity/useClassic'
import { getAlgebraPoolPrice, getAmounts, getPriceAndTick, getRatio } from '@/src/library/hooks/liquidity/useCL'
import { ethers } from 'ethers'
import { formatNumber } from '@/src/library/utils/numbers'
import Loader from '@/src/components/UI/Icons/Loader'

interface StateType {
  price: number
  currentTick: number
}

const ConcentratedDepositLiquidityManual = ({ defaultPairs }: { defaultPairs: IToken[] }) => {
  const [firstToken, setFirstToken] = useState({
    name: 'Fenix',
    symbol: 'FNX',
    id: 0,
    decimals: 18,
    address: '0xa12e4649fdddefd0fb390e4d4fb34ffbd2834fa6' as Address,
    img: '/static/images/tokens/FNX.svg',
  } as IToken)
  const [firstValue, setFirstValue] = useState('')
  const [secondToken, setSecondToken] = useState({
    name: 'Wrapped Ether',
    symbol: 'ETH',
    id: 1,
    decimals: 18,
    address: '0x4200000000000000000000000000000000000023' as Address,
    img: '/static/images/tokens/WETH.svg',
  } as IToken)
  const [secondValue, setSecondValue] = useState('')
  const [shouldApproveFirst, setShouldApproveFirst] = useState(true)
  const [shouldApproveSecond, setShouldApproveSecond] = useState(true)
  const [poolState, setPoolState] = useState<StateType>({ price: 0, currentTick: 0 })

  const [currentPercentage, setCurrentPercentage] = useState(5)
  const [shownPercentage, setShownPercentage] = useState(['5', '5'])
  const [rangePrice1, setRangePrice1] = useState(0)
  const [rangePrice2, setRangePrice2] = useState(0)

  const [ratio, setRatio] = useState(1)
  const [lowerTick, setLowerTick] = useState(0)
  const [higherTick, setHigherTick] = useState(0)

  const [isInverse, setIsInverse] = useState(
    parseInt(firstToken.address as string) > parseInt(secondToken.address as string)
  )

  const [multiplier, setMuliplier] = useState(1)

  const [isLoading, setIsLoading] = useState(true)

  const account = useAccount()
  const { writeContractAsync } = useWriteContract()

  useEffect(() => {
    if (!firstToken || !secondToken) return

    if (isInverse) {
      if (firstToken.decimals > secondToken.decimals) {
        setMuliplier(1 / 10 ** (firstToken.decimals - secondToken.decimals))
      } else if (firstToken.decimals < secondToken.decimals) {
        setMuliplier(10 ** (secondToken.decimals - firstToken.decimals))
      } else {
        setMuliplier(1)
      }
    } else {
      if (secondToken.decimals > firstToken.decimals) {
        setMuliplier(1 / 10 ** (secondToken.decimals - firstToken.decimals))
      } else if (secondToken.decimals < firstToken.decimals) {
        setMuliplier(10 ** (firstToken.decimals - secondToken.decimals))
      } else {
        setMuliplier(1)
      }
    }
  }, [firstToken, secondToken])

  useEffect(() => {
    if (poolState.price == 0) return

    const asyncFn = async () => {
      // console.log('current tick', poolState.currentTick)
      const realRatio: number = parseFloat(await getRatio(poolState.currentTick, higherTick, lowerTick))
      // console.log(
      //   'log',
      //   'get ratio',
      //   realRatio,
      //   isInverse ? parseFloat(realRatio.toString()) : 1 / parseFloat(realRatio.toString())
      // )

      // console.log('real ratio', realRatio)
      setRatio(isInverse ? parseFloat(realRatio.toString()) : 1 / parseFloat(realRatio.toString()))

      // console.log('tx', multiplier, firstToken, secondToken)
    }

    asyncFn()
  }, [lowerTick, higherTick, poolState, isInverse])

  useEffect(() => {
    setSecondValue(((Number(firstValue) * ratio) / multiplier).toFixed(10).replace(/(\.\d*?[1-9])0+$|\.$/, '$1'))
    // console.log('log', 'set second token after ratio')
  }, [ratio])

  useEffect(() => {
    // console.log('Do', firstToken.address, secondToken.address, ratio, isInverse, multiplier)
  }, [firstToken.address, secondToken.address, ratio, isInverse, multiplier])

  useEffect(() => {})
  useEffect(() => {
    if (defaultPairs.length == 2) {
      setFirstToken(defaultPairs[0])
      setSecondToken(defaultPairs[1])
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [defaultPairs])

  useEffect(() => {
    setIsInverse(BigInt(firstToken.address as string) > BigInt(secondToken.address as string))
    // console.log('log', 'set inverse', BigInt(firstToken.address as string) > BigInt(secondToken.address as string))

    // console.log(
    //   'isInverse',
    //   firstToken.address as string,
    //   secondToken.address as string,
    //   BigInt(firstToken.address as string),
    //   BigInt(secondToken.address as string),
    //   BigInt(firstToken.address as string) > BigInt(secondToken.address as string)
    // )

    const asyncGetAllowance = async () => {
      const allowanceFirst: any = await getTokenAllowance(
        firstToken.address as Address,
        account.address as Address,
        contractAddressList.cl_manager as Address
      )
      const allowanceSecond: any = await getTokenAllowance(
        secondToken.address as Address,
        account.address as Address,
        contractAddressList.cl_manager as Address
      )

      setShouldApproveFirst(allowanceFirst == '0')
      setShouldApproveSecond(allowanceSecond == '0')
    }

    asyncGetAllowance()
  }, [firstToken, secondToken, account.address])

  useEffect(() => {
    const asyncFn = async () => {
      const state = await getAlgebraPoolPrice(firstToken.address as Address, secondToken.address as Address)
      // console.log(state, 'price')
      // console.log('tx', 'state = ', state)
      // setPoolState(state as StateType)
      // console.log('log', 'edit state', firstToken.address, secondToken.address, state)

      //   console.log('price = ', Number((state as StateType).price) / 1e18, 'tick =', (state as StateType).currentTick)
      if (currentPercentage == -1) {
        setRangePrice1(0)
        setRangePrice2(-1)
      } else {
        setRangePrice1((Number(poolState.price) / 1e18) * (1 - currentPercentage / 100))
        setRangePrice2((Number(poolState.price) / 1e18) * (1 + currentPercentage / 100))
      }
    }

    asyncFn()
  }, [firstToken, secondToken])

  useEffect(() => {
    const asyncFn = async () => {
      if (currentPercentage == -1) {
        setLowerTick(-887220)
        setHigherTick(887220)
        setRangePrice1(0)
        setRangePrice2(-1)
        setShownPercentage(['', ''])
      } else {
        const priceAndTick1: { price: number; tick: number } = await getPriceAndTick(
          (Number(poolState.price) / 1e18) * (1 - currentPercentage / 100)
        )
        const priceAndTick2: { price: number; tick: number } = await getPriceAndTick(
          (Number(poolState.price) / 1e18) * (1 + currentPercentage / 100)
        )

        setLowerTick(priceAndTick1.tick)
        setHigherTick(priceAndTick2.tick)
        setRangePrice1(priceAndTick1.price / 1e18)
        setRangePrice2(priceAndTick2.price / 1e18)
        setShownPercentage([
          ((1 - priceAndTick1.price / poolState.price) * 100).toFixed(1),
          ((priceAndTick2.price / poolState.price - 1) * 100).toFixed(1),
        ])

        // console.log('log', 'price and tick', poolState.price)
      }
    }

    asyncFn()
  }, [currentPercentage, poolState])

  const handleCLAdd = async () => {
    setIsLoading(true)

    const _firstToken = isInverse ? secondToken : firstToken
    const _secondToken = isInverse ? firstToken : secondToken
    const _firstValue = isInverse ? secondValue : firstValue
    const _secondValue = isInverse ? firstValue : secondValue

    // console.log('tx', [
    //   _firstToken.address as Address,
    //   _secondToken.address as Address,
    //   lowerTick,
    //   higherTick,
    //   ethers.utils.parseUnits(_firstValue.toString(), 'ether'),
    //   ethers.utils.parseUnits(_secondValue.toString(), 'ether'),
    //   0,
    //   0,
    //   account.address as Address,
    //   parseInt((+new Date() / 1000).toString()) + 60 * 60,
    // ])

    writeContractAsync(
      {
        abi: CL_MANAGER_ABI,
        address: contractAddressList.cl_manager as Address,
        functionName: 'mint',
        args: [
          [
            _firstToken.address as Address,
            _secondToken.address as Address,
            lowerTick,
            higherTick,
            ethers.utils.parseUnits(_firstValue.toString(), 'ether'),
            ethers.utils.parseUnits(_secondValue.toString(), 'ether'),
            0,
            0,
            account.address as Address,
            parseInt((+new Date() / 1000).toString()) + 60 * 60,
          ],
        ],
      },
      {
        onSuccess: async (x) => {
          const transaction = await publicClient.waitForTransactionReceipt({ hash: x })
          if (transaction.status == 'success') {
            toast(`Added LP successfully.`)
          } else {
            toast(`Added LP TX failed, hash: ${transaction.transactionHash}`)
          }
          setIsLoading(false)
        },
        onError: (e) => {
          // console.log(e)
          toast(`Added LP failed. `)
          setIsLoading(false)
        },
      }
    )
  }

  const handleApprove = async (token: Address) => {
    setIsLoading(true)

    writeContractAsync(
      {
        abi: ERC20_ABI,
        address: token,
        functionName: 'approve',
        args: [contractAddressList.cl_manager, maxUint256],
      },
      {
        onSuccess: async (x) => {
          const transaction = await publicClient.waitForTransactionReceipt({ hash: x })
          if (transaction.status == 'success') {
            toast(`Approved successfully`)
          } else {
            toast(`Approve TX failed, tx: ${transaction.transactionHash}`)
          }

          const allowanceFirst: any = await getTokenAllowance(
            firstToken.address as Address,
            account.address as Address,
            contractAddressList.cl_manager as Address
          )
          const allowanceSecond: any = await getTokenAllowance(
            secondToken.address as Address,
            account.address as Address,
            contractAddressList.cl_manager as Address
          )

          setShouldApproveFirst(allowanceFirst == '0')
          setShouldApproveSecond(allowanceSecond == '0')
          setIsLoading(false)
        },
        onError: (e) => {
          toast(`Approve failed.`)
          setIsLoading(false)
        },
      }
    )
  }

  const handleOnTokenValueChange = async (input: any, token: IToken) => {
    // TODO: handle if pair is not created
    if (firstToken.address === token.address) {
      if (parseFloat(input) != 0) setSecondValue(formatNumber((parseFloat(input) * Number(ratio)) / multiplier))
      if (parseFloat(input) == 0) setSecondValue('')
      setFirstValue(parseFloat(input) != 0 ? formatNumber(parseFloat(input)) : input)
    } else {
      if (parseFloat(input) != 0)
        setFirstValue(formatNumber((parseFloat(input) / (Number(ratio) == 0 ? 1 : Number(ratio))) * multiplier))
      if (parseFloat(input) == 0) setFirstValue('')
      setSecondValue(parseFloat(input) != 0 ? formatNumber(parseFloat(input)) : input)
    }
  }

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <SetRange
        shownPercentage={shownPercentage}
        currentPercentage={currentPercentage}
        setCurrentPercentage={setCurrentPercentage}
        price1={isInverse ? rangePrice1 : 1 / rangePrice1}
        price2={isInverse ? rangePrice2 : 1 / rangePrice2}
        token1={isInverse ? secondToken : firstToken}
        token2={isInverse ? firstToken : secondToken}
        multiplier={multiplier}
      />
      <TokensSelector
        firstToken={firstToken}
        secondToken={secondToken}
        firstValue={firstValue}
        secondValue={secondValue}
        setFirstToken={(token) => setFirstToken(token)}
        setSecondToken={(token) => setSecondToken(token)}
        setFirstValue={(value) => setFirstValue(value)}
        setSecondValue={(value) => setSecondValue(value)}
        onTokenValueChange={handleOnTokenValueChange}
      />
      <Button
        className="w-full mx-auto !text-xs !h-[49px]"
        variant="tertiary"
        onClick={() => {
          shouldApproveFirst
            ? handleApprove(firstToken.address as Address)
            : shouldApproveSecond
              ? handleApprove(secondToken.address as Address)
              : handleCLAdd()
        }}
      >
        {isLoading ? (
          <Loader color="white" size={20} />
        ) : shouldApproveFirst ? (
          `Approve ${firstToken.symbol}`
        ) : shouldApproveSecond ? (
          `Approve ${secondToken.symbol}`
        ) : (
          `Create Position`
        )}
      </Button>
    </>
  )
}

export default ConcentratedDepositLiquidityManual
