'use client'

interface StepBoxProps {
  children: React.ReactNode
}

const StepBox = ({ children }: StepBoxProps) => {
  return <div className="steps-box">{children}</div>
}

export default StepBox
