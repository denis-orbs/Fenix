'use client'

interface MainBoxProps {
  children: React.ReactNode
}

const MainBox = ({ children }: MainBoxProps) => {
  return (
    <div className="relative w-full p-8 rounded-2xl bg-opacity-40 bg-shark-400 xl:w-[70%] flex items-center justify-center h-full">
      {children}
    </div>
  )
}

export default MainBox
