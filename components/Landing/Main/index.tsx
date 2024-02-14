/* eslint-disable react/no-multi-comp */
import { Button } from '@/components/UI'
import { Michroma } from 'next/font/google'
import Image from 'next/image'
import Decorator from '@/components/Common/Layout/BackgroundLanding'

const michroma = Michroma({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

const Box = ({ text }: { text: string }) => {
  return (
    <div className="w-[369px] h-[123px] flex flex-col items-center justify-center main-header-box">
      <div className="text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text text-lg leading-normal tracking-[4.86px] font-semibold mb-[5px]">
        coming soon
      </div>
      <div className="text-base font-light text-white">{text}</div>
    </div>
  )
}

const Main = () => {
  return (
    <div className="relative flex flex-col max-w-[1840px] mx-auto">
      <Decorator />

      <div className="max-w-[345px] md:max-w-[635px] max-xl:mx-auto mr-auto mb-[325px] md:mb-[400px] mt-20 xl:my-[150px] 2xl:mt-[250px] 2xl:mb-[491px] max-xl:text-center px-5">
        <div className="text-sm md:text-lg text-shark-100 leading-normal mb-2">Welcome to Fenix Finance</div>

        <div className={`text-white text-base md:text-[32px] leading-[139%] mb-6 ${michroma.className}`}>
          THE UNIFIED TRADING AND{' '}
          <span className="text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text">
            LIQUIDITY MARKETPLACE{' '}
          </span>
          FOR
          <Image
            src="/static/images/landing/main/blast.svg"
            width={163}
            height={39}
            alt="Blast"
            className="inline-block ml-2.5 md:ml-5 max-md:w-[100px] max-md:h-[24px]"
          />
        </div>

        <Button className="w-[123px] h-[41px] !text-sm !py-2.5 !px-0 max-xl:mx-auto">Launch App</Button>
      </div>

      <div className="flex gap-6 justify-center flex-wrap px-5">
        <Box text="Total Value Locked" />
        <Box text="Annualized Volume" />
        <Box text="Annualized Fees" />
        <Box text="Active Users" />
      </div>
    </div>
  )
}

export default Main
