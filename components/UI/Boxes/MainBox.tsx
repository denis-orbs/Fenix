'use client'

interface MainBoxProps {
  children: React.ReactNode
}

const MainBox = ({ children }: MainBoxProps) => {
  return (
    <div className="relative pt-[15px] md:pt-[35px] 2xl:pt-[45px] pb-[25px] md:pb-[50px] 2xl:pb-[64px] flex flex-col items-center justify-center md:w-[65%]">
      <div className="main-box-top"></div>
      <div className="main-box-bottom"></div>
      <div className="bg-opacity-40 bg-shark-400 w-full px-5 2xl:px-10">{children}</div>
    </div>
  )
}

export default MainBox
