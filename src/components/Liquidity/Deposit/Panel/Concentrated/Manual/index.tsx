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
import { getAlgebraPoolPrice } from '@/src/library/hooks/liquidity/useCL'

interface StateType {
  price: number;
  currentTick: number;
}

const ConcentratedDepositLiquidityManual = ({
  defaultPairs
}: {
  defaultPairs: IToken[]
}) => {
  const [firstToken, setFirstToken] = useState({ name: 'Fenix', symbol: 'FNX', id: 0, decimals: 18, address: "0xa12e4649fdddefd0fb390e4d4fb34ffbd2834fa6" as Address, img: "/static/images/tokens/FNX.svg" } as IToken)
  const [firstValue, setFirstValue] = useState("")
  const [secondToken, setSecondToken] = useState({ name: 'Ethereum', symbol: 'ETH', id: 1, decimals: 18, address: "0x4200000000000000000000000000000000000023" as Address, img: "/static/images/tokens/WETH.svg" } as IToken)
  const [secondValue, setSecondValue] = useState("")
  const [shouldApproveFirst, setShouldApproveFirst] = useState(true)
  const [shouldApproveSecond, setShouldApproveSecond] = useState(true)
  const [poolState, setPoolState] = useState<StateType>({price: 0, currentTick: 0})

  const [currentPercentage, setCurrentPercentage] = useState(5)
  const [rangePrice1, setRangePrice1] = useState(0)
  const [rangePrice2, setRangePrice2] = useState(0)

  const account = useAccount()
  const { writeContractAsync } = useWriteContract()

  useEffect(() => {
    if(defaultPairs.length == 2) {
      setFirstToken(defaultPairs[0])
      setSecondToken(defaultPairs[1])
    }
  }, [defaultPairs])
  
  useEffect(()=> {
    const asyncGetAllowance = async () => {
        const allowanceFirst: any = await getTokenAllowance(firstToken.address as Address, account.address as Address, contractAddressList.cl_manager as Address)
        const allowanceSecond: any = await getTokenAllowance(secondToken.address as Address, account.address as Address, contractAddressList.cl_manager as Address)

        setShouldApproveFirst(allowanceFirst == "0")
        setShouldApproveSecond(allowanceSecond == "0")
    }

    asyncGetAllowance();
  }, [firstToken, secondToken, account.address])
  
  useEffect(() => {
    const asyncFn = async () => {
      const state = await getAlgebraPoolPrice(firstToken.address as Address, secondToken.address as Address)
      setPoolState(state as StateType)
      console.log("1 ETH =", Number((state as StateType).price)/1e18, "FNX")
      setRangePrice1(Number((state as StateType).price)/1e18*0.95)
      setRangePrice2(Number((state as StateType).price)/1e18*1.05)
    }

    if(poolState.price == 0) asyncFn()
  }, [firstToken, secondToken])

  useEffect(() => {
    setRangePrice1(Number(poolState.price)/1e18*(1-(currentPercentage/100)))
    setRangePrice2(Number(poolState.price)/1e18*(1+(currentPercentage/100)))
  }, [currentPercentage])
  // min/max ticks = -887220/887220;

  const handleCLAdd = async () => {
    writeContractAsync({ 
      abi: CL_MANAGER_ABI,
      address: contractAddressList.cl_manager as Address,
      functionName: 'mint', 
      args: [[
        firstToken.address as Address, 
        secondToken.address as Address, 
        "-887220", 
        "887220",
        "10000000000000000",
        "10000000000000000",
        0, 
        0, 
        account.address as Address, 
        parseInt((+new Date()/1000).toString())+60*60
      ]], 
    },
    {
      onSuccess: async (x) => {
        const transaction = await publicClient.waitForTransactionReceipt({hash: x});
        console.log(transaction)
        if(transaction.status == "success") {
          toast(`Added LP successfully.`);
        } else {
          toast(`Added LP TX failed, hash: ${transaction.transactionHash}`);
        }
      },
      onError: (e) => {
        console.log(e)
        toast(`Added LP failed. ${e}`);
      },
    })
  }

  const handleApprove = async (token: Address) => {
    writeContractAsync({ 
      abi: ERC20_ABI,
      address: token,
      functionName: 'approve', 
      args: [
        contractAddressList.cl_manager,
        maxUint256
      ], 
    },
    {
      onSuccess: async (x) => {
        const transaction = await publicClient.waitForTransactionReceipt({hash: x});
        if(transaction.status == "success") {
          toast(`Approved successfully`);
        } else {
          toast(`Approve TX failed, tx: ${transaction.transactionHash}`);
        }

        const allowanceFirst: any = await getTokenAllowance(firstToken.address as Address, account.address as Address, contractAddressList.cl_manager as Address)
        const allowanceSecond: any = await getTokenAllowance(secondToken.address as Address, account.address as Address, contractAddressList.cl_manager as Address)

        setShouldApproveFirst(allowanceFirst == "0")
        setShouldApproveSecond(allowanceSecond == "0")
      },
      onError: (e) => {
        toast(`Approve failed. ${e}`);
      },
    })
  }
  
  return (
    <>
      <div><Toaster position="top-center" reverseOrder={false}/></div>
      <SetRange currentPercentage={currentPercentage} setCurrentPercentage={setCurrentPercentage} price1={rangePrice1} price2={rangePrice2}/>
      <TokensSelector
        firstToken={firstToken}
        secondToken={secondToken}
        firstValue={firstValue}
        secondValue={secondValue}
        setFirstToken={(token) => setFirstToken(token)}
        setSecondToken={(token) => setSecondToken(token)}
        setFirstValue={(value) => setFirstValue(value)}
        setSecondValue={(value) => setSecondValue(value)}
        onTokenValueChange={() => {}}
      />
      <Button className="w-full mx-auto !text-xs !h-[49px]" variant="tertiary" onClick={
        () => {
          shouldApproveFirst ?
          handleApprove(firstToken.address as Address) 
          : shouldApproveSecond ? 
          handleApprove(secondToken.address as Address) 
          : handleCLAdd()
        }
      }>
        {
          shouldApproveFirst ? 
          `Approve ${firstToken.symbol}`
          : shouldApproveSecond ?
          `Approve ${secondToken.symbol}`
          : `Create Position`
        }
      </Button>
    </>
  )
}

export default ConcentratedDepositLiquidityManual
