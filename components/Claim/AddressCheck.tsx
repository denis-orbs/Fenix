'use client'

import { Button } from '@/components/UI'
import useStore from '@/store'

interface AddressCheckProps {
  migrateStatus: string | undefined
  setMigrateStatus: (status: string) => void
}

const AddressCheck = ({ migrateStatus, setMigrateStatus }: AddressCheckProps) => {
  const isConnected = useStore((state) => state.isConnected)

  const handlerMigrateCheck = () => setMigrateStatus('wrong')

  return (
    <div className="flex flex-col items-center w-full gap-4 px-5 py-4 rounded-lg xl:w-2/4 2xl:w-2/3 md:flex-row bg-shark-400 bg-opacity-40">
      <div className="flex items-center gap-5 md:flex-row">
        <p className="text-sm text-shark-100">Wallet Address</p>
        <span className="px-3 py-1 text-xs md:text-sm border rounded-lg text-center text-shark-100 bg-shark-400 border-shark-300 truncate max-w-[200px]">
          {isConnected ? '0x878dfbs83fabc3x97d3469743d4E7' : '-'}
        </span>
      </div>
      {!migrateStatus && isConnected && (
        <Button className="!py-2 w-full md:w-auto" onClick={handlerMigrateCheck}>
          Check
        </Button>
      )}
      {migrateStatus === 'success' && (
        <div className="flex items-center gap-3">
          <Button
            variant="tertiary"
            className="!py-2 !text-green-500 hover:!text-white w-[90%] md:w-auto"
            onClick={handlerMigrateCheck}
          >
            Check
          </Button>
          <span className="text-2xl text-green-500 icon-check"></span>
        </div>
      )}
      {migrateStatus === 'wrong' && (
        <div className="flex items-center w-full gap-3 md:w-auto">
          <Button
            variant="tertiary"
            className="!py-2 !text-red-500 hover:!text-white w-[90%] md:w-auto"
            onClick={handlerMigrateCheck}
          >
            Check
          </Button>
          <span className="text-2xl text-red-500 icon-x-circle"></span>
        </div>
      )}
    </div>
  )
}

export default AddressCheck
