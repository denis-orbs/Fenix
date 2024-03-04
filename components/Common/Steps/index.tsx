'use client'

import Image from 'next/image'
import StepBox from '@/components/Common/Boxes/StepBox'
import InfoBox from '@/components/Common/InfoBox'
import ReadMoreModal from '@/components/Modals/Liquidity/ReadMore'
import useStore from '@/store'

interface Step {
  title: string
  description: string
  icon: string
}

interface StepsProps {
  steps: Step[]
}

const Steps = ({ steps }: StepsProps) => {
  const { setReadMoreModal } = useStore()

  const handleReadMore = () => setReadMoreModal(true)

  return (
    <StepBox>
      <div className="flex flex-col justify-center w-full relative z-10">
        <h4 className="w-full mb-3 text-sm text-white">Start now</h4>
        <div className="relative flex flex-col w-auto">
          {steps.map((step, index) => (
            <InfoBox data={step} key={index} />
          ))}
          <span className="absolute top-[80px] left-[10px] z-0">
            <Image src="/static/images/components/line.svg" alt="line" className="w-1 h-8" width={1} height={35} />
          </span>
          <span className="absolute z-0 bottom-[90px] left-[10px]">
            <Image src="/static/images/components/line.svg" alt="line" className="w-1 h-8" width={1} height={35} />
          </span>
        </div>
        <p
          className="flex items-center justify-end gap-3 text-sm cursor-pointer text-shark-100 hover:text-outrageous-orange-500"
          onClick={handleReadMore}
        >
          <span className="text-lg icon-link"></span>
          Read More
        </p>
      </div>
      <ReadMoreModal />
    </StepBox>
  )
}

export default Steps
