'use client'

import { Button } from '@/components/UI'

interface IProcess {
  description: string
  button: string
  icon: string
}

interface ProcessItemProps {
  process: IProcess
}


const ProcessItem = ({ process }: ProcessItemProps) => {
  return (
    <div className="process-box w-full md:w-[49%] xl:w-1/6 xl:h-[170px]">
      <div className="flex items-center justify-center w-10 h-10 px-2 mb-2 rounded-lg bg-shark-400">
        <span
          className={`inline-block text-lg text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text ${process.icon}`}
        ></span>
      </div>
      <p className="mb-2 text-base text-center text-shark-100 line-clamp-2">{process.description}</p>
      <Button variant="tertiary" className="h-10">
        {process.button}
      </Button>
    </div>
  )
}

export default ProcessItem
