'use client'

const MigratedAmount = () => {
  return (
    <div className="relative flex items-center w-1/3 h-[62px] px-4 py-2 rounded-lg box-large gap-2">
      <div className="flex items-center justify-center w-8 h-8 p-2 rounded-lg bg-shark-400 bg-opacity-60">
        <span
          className={`inline-block text-xl text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text icon-compass`}
        ></span>
      </div>
      <div className="">
        <p className="text-xs text-shark-100">Total Migrated Amount to FNX</p>
        <div className="flex items-center gap-2">
          <h3 className="text-base text-white">200 CHR</h3>
          <span
            className={`inline-block text-xl text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text icon-swap`}
          ></span>
          <h3 className="text-base text-white">500 FNX</h3>
        </div>
      </div>
    </div>
  )
}

export default MigratedAmount
