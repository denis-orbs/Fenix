'use client'

const TotalMigrated = () => {

  return (
    <div className="relative flex items-center w-full xl:w-2/4 2xl:w-1/3 md:h-[62px] px-4 py-2 rounded-lg gap-2 bg-shark-400 bg-opacity-40 border border-[#262C33] min-h-[86px]">
      <div className="p-3 justify-center w-[41px]  h-[41px]  rounded-lg md:flex
       bg-shark-400 bg-opacity-60">
        <span
          className={` text-xl text-transparent bg-gradient-to-r items-center flex justify-center
           from-outrageous-orange-500 to-festival-500 bg-clip-text icon-compass`}
        ></span>
      </div>
      <div className="w-full">
        <p className="mb-3 text-xs text-shark-100 md:mb-0">Total Migrated Amount to FNX</p>
        <div className="flex flex-wrap items-center gap-3 md:gap-2 md:flex-nowrap">
          <div className="flex items-center justify-between w-full gap-2 mb-2 md:w-auto md:mb-0 md:justify-start">
            <h3 className="text-sm text-white">0 CHR</h3>
            <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full cursor-pointer icon-info bg-shark-200 hover:bg-outrageous-orange-500"></span>
          </div>
          <div className="flex items-center justify-between w-full gap-2 mb-2 md:w-auto md:mb-0 md:justify-start">
            <h3 className="text-sm text-white">0 veCHR </h3>
            <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full cursor-pointer icon-info bg-shark-200 hover:bg-outrageous-orange-500"></span>
          </div>
          <div className="flex items-center justify-between w-full gap-2 mb-2 md:w-auto md:mb-0 md:justify-start">
            <h3 className="text-sm text-white">0 chrNFTs</h3>
            <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full cursor-pointer icon-info bg-shark-200 hover:bg-outrageous-orange-500"></span>
          </div>
          <div className="flex items-center justify-between w-full gap-2 mb-2 md:w-auto md:mb-0 md:justify-start">
            <h3 className="text-sm text-white">0 elCHR</h3>
            <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full cursor-pointer icon-info bg-shark-200 hover:bg-outrageous-orange-500"></span>
          </div>
          <div className="flex items-center justify-between w-full gap-2 mb-2 md:w-auto md:mb-0 md:justify-start">
            <h3 className="text-sm text-white">0 spCHR</h3>
            <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full cursor-pointer icon-info bg-shark-200 hover:bg-outrageous-orange-500"></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TotalMigrated
