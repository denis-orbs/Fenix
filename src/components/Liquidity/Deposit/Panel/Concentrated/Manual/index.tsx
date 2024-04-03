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

const ConcentratedDepositLiquidityManual = ({
  defaultPairs
}: {
  defaultPairs: IToken[]
}) => {
  const [firstToken, setFirstToken] = useState({ name: 'Fenix', symbol: 'FNX', id: 0, decimals: 18, address: "0xa12e4649fdddefd0fb390e4d4fb34ffbd2834fa6" as Address, img: "/static/images/tokens/FNX.svg" } as IToken)
  const [firstValue, setFirstValue] = useState("")
  const [secondToken, setSecondToken] = useState({ name: 'Ethereum', symbol: 'ETH', id: 1, decimals: 18, address: "0x4200000000000000000000000000000000000023" as Address, img: "/static/images/tokens/WETH.svg" } as IToken)
  const [secondValue, setSecondValue] = useState("")

  const account = useAccount()
  const { writeContractAsync } = useWriteContract()

  useEffect(() => {
    if(defaultPairs.length == 2) {
      setFirstToken(defaultPairs[0])
      setSecondToken(defaultPairs[1])
    }
  }, [defaultPairs])
  
  const handleCLAdd = async () => {
    // TODO check allowance and approve 

    // writeContractAsync({ 
    //   abi: ERC20_ABI,
    //   address: firstToken.address as Address,
    //   functionName: 'approve', 
    //   args: [
    //     contractAddressList.cl_manager as Address,
    //     maxUint256
    //   ], 
    // },
    // {
    //   onSuccess: async (x) => {
    //     const transaction = await publicClient.waitForTransactionReceipt({hash: x});
    //     if(transaction.status == "success") {
    //       toast(`Approved successfully`);
    //     } else {
    //       toast(`Approve TX failed, tx: ${transaction.transactionHash}`);
    //     }
    //   },
    //   onError: (e) => {
    //     toast(`Approve failed. ${e}`);
    //   },
    // })
    // return
    
    //TODO: handle amount and range and order of tokens
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
          handleCLAdd()
        }
      }>
        Create Position
      </Button>
    </>
  )
}

export default ConcentratedDepositLiquidityManual
