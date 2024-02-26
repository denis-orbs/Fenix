'use client'

import { Tooltip } from '@/components/UI'

interface TotalRewardsTooltipProps {
  show: boolean
  setShow: (show: boolean) => void
}

const TotalRewardsTooltip = ({ show, setShow }: TotalRewardsTooltipProps) => {
  return (
    <Tooltip setShow={setShow} show={show}>
      <div className="text-shark-100 flex flex-col gap-1 p-1">
        <span className="icon-info"></span>
        <p className='text-xs'>This amount represents the Projected Returns at 100% of your Voting Power</p>
      </div>
    </Tooltip>
  )
}

export default TotalRewardsTooltip
