'use client'

interface MainBoxProps {
  children: React.ReactNode
}

const MainBox = ({ children }: MainBoxProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full xl:w-[70%]">
      <div className="w-full p-8 rounded-2xl bg-opacity-40 bg-shark-400">{children}</div>
    </div>
  )
}

export default MainBox
