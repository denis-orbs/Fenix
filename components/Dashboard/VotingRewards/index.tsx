'use client'

import { Button } from '@/components/UI'
import HeaderRowVote from '@/components/Vote/Tables/HeaderRowVote'

import { PROPS_HEADER_ROW_VOTE } from '../types'

const VotingRewards = () => {
  return (
    <div className="mb-10">
      <div className="flex justify-between mb-4">
        <h1 className="text-white text-xl">Voting Rewards</h1>
      </div>
      <div className="dashboard-box">
        <div className="relative z-10">
          <HeaderRowVote {...PROPS_HEADER_ROW_VOTE} />
          <div>
            <Button variant="tertiary" className="!py-3 flex gap-2">
              Ver mas
              <span className="icon-link"></span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VotingRewards
