import { useState } from 'react'
import Lottie from 'react-lottie'
import Animation from '../../../../public/static/images/animation/GalaxyPartnersSlow.json'

const Diagram = () => {
  const defaultOptions = {
    loop: true,
    animationData: Animation,
  }

  const [isAnimationPaused, setIsAnimationPaused] = useState<boolean>(false)

  const handleAnimationClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isAnimationPaused) {
      e.stopPropagation()
      setIsAnimationPaused(false)
    } else {
      setIsAnimationPaused(true)
    }
  }

  return (
    <div className="text-bunker-950" onClick={handleAnimationClick}>
      <div
        className="overflow-hidden 
        flex justify-center max-w-[100vw] 
        object-cover 
        [&>div]:flex-shrink-0 md:[&>div]:!w-[1700px] md:[&>div]:!h-[1200px]

        [&>div]:!w-[800px] 
      "
      >
        <Lottie options={defaultOptions} />
      </div>
    </div>
  )
}

export default Diagram
