import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment'

interface IPost {
  title: string
  thumbnail: string
  link: string
  pubDate: string
  description: string
}

interface CardInsightsProps {
  post: IPost
}


const CardInsights = ({ post }: CardInsightsProps) => {

  const [isHover, setIsHover] = useState(false)

  const handleEnabledHover = ()=> setIsHover(true)
  const handleDisableddHover = () => setIsHover(false)

  return (
    <Link href={post.link} target="_blank"
      className={`${isHover ? 'common-landing-hover' : 'common-landing '} cursor-pointer `}
      onMouseOver={handleEnabledHover}
      onMouseOut={handleDisableddHover}
    >
      <div className="flex flex-col gap-5 items-center w-full  z-50 ">
        <Image
          src={post.thumbnail}
          className="h-[150px] w-[266px] sm:h-[180px] sm:w-[400px]"
          alt=""
          height={212}
          width={378}
        />
        <div className="w-full sm:w-[70%] flex flex-col gap-2 justify-center items-center">
          <h3 className="font-medium text-white sm:text-lg text-xs text-center line-clamp-2">
            {post.title.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/'/g, "'").replace(/"/g, '"')}
          </h3>
          <p className="text-white text-xs font-normal">{moment(post.pubDate).format('MMM Do YY')}</p>
        </div>
      </div>
    </Link>
  )
}

export default CardInsights
