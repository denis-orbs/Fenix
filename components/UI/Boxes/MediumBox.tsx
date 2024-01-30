'use client'

interface MediumBoxProps {
  children: React.ReactNode
}

const MediumBox = ({ children }: MediumBoxProps) => {
  return <div className="w-[615px] h-[440px] px-12 py-8 bg-no-repeat bg-[length:100%] bg-small-box">{children}</div>
}

export default MediumBox
