'use client'

interface MediumBoxProps {
  children: React.ReactNode
}

const MediumBox = ({ children }: MediumBoxProps) => {
  return (
    <div className="relative w-full md:w-[615px] pt-[47px] pb-[50px] flex flex-col items-center justify-center">
      <div className="steps-box-top"></div>
      <div className="steps-box-bottom"></div>
      <div className="bg-opacity-40 bg-shark-400 w-full px-5 md:px-10">{children}</div>
    </div>
  )
}

export default MediumBox
