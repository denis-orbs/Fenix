import { Button } from "../../UI"
import Image from "next/image"
const Community = () => {
  return (
    <div className="flex flex-col items-center justify-center py-48 relative">
      <div className="absolute overflow-y-hidden h-[382px] -top-10  -z-10 bg-[#0A0A0A] opacity-90  mix-blend-color-dodge">
        <Image
          className="opacity-20 bg-center mix-blend-color-dodge"
          src={'/static/images/landing/Community/fenixBird.svg'}
          height={382}
          width={1731}
          alt="fenix"
        />
      </div>
      <div className="bg-shark-600 rounded-full">
        <Image src={'/static/images/landing/Community/fenixLogo.svg'} height={144} width={144} alt="fenix" />
      </div>
      <div className="text-gradient3 text-[40px] font-normal leading-relaxed max-lg:text-2xl text-center">
        Join the community
      </div>
      <Button className="!max-w-[252px]" variant="primary">
        <span>Join Discord</span>
      </Button>
    </div>
  )
}

export default Community