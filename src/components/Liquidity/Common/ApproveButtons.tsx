'use client'

import { Button } from '@/src/components/UI'
import { Address } from 'viem'
import Loader from '../../UI/Icons/Loader'

interface ApproveButtonsProps {
  shouldApproveFirst: boolean
  shouldApproveSecond: boolean
  token0: any
  token1: any
  handleApprove: any
  mainFn: any
  mainText: string
  isLoading: boolean
}

const ApproveButtons = ({
  token0,
  token1,
  shouldApproveFirst,
  shouldApproveSecond,
  handleApprove,
  mainFn,
  mainText,
  isLoading,
}: ApproveButtonsProps) => {
  return shouldApproveFirst && shouldApproveSecond ? (
    <div style={{ display: 'flex' }}>
      <Button
        onClick={() => {
          handleApprove(token0.address as Address)
        }}
        className="button button-tertiary w-1/2 !text-xs !h-[49px]"
        style={{ marginRight: '10px' }}
      >
        Approve {token0.symbol}
      </Button>
      <Button
        onClick={() => {
          handleApprove(token1.address as Address)
        }}
        className="button button-tertiary w-1/2 !text-xs !h-[49px]"
      >
        Approve {token1.symbol}
      </Button>
    </div>
  ) : shouldApproveFirst ? (
    <div style={{ display: 'flex' }}>
      <Button
        onClick={() => {
          handleApprove(token0.address as Address)
        }}
        className="button button-tertiary !text-xs !h-[49px]"
        style={{ marginRight: '10px' }}
      >
        Approve {token0.symbol}
      </Button>
    </div>
  ) : shouldApproveSecond ? (
    <div style={{ display: 'flex' }}>
      <Button
        onClick={() => {
          handleApprove(token1.address as Address)
        }}
        className="button button-tertiary !text-xs !h-[49px]"
        style={{ marginRight: '10px' }}
      >
        Approve {token1.symbol}
      </Button>
    </div>
  ) : (
    <Button
      className="w-full mx-auto !text-xs !h-[49px]"
      variant="tertiary"
      onClick={() => {
        mainFn()
      }}
    >
      {isLoading ? <Loader color="white" size={20} /> : `${mainText}`}
    </Button>
  )
}

export default ApproveButtons
