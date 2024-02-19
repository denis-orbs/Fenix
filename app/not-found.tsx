'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/UI'

const NotFound = () => {
  const router = useRouter()

  const hadleGoHome = () => router.push('/')

  return (
    <div className="relative flex items-center
    
     justify-center mt-10 mb-20 text-white">
      <div className="absolute">
        <Image
          src={'/static/images/404/Ellipse67.svg'}
          className="w-[1046.345px] h-[1046.345px]"
          height={800}
          width={800}
          alt="image"
        />
      </div>
      <div className="absolute blur-lg">
        <Image
          src={'/static/images/404/background.svg'}
          className="w-auto h-[800px]"
          height={800}
          width={800}
          alt="image"
        />
      </div>
      <div className="absolute">
        <Image
          src={'/static/images/404/OQ3D1501.svg'}
          className="mix-blend-color-dodge w-[1392px] h-[1392px]"
          height={800}
          width={800}
          alt="image"
        />
      </div>
      <div className="bg-error-404 z-10 p-24 rounded-2xl !bg-opacity-10 w-[960px] h-[659.34px]  flex flex-col justify-center items-center">
        <h1 className="lg:text-[150px] sm:text-[150px] text-white mb-14">
          ERC-
          <span className="text-transparent bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text">404</span>
        </h1>
        <p className="mt-5 text-2xl text-white ">Oh no, the page is gone!</p>
        <p className="mt-2 text-2xl font-light text-white">{`We’re sorry!`}</p>
        <p className="text-white mt-5 md:text-center sm:text-center text-[20px]">
          {`Sorry, the page you are looking for doesn't exist or has been moved.`}
        </p>
        <div className="p-5">
          <Button variant="tertiary" className="!py-2 md:w-auto gap-2 !bg-opacity-30" onClick={hadleGoHome}>
            Go to Home <span className="text-lg icon-logout"></span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
