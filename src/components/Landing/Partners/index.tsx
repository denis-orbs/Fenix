'use client'
import Diagram from './diagram'

const Partners = () => {
  
  return (
    <div className="relative container flex items-center flex-col justify-center mt-[120px] max-w-screen overflow-hidden ">
      <div className='lg:absolute lg:top-[10px] lg:transform lg:left-1/2 lg:-translate-x-1/2  flex flex-col items-center justify-center mx-auto z-50'>
        <div className='text-shark-100 text-xl max-lg:text-lg font-normal text-center'>Who Support Fenix</div>
        <div className='text-gradient3 text-[40px] font-normal leading-relaxed max-lg:text-2xl text-center'>Partners</div>
      </div>
      <Diagram/>
    </div>
  )
}

export default Partners
