/* eslint-disable max-len */
'use client'
import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Lottie from 'react-lottie'
import Animation from '@/src/lottie/TriangleLanding.json'

const HowItWorks = () => {
  const articles = [
    {
      title: 'Trader',
      text: 'Swap any Token on Blast with low fees and trade perpetuals on EON.',
      image: '/static/images/landing/articles/blast-2.svg',
      imageHover: '/static/images/landing/articles/Group.svg',
      planets: [
        {
          image: '/static/images/landing/howitworks/card-ellipse.svg',
          class: 'top-0  lg:left-[400px] max-lg:left-[200px] ',
        },
      ],
      points: [
        {
          image: '/static/images/landing/howitworks/point.svg',
          class: 'top-[20px] lg:left-[170px] max-lg:left-[110px]',
        },
        {
          image: '/static/images/landing/howitworks/point.svg',
          class: 'bottom-[20px] lg:right-[180px] max-lg:right-[110px]',
        },
      ],
    },
    {
      title: 'Liquidity Providers',
      text: 'Deposit tokens on Fenix to receive FNX emissions as rewards.',
      image: '/static/images/landing/articles/Coins.svg',
      imageHover: '/static/images/landing/articles/CoinsActivated.svg',
      planets: [
        {
          image: '/static/images/landing/howitworks/card-ellipse.svg',
          class: 'bottom-0 lg:left-[200px] max-lg:left-[100px] rotate-180 w-[150px]',
        },
      ],
      points: [
        {
          image: '/static/images/landing/howitworks/point.svg',
          class: 'bottom-[20px] lg:left-[300px] max-lg:left-[250px]',
        },
        {
          image: '/static/images/landing/howitworks/point.svg',
          class: 'top-[20px] lg:left-[400px] max-lg:left-[200px]',
        },
      ],
    },
    {
      title: 'veFNX Voters',
      text: 'Vote to decide which pools get FNX emissions and receive swap fees and bribes from that pool.',
      image: '/static/images/landing/articles/FenixBlack.svg',
      imageHover: '/static/images/landing/articles/FenixActivated.svg',
      planets: [
        {
          image: '/static/images/landing/howitworks/card-ellipse.svg',
          class: 'top-0 lg:left-[300px] max-lg:left-[200px] w-[150px]',
        },
      ],
      points: [
        {
          image: '/static/images/landing/howitworks/point.svg',
          class: 'lg:top-[20px] max-lg:top-[10px] lg:left-[180px] max-lg:left-[110px]',
        },
        {
          image: '/static/images/landing/howitworks/point.svg',
          class: 'top-[20px] lg:right-[130px] max-lg:right-[70px]',
        },
      ],
    },
    {
      title: 'Protocols',
      text: 'Deploy liquidity and deposit bribes to attract FNX emissions and build  liquidity at low cost.',
      image: '/static/images/landing/articles/Protocol.svg',
      imageHover: '/static/images/landing/articles/ProtocolActivated.svg',
      planets: [
        {
          image: '/static/images/landing/howitworks/card-ellipse.svg',
          class: 'top-0 lg:right-[120px] max-lg:right-[60px] w-[150px]',
        },
      ],
      points: [
        {
          image: '/static/images/landing/howitworks/point.svg',
          class: 'bottom-[20px] lg:right-[320px] max-lg:right-[200px]',
        },
        {
          image: '/static/images/landing/howitworks/point.svg',
          class: 'top-[20px] lg:left-[220px] max-lg:right-[100px]',
        },
      ],
    },
  ]
  useEffect(() => {
    const handleMouseMove = (ev: MouseEvent) => {
      const allCards = document.querySelectorAll('.card')

      allCards.forEach((card) => {
        const blob = card.querySelector('.blob') as HTMLElement
        const fblob = card.querySelector('.fakeblob') as HTMLElement
        const rec = fblob.getBoundingClientRect()

        blob.style.opacity = '1'

        blob.animate(
          [
            {
              transform: `translate(${ev.clientX - rec.left - rec.width / 2}px, ${
                ev.clientY - rec.top - rec.height / 2
              }px)`,
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

  const defaultOptions = {
    loop: true,
    animationData: Animation,
  }

  const [isAnimationPaused, setIsAnimationPaused] = useState<boolean>(false)

  const handleAnimationClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isAnimationPaused) {
      e.stopPropagation()
      setIsAnimationPaused(false)
    } else {
      setIsAnimationPaused(true)
    }
  }
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      })
    })

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    // Cleanup function
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [])

  return (
    <div className="relative">
      <div className="absolute -z-10  h-[1800px] top-[-20rem] left-0 right-0 overflow-hidden">
        <div className="min-w-full min-h-full mx-auto relative">
          <Image
            src="/static/images/landing/howitworks/orange-ellipse.svg"
            width={900}
            height={900}
            className="absolute top-[-20rem] right-0 z-10 max-lg:hidden"
            alt="orange-ellipse"
          />
          <Image
            src="/static/images/landing/main/start.svg"
            width={200}
            height={200}
            className="absolute top-[450px] right-[10rem] z-10 max-xl:hidden"
            alt="start"
          />
          <Image
            src="/static/images/landing/main/start.svg"
            width={200}
            height={200}
            className="absolute top-[950px] left-[10rem] z-10 max-xl:hidden"
            alt="start"
          />
          <Image
            src="/static/images/landing/main/planet.svg"
            width={60}
            height={60}
            className="absolute top-[300px] right-[25rem] z-10 max-lg:hidden"
            alt="planet"
          />
          <Image
            src="/static/images/landing/main/planet.svg"
            width={50}
            height={50}
            className="absolute top-[1000px] right-[50px] z-10 sm:hidden"
            alt="planet"
          />
          <Image
            src="/static/images/landing/main/start.svg"
            width={80}
            height={80}
            className="absolute top-[1000px] left-0 z-10 sm:hidden"
            alt="start"
          />
        </div>
      </div>
      <div className="container 2xl:mt-[200px] max-2xl:mt-[400px] max-xl:mt-[500px] mx-auto w-[100%]">
        <div className="text-shark-100 text-xl md:text-lg md:mb-2 text-center font-normal">How it Works</div>
        <div className="text-gradient3 text-[40px] max-md:text-2xl font-normal leading-relaxed text-center">
          Fenix Finance
        </div>
        <div className="w-[100%] flex items-center flex-col xl:flex-row mx-auto justify-around">
          <div className="w-full xl:w-1/2 flex items-center flex-col justify-center text-white gap-0 my-3">
            {articles.map((item, index) => (
              <div key={index} className="card !my-4 max-sm:!my-2 w-[80%] max-md:w-[100%] group">
                <div
                  className="relative inner h-36 md:h-40 py-5 px-10 max-sm:py-3 max-sm:px-5
                 flex items-center justify-between w-[100%]"
                >
                  <div className="flex flex-col w-[80%] max-sm:w-[70%]">
                    <div className="text-gradient4 text-xl max-md:text-lg font-normal leading-relaxed">
                      {item.title}
                    </div>
                    <div className="text-white opacity-70 text-sm max-md:text-xs font-normal max-sm:w-[100%] w-[90%]">
                      {item.text}
                    </div>
                  </div>
                  <div className="relative w-[20%] max-sm:w-[30%] my-auto">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={item.title !== 'Trader' ? 130 : 130}
                      height={item.title !== 'Trader' ? 90 : 90}
                      className="relative inset-0 z-50 group-hover:opacity-0 
                      ms-5 md:ms-0
                      transition-opacity ease-[ease-in-out] h-[80px] w-[80px] md:h-[130px] md:w-[130px]"
                    />
                    <Image
                      src={item.imageHover}
                      alt={item.title}
                      width={item.title !== 'Trader' ? 130 : 130}
                      height={item.title !== 'Trader' ? 90 : 90}
                      className={`absolute inset-0 z-50 group-hover:opacity-100 opacity-0 
                      ms-5 md:ms-0
                      transition-opacity ease-[ease-in-out] h-[80px] w-[80px] md:h-[130px] md:w-[130px]`}
                    />
                  </div>
                  <div className="absolute h-[100%] w-[100%] top-0 left-0 right-0 bottom-0 overflow-hidden">
                    {item.planets.map((item, index) => (
                      <Image
                        key={index}
                        src={item.image}
                        alt={'planet'}
                        width={80}
                        height={80}
                        className={`absolute z-50 ${item.class}`}
                      />
                    ))}
                    {item.points.map((item, index) => (
                      <Image
                        key={index}
                        src={item.image}
                        alt={'point'}
                        width={5}
                        height={5}
                        className={`absolute z-50 ${item.class}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="blob"></div>
                <div className="fakeblob"></div>
              </div>
            ))}
          </div>
          <div
            className=" overflow-hidden 
          xl:[&>div]:!h-[800px] xl:[&>div]:!w-[800px]
          [&>div]:!h-[450px] [&>div]:!w-[450px]
          flex justify-center max-w-[100vw]
          object-cover
          [&>div]:flex-shrink-0
          md:[&>div]:!h-[700px] md:[&>div]:!w-[700px] 
          
          "
            ref={elementRef}
            onClick={handleAnimationClick}
          >
            <Lottie options={defaultOptions} isPaused={!isVisible} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
