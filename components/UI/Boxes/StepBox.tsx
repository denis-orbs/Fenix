'use client'

interface StepBoxProps {
  children: React.ReactNode
}

const StepBox = ({ children }: StepBoxProps) => {
  return (
    <div className="relative w-full xl:w-[30%] flex flex-col items-center justify-center">
      <div className="w-full p-8 rounded-2xl bg-opacity-40 bg-shark-400">{children}</div>
    </div>
  )
}

export default StepBox
