'use client'

interface ProgressBarProps {
  progress: number
}

const ProgressBar = ({ progress }: ProgressBarProps) => {

  return (
    <div className="h-[5px] w-[200px] bg-shark-400 flex rounded-lg overflow-hidden">
      <div className={`w-[${progress}%] h-full bg-gradient-to-r from-outrageous-orange-500 to-chilean-fire-500`}></div>
    </div>
  )
}

export default ProgressBar
