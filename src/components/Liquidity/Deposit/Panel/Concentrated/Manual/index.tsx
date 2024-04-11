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
    name: 'Ethereum',
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

  const account = useAccount()
  const { writeContractAsync } = useWriteContract()

  useEffect(() => {
    if (poolState.price == 0) return

    const asyncFn = async () => {
      const realRatio: number = parseFloat(await getRatio(poolState.currentTick, higherTick, lowerTick))
      setRatio(isInverse ? parseFloat(realRatio.toString()) : 1 / parseFloat(realRatio.toString()))
    }

    asyncFn()
  }, [rangePrice1, rangePrice2, poolState, isInverse])

  useEffect(() => {
    setSecondValue((Number(firstValue) * ratio).toFixed(10).replace(/(\.\d*?[1-9])0+$|\.$/, '$1'))
  }, [ratio])

  useEffect(() => {
    if (defaultPairs.length == 2) {
      setFirstToken(defaultPairs[0])
      setSecondToken(defaultPairs[1])
    }
  }, [defaultPairs])

  useEffect(() => {
    setIsInverse(parseInt(firstToken.address as string) > parseInt(secondToken.address as string))

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
      // console.log('state = ', state)
      setPoolState(state as StateType)
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
      }
    }

    asyncFn()
  }, [currentPercentage, poolState])

  const handleCLAdd = async () => {
    const _firstToken = isInverse ? secondToken : firstToken
    const _secondToken = isInverse ? firstToken : secondToken
    const _firstValue = isInverse ? secondValue : firstValue
    const _secondValue = isInverse ? firstValue : secondValue

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
        },
        onError: (e) => {
          console.log(e)
          toast(`Added LP failed. `)
        },
      }
    )
  }

  const handleApprove = async (token: Address) => {
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
        },
        onError: (e) => {
          toast(`Approve failed.`)
        },
      }
    )
  }

  const handleOnTokenValueChange = async (input: any, token: IToken) => {
    // TODO: handle if pair is not created
    if (firstToken.address === token.address) {
      setFirstValue(
        parseFloat(input) != 0
          ? (Number(input) % 1 === 0 ? input : parseFloat(input).toFixed(10)).replace(/(\.\d*?[1-9])0+$|\.$/, '$1')
          : input
      )
      setSecondValue(
        parseFloat((input * ratio).toString())
          .toFixed(10)
          .replace(/(\.\d*?[1-9])0+$|\.$/, '$1')
      )
    } else {
      setSecondValue(
        parseFloat(input) != 0
          ? (Number(input) % 1 === 0 ? input : parseFloat(input).toFixed(10)).replace(/(\.\d*?[1-9])0+$|\.$/, '$1')
          : input
      )
      setFirstValue(
        parseFloat((input / ratio).toString())
          .toFixed(10)
          .replace(/(\.\d*?[1-9])0+$|\.$/, '$1')
      )
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
        {shouldApproveFirst
          ? `Approve ${firstToken.symbol}`
          : shouldApproveSecond
            ? `Approve ${secondToken.symbol}`
            : `Create Position`}
      </Button>
    </>
  )
}

export default ConcentratedDepositLiquidityManual
