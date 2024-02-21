'use client'

interface MainBoxProps {
  children: React.ReactNode
}

const MainBox = ({ children }: MainBoxProps) => {
  return (
    <div className="main-box">
      {children}
    </div>
  )
}

export default MainBox
