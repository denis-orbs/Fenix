/* eslint-disable max-len */
'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'

const Security = () => {
  const brands = [
    {
      title: 'Peckshield',
      image: '/static/images/landing/security/Peckshield.svg',
    },
    {
      title: 'ChainSecurity',
      image: '/static/images/landing/security/ChainSecurity.svg',
    },
    {
      title: 'OpenZeppelin',
      image: '/static/images/landing/security/OpenZeppelin.svg',
    },
    {
      title: 'PaladinBlockchainSecurity',
      image: '/static/images/landing/security/PaladinBlockchainSecurity.svg',
    },
  ]
  useEffect(() => {
    const handleMouseMove = (ev: MouseEvent) => {
      const allCards = document.querySelectorAll('.card2')

      allCards.forEach((card) => {
        const blob = card.querySelector('.blob2') as HTMLElement
        const fblob = card.querySelector('.fakeblob2') as HTMLElement
        const rec = fblob.getBoundingClientRect()

        blob.style.opacity = '1'
        blob.animate(
          [
            {
              transform: `translate(${ev.clientX - rec.left - rec.width / 2}px, ${ev.clientY - rec.top - rec.height / 2}px)`,
            },
          ],
          {
            duration: 300,
            fill: 'forwards',
          }
        )
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  useEffect(() => {
    const handleMouseMove = (ev: MouseEvent) => {
      const allCards = document.querySelectorAll('.card3')

      allCards.forEach((card) => {
        const blob = card.querySelector('.blob3') as HTMLElement
        const fblob = card.querySelector('.fakeblob3') as HTMLElement
        const rec = fblob.getBoundingClientRect()

        blob.style.opacity = '1'
        blob.animate(
          [
            {
              transform: `translate(${ev.clientX - rec.left - rec.width / 2}px, ${ev.clientY - rec.top - rec.height / 2}px)`,
            },
          ],
          {
            duration: 300,
            fill: 'forwards',
          }
        )
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div>
      <div className="container mx-auto w-[100%]">
        <div className="text-gradient3 text-[40px] max-md:text-2xl font-normal leading-relaxed text-center">
          Security
        </div>
        <div className="w-[100%] flex items-center flex-col mx-auto justify-center">
          <div className="text-xl max-lg:text-lg text-shark-100 font-normal max-md:text-center">Assured by</div>
          <div className="card2 !my-4 max-sm:!my-2 w-[262px] max-lg:w-[40%] max-sm:w-[90%] max-md:w-[70%] h-[93px] ">
            <div className="inner2 py-5 px-10 max-sm:py-3 max-sm:px-5 flex items-center justify-between w-[100%] h-[100%]">
              <Image
                src={'/static/images/landing/security/HatsFinance.svg'}
                alt={'HatsFinance'}
                width={200}
                height={50}
                className="mx-auto"
              />
            </div>
            <div className="blob2"></div>
            <div className="fakeblob2"></div>
          </div>
          <div className="text-xl max-lg:text-lg text-shark-100 font-normal my-10 max-md:text-center">
            Code Validated by Industry Leaders
          </div>
          <div className="flex gap-4 lg:flex-row  flex-col items-center justify-center lg:w-[70%] w-full">
            {brands.map((item, index) => (
              <div key={index} className="card3  xl:w-[30%] w-[90%] h-[93px]">
                <div className="inner3 py-8 px-5 flex items-center justify-between w-[100%] h-[100%]">
                  <Image src={item.image} alt={item.title} width={200} height={50} className="mx-auto" />
                </div>
                <div className="blob3"></div>
                <div className="fakeblob3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -z-10  h-[1000px] top-[-50rem] left-0 right-0 overflow-hidden">
          <div className="min-w-full min-h-full mx-auto relative">
            <Image
              src="/static/images/landing/main/start.svg"
              width={170}
              height={170}
              className="absolute top-[250px] right-[35rem] z-10 max-lg:hidden"
              alt="start"
            />
            <Image
              src="/static/images/landing/main/planet.svg"
              width={60}
              height={60}
              className="absolute top-[350px] left-[35rem] z-10 max-lg:hidden"
              alt="planet"
            />
            <Image
              src="/static/images/landing/main/planet.svg"
              width={60}
              height={60}
              className="absolute top-[800px] right-[200px] z-10 lg:hidden"
              alt="planet"
            />
            <Image
              src="/static/images/landing/main/planet.svg"
              width={60}
              height={60}
              className="absolute top-[100px] left-0 z-10 lg:hidden"
              alt="planet"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Security
