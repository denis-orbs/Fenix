'use client'
import Image from 'next/image'
import { Button } from '@/src/components/UI'

interface Items {
  label: string
  amount?: string | number
  description?: string
  icon: string
  textColor?: string
}

interface InfoBoxProps {
  data: Items
  setShowTooltip?: (show: boolean) => void
  hasTooltip?: boolean
  hasDecorator?: boolean
  textColor?: string
  fontSize?: string
  bgBox?: string
}

const InfoBox = ({ data, setShowTooltip, hasDecorator, hasTooltip = false, bgBox = '' }: InfoBoxProps) => {
  const handleShowTooltip = () => setShowTooltip && setShowTooltip(true)
  const handleHiddenTooltip = () => setShowTooltip && setShowTooltip(false)

  return (
    <div className="relative">
      <div className={`xl:h-[97px] flex gap-3 items-center p-3 mb-3 relative ${bgBox === '' ? 'box' : bgBox}`}>
        <div className="flex items-center justify-center w-[32px] h-[32px] p-2 lg:w-12 lg:h-12 lg:p-3 rounded-lg bg-shark-400 bg-opacity-60">
          <span
            className={`inline-block lg:text-2xl text-transparent
            text-[18px]
            bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text ${data.icon}`}
          ></span>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="max-w-[270px]">
            <h5 className="text-xs text-shark-100">{data.label}</h5>
            <p className="text-sm text-white line-clamp-2">{data.amount || data.description}</p>
          </div>
        </div>
        {hasTooltip && (
          <span
            onMouseEnter={handleShowTooltip}
            onMouseLeave={handleHiddenTooltip}
            className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full cursor-pointer icon-info bg-shark-200 hover:bg-outrageous-orange-500"
          ></span>
        )}
      </div>
      {hasDecorator && (
        <span className="absolute bottom-0 left-[10px] z-0">
          <Image src="/static/images/components/line.svg" alt="line" className="w-1 h-8" width={1} height={35} />
        </span>
      )}
    </div>
  )
}

export default InfoBox
