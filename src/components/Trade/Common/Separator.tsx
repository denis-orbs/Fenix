'use client'

interface SeparatorProps {
  single?: boolean
  onClick?: () => void
}

const Separator = ({ single, onClick }: SeparatorProps) => {
  const singleClass = single ? 'icon-arrow text-xl' : 'icon-swap text-3xl'

  return (
    <div className="h-1 w-full flex items-center justify-center relative z-10">
      <div
        className="bg-shark-500 w-28 h-10 flex items-center justify-center rounded-lg hover:cursor-pointer"
        onClick={onClick}
      >
        <span className={`${singleClass} rotate-90 text-gradient`}></span>
      </div>
    </div>
  )
}

export default Separator
