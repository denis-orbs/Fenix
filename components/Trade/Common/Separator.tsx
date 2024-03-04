'use client'

interface SeparatorProps {
  single?: boolean
}

const Separator = ({ single }: SeparatorProps) => {

  const singleClass = single ? 'icon-arrow text-xl' : 'icon-swap text-3xl'

  return (
    <div className="h-1 w-full flex items-center justify-center relative z-10">
      <div className="bg-shark-500 w-28 h-10 flex items-center justify-center rounded-lg">
        <span
          className={`${singleClass} rotate-90 text-gradient-2`}
        ></span>
      </div>
    </div>
  )
}

export default Separator
