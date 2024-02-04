'use client'

interface ToggleProps {
  onClick: () => void
}

const Toggle = ({ onClick }: ToggleProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-shark-400 hover:bg-outrageous-orange-400 md:hidden cursor-pointer bg-opacity-40 rounded-lg border border-shark-400 w-10 h-10 flex items-center justify-center"
    >
      <span className="icon-menu text-white"></span>
    </div>
  )
}

export default Toggle
