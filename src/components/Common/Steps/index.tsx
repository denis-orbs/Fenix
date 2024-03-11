'use client'

import StepBox from '@/src/components/Common/Boxes/StepBox'
import InfoBox from '@/src/components/Common/InfoBox'
import ReadMoreModal from '@/src/components/Modals/Liquidity/ReadMore'
import useStore from '@/src/state/zustand'

interface Step {
  title: string
  description: string
  icon: string
  hasButton?: boolean,
}

interface StepsProps {
  steps: Step[]
  title?: string
}

const Steps = ({ steps, title = "Start now" }: StepsProps) => {
  const { setReadMoreModal } = useStore()

  const handleReadMore = () => setReadMoreModal(true)

  return (
    <StepBox>
      <div className="flex flex-col justify-center w-full relative z-10">
        <h4 className="w-full mb-3 text-sm text-white">{title}</h4>
        <div className="relative flex flex-col w-auto">
          {steps.map((step, index) => (
            <InfoBox data={step} key={index} hasDecorator={index !== steps.length - 1} />
          ))}
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
