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
  
  const handleCLAdd = async () => {
    writeContractAsync({ 
      abi: CL_MANAGER_ABI,
      address: contractAddressList.cl_manager as Address,
      functionName: 'mint', 
      args: [[
        secondToken.address as Address, 
        firstToken.address as Address, 
        "-81780", 
        "-81720",
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
      <SetRange />
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
          `Approve ${firstToken.address}`
          : shouldApproveSecond ?
          `Approve ${secondToken.address}`
          : `Create Position`
        }
      </Button>
    </>
  )
}

export default ConcentratedDepositLiquidityManual
