'use client'

interface BigBoxProps {
  children: React.ReactNode
}

const BigBox = ({ children }: BigBoxProps) => {
  return (
    <div className="w-[1168px] h-[429px] p-12 bg-no-repeat bg-[length:100%] bg-big-box flex flex-col items-center justify-center">
      {children}
    </div>
  )
}

export default BigBox
