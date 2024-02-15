/* eslint-disable max-len */

import Image from 'next/image'

const Background = () => {
  return (
    <div className="absolute -z-10 h-full min-h-screen top-0 left-0 right-0 bottom-0 overflow-hidden">
      <div className='max-w-[1920px] mx-auto relative'>
      {/* <Image src='/static/images/landing/main/bg.png' width={2292} height={1359} className='absolute left-[86px] top-[-56px] 2xl:w-[2292px] 2xl:h-[1359] max-xl:hidden' alt='main-bg'/> */}
      <Image src='/static/images/landing/main/decorator-1.png' width={420.566} height={352.195} className='absolute left-[319px] top-[-47px] rotate-[48.907deg] max-xl:hidden z-10' alt='main-bg'/>
       <Image src='/static/images/landing/main/decorator-2.svg' width={246.177} height={44} className='absolute right-[-123.77px] top-[374px] max-xl:hidden' alt='main-bg'/>
      <Image src='/static/images/landing/main/decorator-3.png' width={684.067} height={382.896} className='absolute left-[-112px] top-[768px] max-xl:hidden rotate-[50.718deg]' alt='main-bg'/>
      <Image src='/static/images/landing/main/decorator-3.png' width={589.838} height={330.153} className='absolute left-[510px] top-[177px] max-xl:hidden rotate-[57.037deg]' alt='main-bg'/>

      {/* <div className='absolute left-1/2 -translate-x-1/2 xl:hidden top-[400px] md:top-[550px]'>
          <div className='bg-[linear-gradient(180deg,_#0A0A0A_0%,_rgba(10,_10,_10,_0.00)_100%)] w-[433.582px] h-[44.47px] absolute -bottom-px left-0 right-0 -scale-y-100' />
        <Image src='/static/images/landing/main/bg-mobile.png' width={390} height={388} alt='main-bg' className='min-w-[390px] object-cover'/>
      </div> */}

      <Image src='/static/images/landing/main/decorator-1-mobile.png' width={198.987} height={166.638} className='absolute left-0 top-[-150px] md:top-[-50px] xl:hidden' alt='main-bg'/>
      <Image src='/static/images/landing/main/decorator-2-mobile.svg' width={64} height={37} className='absolute left-0 top-[425px] md:top-[550px] xl:hidden' alt='main-bg'/>
      <Image src='/static/images/landing/main/decorator-3-mobile.png' width={279.773} height={156.598} className='absolute right-0 top-[300px] md:top-[400px] xl:hidden' alt='main-bg'/>
      <Image src='/static/images/landing/main/decorator-4-mobile.png' width={314.57} height={176.076} className='absolute left-10 top-0 md:top-20 xl:hidden' alt='main-bg'/>
      </div>
    </div>
  )
}

export default Background
