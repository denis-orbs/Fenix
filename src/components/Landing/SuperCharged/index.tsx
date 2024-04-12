import Image from 'next/image'
const Supercharged = () => {
  return (
    <div className="flex justify-center py-40 px-2 w-ful relative overflow-hidden">
      <div className="relative">
        <div className="relative">
          <Image
            src={'/static/images/landing/superCharged/FenixOrbits.svg'}
            className="z-[100]"
            height={610}
            width={1017}
            alt="supercharged"
          />
        </div>
        <Image
          src={'/static/images/landing/blur.svg'}
          className="h-[320px] w-[320px] sm:h-[520px] sm:w-[520px] absolute top-[70%] left-[50%] -translate-x-1/2 -translate-y-1/2 -z-20 "
          height={680}
          width={680}
          alt="supercharged"
        />
      </div>
      <Image
        src={'/static/images/landing/superCharged/decorator.svg'}
        className="absolute -left-80 -z-50"
        height={550}
        width={745}
        alt="meteor"
      />
      <Image
        src={'/static/images/landing/superCharged/meteor.svg'}
        className="absolute -right-80 -z-50"
        height={550}
        width={745}
        alt="meteor"
      />
    </div>
  )
}

export default Supercharged