import Image from 'next/image'

const HowItWorks = () => {
  return (
    <div className="relative w-full mb-10">
      <div className="absolute left-[-360px] bottom-20">
        <Image
          src="/static/images/landing/howitworks/meteor.png"
          alt="img"
          width={733}
          height={560}
          className="w-full"
        />
      </div>
      <p className="text-white text-lg mb-2 text-center font-light">How it Works</p>
      <h3 className="text-2xl mb-4 text-center text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text">
        Fenix Finace
      </h3>
      <p className="text-white text-base text-center mb-10">
        Model designed to reward participants that enable sustainable growth for protocol
      </p>
      <div className="mx-auto flex justify-center">
        <Image
          src="/static/images/landing/howitworks/steps.png"
          alt="img"
          width={733}
          height={560}
          className="w-[733px] h-[560px] rounded-lg"
        />
      </div>
    </div>
  )
}

export default HowItWorks
