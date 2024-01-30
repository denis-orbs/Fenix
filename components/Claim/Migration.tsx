'use client'

import { Button, BigBox } from '@/components/UI'

const Migration = () => {
  return (
    <BigBox>
      <div className="flex items-center justify-between w-full">
        <div className="w-1/2">
          <h4 className="mb-3 text-xl text-white">Migration Claim</h4>
          <p className="mb-4 text-sm text-shark-100">
            Deposit your CHR Tokens in order to migrate to our new Protocol!
          </p>
          <div className="flex items-center gap-3 mb-4">
            <div className="px-4 py-3 rounded-lg box-small w-[150px]">
              <h5 className="mb-1 text-xs text-shark-100">Early Migration</h5>
              <p className="text-xs text-green-500">Open</p>
            </div>
            <div className="px-4 py-3 rounded-lg box-small w-[150px]">
              <h5 className="mb-1 text-xs text-shark-100">Late Mitration</h5>
              <p className="text-xs text-white">Closed</p>
            </div>
          </div>
          <div className="flex gap-2 mb-8">
            <Button>
              <div className="flex gap-2">
                <span className="icon-wallet"></span>
                Connect your Wallet
              </div>
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-3 mb-8 text-sm cursor-pointer text-shark-100 hover:text-outrageous-orange-500">
              <span className="text-lg icon-link"></span>
              About Migration
            </p>
            <p className="flex items-center gap-3 mb-8 text-sm cursor-pointer text-shark-100 hover:text-outrageous-orange-500">
              <span className="text-lg icon-link"></span>
              Migration Updates
            </p>
          </div>
        </div>
        <div className="relative flex flex-col w-auto px-8">
          <div className="w-[384px] h-[97px] flex gap-3 items-center p-3 box mb-3">
            <div className="flex items-center justify-center w-12 h-12 p-3 rounded-lg bg-shark-400 bg-opacity-60">
              <span className="inline-block text-2xl text-transparent icon-pig bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
            </div>
            <div className="fw">
              <h5 className="text-xs text-shark-100">Early Migrator Bonus</h5>
              <p className="text-white">13.05%</p>
            </div>
          </div>
          <div className="w-[384px] h-[97px] flex gap-3 items-center p-3 box mb-3">
            <div className="flex items-center justify-center w-12 h-12 p-3 rounded-lg bg-shark-400 bg-opacity-40">
              <span className="inline-block text-2xl text-transparent icon-circles bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
            </div>
            <div className="fw">
              <h5 className="text-xs text-shark-100">Total Migrated</h5>
              <div className="flex items-center gap-1">
                <p className="text-white">898,873.32 CHR</p>
                <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full icon-info bg-shark-200"></span>
              </div>
            </div>
          </div>
          <div className="w-[384px] h-[97px] flex gap-3 items-center p-3 box">
            <div className="flex items-center justify-center w-12 h-12 p-3 rounded-lg bg-shark-400 bg-opacity-40">
              <span className="inline-block text-2xl text-transparent cursor-pointer icon-lucide bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
            </div>
            <div className="fw">
              <h5 className="text-xs text-shark-100">Exchange Ratio</h5>
              <div className="flex items-center gap-1">
                <p className="text-white">2.5 FNX : 1 CHR</p>
                <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full cursor-pointer icon-info bg-shark-200"></span>
              </div>
              <p className="text-xs text-shark-100">(102.494 UNLOCKED / 785.628 LOCKED)</p>
            </div>
          </div>
          <div className="absolute flex items-center justify-end gap-2 cursor-pointer text-shark-100 hover:text-outrageous-orange-500 -bottom-10 right-16">
            <span className="icon-discord"></span>
            <p className="text-sm">Need help?</p>
          </div>
        </div>
      </div>
    </BigBox>
  )
}

export default Migration
