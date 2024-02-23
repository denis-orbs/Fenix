import Image from 'next/image'
import React from 'react'

const AboutFnx = () => {
  return (
    <div className='flex flex-col bg-shark-400 p-8 bg-opacity-40 shadow-md rounded-2xl'>
      <div className="flex flex-col justify-start">
        <div className="flex items-center gap-2">
          <Image alt="fenix-logo" src={'/static/images/vote/fenix-logo.svg'} height={30} width={30} />
          <div className="flex flex-col">
            <p className='text-shark-100 text-xs'>Value</p> <p className='text-white text-sm'>1,398,876,32</p>
          </div>
        </div>
        <Image className='mx-auto'  src={'/static/images/lock/fenix-about.svg'} alt="logo fenix" height={425} width={425} />
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <span className="icon-lock-off inline-block text-2xl text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text "></span>{' '}
          <div>
            <p className='text-xs text-shark-100'>Unlocks</p>
            <p className='text-sm text-white'>115 Nov, 2024</p>
          </div>
        </div>
        <div>
          <p className='text-xs text-shark-100'>Token ID</p>
          <p className='text-white text-sm text-right'>3984</p>
        </div>
      </div>
    </div>
  )
}

export default AboutFnx
