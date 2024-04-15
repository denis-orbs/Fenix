import Image from 'next/image'

const Background = () => {
  return (
    <div className="absolute -z-10  h-[1900px] top-0 left-0 right-0 bottom-0 overflow-hidden">
      <div className="max-w-[1920px] min-w-full min-h-full mx-auto relative">
        <Image
          src="/static/images/landing/main/ellipse1.svg"
          width={500}
          height={500}
          className="absolute transform top-[270px] left-1/2 -translate-x-1/2 z-10 object-center object-cover min-w-[500px]"
          alt="ellipse"
        />
        <Image
          src="/static/images/landing/main/ellipse2.svg"
          width={800}
          height={800}
          className="absolute transform top-[170px] left-1/2 -translate-x-1/2 z-10 object-center object-cover min-w-[800px]"
          alt="ellipse"
        />
        {/* <Image
          src="/static/images/landing/main/ellipse2.svg"
          width={1200}
          height={1200}
          className="absolute transform top-[30px] left-1/2 -translate-x-1/2 z-10 object-center object-cover max-md:hidden min-w-[1200px]"
          alt="ellipse"
        /> */}
        <Image
          src="/static/images/landing/main/start.svg"
          width={200}
          height={200}
          className="absolute top-[750px] left-0 z-10 rotate-[180deg] max-lg:hidden"
          alt="start"
        />
        <Image
          src="/static/images/landing/main/start.svg"
          width={200}
          height={200}
          className="absolute top-[500px] right-0 z-10 max-lg:hidden"
          alt="start"
        />
        <Image
          src="/static/images/landing/main/start.svg"
          width={100}
          height={100}
          className="absolute top-[100px] left-5 z-10"
          alt="start"
        />
        <Image
          src="/static/images/landing/main/planet.svg"
          width={80}
          height={80}
          className="absolute top-[300px] max-lg:top-[200px] right-16 z-10"
          alt="planet"
        />
        <Image
          src="/static/images/landing/main/planet.svg"
          width={80}
          height={80}
          className="absolute top-[57rem] left-[33rem] z-10 max-lg:hidden"
          alt="planet"
        />
        <Image
          src="/static/images/landing/main/planet.svg"
          width={50}
          height={50}
          className="absolute top-[15rem] left-[15rem] z-10 max-lg:hidden"
          alt="planet"
        />
        <Image
          src="/static/images/landing/main/planet.svg"
          width={30}
          height={30}
          className="absolute top-[55rem] right-[35rem] z-10 max-lg:hidden"
          alt="planet"
        />
        <Image
          src="/static/images/landing/main/orange-ellipse.svg"
          width={800}
          height={800}
          className="absolute top-[15rem] left-0 z-10 max-lg:hidden"
          alt="orange-ellipse"
        />
        <Image
          src="/static/images/landing/main/orange-ellipse2.svg"
          width={1200}
          height={1200}
          className="absolute top-0 right-[10rem] z-10 max-lg:hidden"
          alt="orange-ellipse"
        />
        <Image
          src="/static/images/landing/main/orange-ellipse3.svg"
          width={1200}
          height={1200}
          className="absolute bottom-[-18rem] right-0 z-10 lg:hidden"
          alt="orange-ellipse"
        />
      </div>
    </div>
  )
}

export default Background
