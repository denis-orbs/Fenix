// eslint-disable-next-line
//@ts-ignore
//@ts-nocheck
import { Button } from '@/src/components/UI'
import { LockElement } from '@/src/library/structures/lock/LockElement'
import { castVotes, resetVotes } from '@/src/library/web3/VoteManagementV3'
import { useAppSelector } from '@/src/state'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { waitForTransactionReceipt } from '@wagmi/core'
import { config } from '@/src/app/layout'
import { voteState } from '@/src/state/vote/types'

const Overlay = () => {
  const [loading, setloading] = useState<Boolean>(false)
  const lock = useAppSelector((state) => state.lock as LockElement)
  const voteValue = useAppSelector((state) => state.vote as voteState)

  const castVote = async () => {
    try {
      const poolAddresses = voteValue.voteTableElement.map((element) => {
        return element.pair.pair_address
      })

      // Find indices where poolAddresses has undefined or null
      const undefinedIndices: number[] = poolAddresses.reduce((indices: number[], _, index) => {
        const voteValueAtIndex = voteValue.votes[index]
        if (voteValueAtIndex === undefined || voteValueAtIndex === null || voteValueAtIndex === 0) {
          indices.push(index)
        }
        return indices
      }, [])

      // Filter poolAddresses based on undefinedIndices
      const filteredPoolAddresses = poolAddresses.filter((_, index) => !undefinedIndices.includes(index))

      console.log(undefinedIndices, filteredPoolAddresses)

      // Filter both arrays based on undefinedIndices
      const weights = voteValue.votes
        .filter((_, index) => !undefinedIndices.includes(index))
        .map((weight) => BigInt(weight))

      const addresses = poolAddresses.filter((_, index) => !undefinedIndices.includes(index))

      setloading(true)
      // console.log(Number(lock?.veNFTInfo.id), weights, addresses, 'cast vote')
      const hash = await castVotes(Number(lock?.veNFTInfo.id), addresses, weights)
      const transactionReceipt = await waitForTransactionReceipt(config, { hash: hash, confirmations: 1 })
      // wait for 2 secs for transaction to get processed
      await new Promise((resolve) => setTimeout(resolve, 10000))
      if (transactionReceipt.status === 'success') {
        toast('Voted Successfully ✅')
        setloading(false)
      } else {
        toast('Transaction failed ❌')
      }
    } catch (err: any) {
      setloading(false)
      console.log(err)
      toast('Transaction failed ❌')
    }
  }

  const resetVote = async () => {
    try {
      // Filter both arrays based on undefinedIndices

      setloading(true)
      const hash = await resetVotes(Number(lock?.veNFTInfo.id))
      const transactionReceipt = await waitForTransactionReceipt(config, { hash: hash, confirmations: 1 })
      // wait for 2 secs for transaction to get processed
      await new Promise((resolve) => setTimeout(resolve, 10000))
      if (transactionReceipt.status === 'success') {
        toast('Reset Vote Successfully ✅')
        setloading(false)
      } else {
        toast('Transaction failed ❌')
      }
    } catch (err: any) {
      setloading(false)
      console.log(err)
      toast('Transaction failed ❌')
    }
  }

  return (
    <>
      <div className="md:flex justify-center hidden">
        <div className=" p-8 flex  justify-between  items-center w-[626px] bg-overlay-fixed backdrop-blur-md">
          <div className="flex flex-col w-full lg:w-auto">
            <p className="text-white text-xs text-nowrap">Voting Power Used</p>
            <p className="text-xl text-white">
              {Number(voteValue?.percentage) <= 100
                ? (
                    ((Number(lock?.veNFTInfo?.voting_amount?.toString()) / 10 ** 18) * Number(voteValue?.percentage)) /
                    100
                  ).toFixed(1)
                : (Number(lock?.veNFTInfo?.voting_amount?.toString()) / 10 ** 18).toFixed(1)}{' '}
              veFnx ({voteValue?.percentage.toString()} %)
            </p>
          </div>
          <div className="flex justify-end gap-10 items-center ">
            <div className="">
              <span className="py-1 border border-green-400 bg-none bg-green-500 bg-opacity-20 text-white rounded-lg px-5 text-xs">
                Voting
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                className="!h-[38px] !text-xs w-[130px] "
                disabled={Number(voteValue?.percentage) > 100}
                onClick={() => castVote()}
              >
                Cast Votes
              </Button>
              <Button className="!py-2 !text-xs" variant="secondary" onClick={resetVote}>
                Reset
              </Button>
              <Toaster />
            </div>
          </div>
        </div>
      </div>
      {/* Desktop */}
      <div className="flex justify-center md:hidden ">
        <div className=" p-8 flex  justify-between  items-center w-[363px] h-[118px] bg-overlay-mobile backdrop-blur-md  ">
          <div className="flex flex-col w-full">
            <p className="text-white text-[10px] ">Voting Power Used</p>
            <p className="text-xl text-white">
              {Number(voteValue) <= 100
                ? (((Number(lock?.veNFTInfo?.voting_amount?.toString()) / 10 ** 18) * Number(voteValue)) / 100).toFixed(
                    1
                  )
                : (Number(lock?.veNFTInfo?.voting_amount?.toString()) / 10 ** 18).toFixed(1)}{' '}
              veFnx ({voteValue.toString()} %)
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 ">
            <div className="">
              <span className="py-1 border border-green-400 bg-none bg-green-500 bg-opacity-20 text-white rounded-lg px-5 text-[10px]">
                Voting
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button className="!h-[28px] !text-[10px] w-[100px]" disabled={Number(voteValue?.percentage) > 100}>
                Cast Votes
              </Button>
              <Button className="!py-2 !text-[10px] w-[80px]" variant="secondary">
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile */}
    </>
  )
}

export default Overlay
