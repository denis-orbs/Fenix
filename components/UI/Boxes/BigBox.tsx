'use client'

interface BigBoxProps {
  children: React.ReactNode
}

const BigBox = ({ children }: BigBoxProps) => {
  return (
    <div className="relative pt-[50px] pb-[64px] flex flex-col items-center justify-center w-full md:w-[65%]">
      <div className="main-box-top"></div>
      <div className="main-box-bottom"></div>
      <div className="bg-opacity-40 bg-shark-400 w-full px-5 md:px-10">{children}</div>
    </div>
  )
}

export default BigBox
