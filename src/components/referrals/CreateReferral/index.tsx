'use client'
import React from 'react'
import { Button } from '../../UI'
import { useState } from 'react'

const CreateReferral = () => {
  const [changeState, setChangeState] = useState(false)

  const handleChangeState = () => (changeState ? setChangeState(false) : setChangeState(true))
  return (
    <div className="box-referrals-short max-sm:max-w-[372px]">
      <div className="relative z-50 flex items-center justify-between flex-wrap xl:flex-nowrap  gap-2">
        {!changeState ? (
          <>
            <p className="text-sm sm:text-base font-semibold  text-white">Create your referral link</p>
            <Button onClick={handleChangeState} variant="primary" className="!text-xs max-sm:!p-2">
              Create referral link
            </Button>
          </>
        ) : (
          <>
            <p className="text-sm sm:text-base font-semibold text-white">Refer and Earn</p>
            <div className="items-center justify-between line-clamp-1 max-xl:w-full   text-white flex xl:min-w-[602px] min-h-[38px] bg-shark-400 bg-opacity-20 border border-solid border-shark-300 rounded-xl ">
              <p className="text-xs font-normal px-2  line-clamp-1">
                https://app.mangrove.exchange/referrals/0xe231e2aDCfce5EeDc81419F69027cb5f0350b689
              </p>
              <div className="bg-shark-400 rounded-lg p-2 px-3 cursor-pointer">
                <span className="text-lg icon-icons" />
              </div>
            </div>
            <Button onClick={handleChangeState} variant="tertiary" className="!text-xs">
              Share on X
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default CreateReferral
