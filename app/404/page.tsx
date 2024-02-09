'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/UI'

const Page404 = () => {
  const router = useRouter()

  const hadleGoHome = () => router.push('/')

  return (
    <div className="text-white flex relative justify-between items-center mb-20">
      <div>
        <Image
          src={'/static/images/404/left.png'}
          className="absolute left-0 top-0 w-auto h-[800px] object-contain  "
          height={800}
          width={800}
          alt="image"
        />
      </div>
      <div className="bg-shark-400 lg:p-24 sm:p-24 p-8 z-30 rounded-2xl bg-opacity-40 mt-10 flex flex-col justify-center items-center">
        <h1 className="lg:text-[200px] text-[150px] leading-none bg-gradient-to-r text-transparent from-outrageous-orange-500 to-festival-500 bg-clip-text">
          404
        </h1>
        <p className="lg:text-shark-300 text-slate-300 text-[24px] lg:text-[32px] mt-5 w-72 sm:w-auto lg:w-auto text-center">
          Oh no, the page is gone! We are Sorry
        </p>
        <p className="lg:text-shark-300 text-slate-300 mt-5 text-[12px] w-60 text-center lg:w-auto lg:text-[20px]">
          Sorry, the page you are looking for does not exist or has been moved.{' '}
        </p>
        <div className="p-5">
          <Button variant="tertiary" className="!py-2 w-full md:w-auto gap-2" onClick={hadleGoHome}>
            Go to Home <span className="icon-logout text-lg"></span>
          </Button>
        </div>
      </div>
      <div>
        <Image
          src={'/static/images/404/right.png'}
          className="absolute right-0 top-0 w-auto h-[800px] transform object-contain "
          height={800}
          width={800}
          alt="image"
        />
      </div>
    </div>
  )
}

export default Page404
