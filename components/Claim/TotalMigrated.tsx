'use client'

import useStore from '@/store'

const TotalMigrated = () => {
    const isConnected = useStore((state) => state.isConnected)

  return (
    <div className="relative flex items-center md:w-1/3 md:h-[62px] px-4 py-2 rounded-lg box-large gap-2">
      <div className="hidden md:flex items-center justify-center w-8 h-8 p-2 rounded-lg bg-shark-400 bg-opacity-60">
        <span
          className={`inline-block text-xl text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text icon-compass`}
        ></span>
      </div>
      <div className="">
        <p className="text-xs text-shark-100 mb-3 md:mb-0">Total Migrated Amount to FNX</p>
        <div className="flex items-center gap-3 md:gap-2 flex-wrap md:flex-nowrap">
          <div className="flex items-center gap-2 w-full md:w-auto mb-2 md:mb-0 justify-between md:justify-start">
            <h3 className="text-sm text-white">0 CHR</h3>
            <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full icon-info bg-shark-200 hover:bg-outrageous-orange-500 cursor-pointer"></span>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto mb-2 md:mb-0 justify-between md:justify-start">
            <h3 className="text-sm text-white">0 veCHR </h3>
            <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full icon-info bg-shark-200 hover:bg-outrageous-orange-500 cursor-pointer"></span>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto mb-2 md:mb-0 justify-between md:justify-start">
            <h3 className="text-sm text-white">0 chrNFTs</h3>
            <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full icon-info bg-shark-200 hover:bg-outrageous-orange-500 cursor-pointer"></span>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto mb-2 md:mb-0 justify-between md:justify-start">
            <h3 className="text-sm text-white">0 elCHR</h3>
            <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full icon-info bg-shark-200 hover:bg-outrageous-orange-500 cursor-pointer"></span>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto mb-2 md:mb-0 justify-between md:justify-start">
            <h3 className="text-sm text-white">0 spCHR</h3>
            <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full icon-info bg-shark-200 hover:bg-outrageous-orange-500 cursor-pointer"></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TotalMigrated
