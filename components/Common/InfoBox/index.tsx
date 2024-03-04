'use client'
import Image from 'next/image'
interface Items {
  label: string
  amount: string | number
  icon: string
  textColor?: string
  hasDecorator? : boolean
}

interface InfoBoxProps {
  data: Items
  setShowTooltip?: (show: boolean) => void
  hasTooltip?: boolean
  textColor?: string
  fontSize?: string
  bgBox?: string
  
}

const InfoBox = ({ data, setShowTooltip, textColor, bgBox = '', hasTooltip = false }: InfoBoxProps) => {
  const handleShowTooltip = () => setShowTooltip && setShowTooltip(true)
  const handleHiddenTooltip = () => setShowTooltip && setShowTooltip(false)

  return (
    <div className="relative">
      <div className={` h-[77px] flex gap-3 items-center p-6 mb-3 relative ${bgBox === '' ? 'box' : bgBox} `}>
        <div className="flex items-center justify-center w-12 h-12 p-3 rounded-lg bg-shark-400 bg-opacity-60">
          <span
            className={`inline-block text-2xl text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text ${data.icon}`}
          ></span>
        </div>
        <div className="fw ">
          <h5 className="text-xs text-shark-100">{data.label}</h5>
          <div className="flex items-center gap-1">
            <div className="text-white flex gap-2">
              <p className={`text-xs lg:text-sm line-clamp-3 md:line-clamp-none ${data.textColor}`}>{data.amount} </p>
            </div>
            {hasTooltip && (
              <span
                onMouseEnter={handleShowTooltip}
                onMouseLeave={handleHiddenTooltip}
                className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full cursor-pointer icon-info bg-shark-200 hover:bg-outrageous-orange-500"
              ></span>
            )}
          </div>
        </div>
      </div>
      {data.hasDecorator && (
        <span className="absolute top-[60px] left-[10px] z-0">
          <Image src="/static/images/components/line.svg" alt="line" className="w-1 h-8" width={1} height={35} />
        </span>
      )}
    </div>
  )
}

export default InfoBox
