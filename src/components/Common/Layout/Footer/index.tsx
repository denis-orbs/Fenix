/* eslint-disable max-len */

import Image from 'next/image'
import Link from 'next/link'
import { FenixIcon } from '@/src/components/UI/Icons'
import { NAV_LINKS, SOCIAL_LINKS } from './data'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="container relative mx-auto mt-10 flex flex-col gap-3">
      <div className="footer-box">
        <div className="relative flex items-end  md:py-16 py-8  px-4">
          <div className="relative z-10 flex flex-col md:flex-row  w-full px-5    sm:items-start ">
            <div className="flex gap-2  md:items-center flex-col md:flex-row sm:w-[70%] mb-5 xl:mb-0">
              <div className="flex items-center gap-4">
                <FenixIcon className="text-4xl" />
                <p className="text-shark-100 text-sm leading-normal font-medium md:mb-0 block xl:hidden">Navigation</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-shark-100 text-sm leading-normal font-medium hidden xl:inline-block mb-2 xl:mb-0">
                  Navigation
                </p>
                <div className="grid grid-cols-3 xl:grid-cols-6 gap-2 text-center ">
                  {NAV_LINKS.map((link, index) => (
                    <Link
                      href={link.href}
                      key={index}
                      target="_blank"
                      className="text-xs sm:text-sm text-white hover:text-transparent hover:bg-button-primary-hover hover:bg-clip-text transition-all"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex md:justify-end  gap-5  md:gap-2.5 sm:w-[30%]">
              {SOCIAL_LINKS.map((link, index) => (
                <Link
                  title={link.title}
                  href={link.href}
                  key={index}
                  target="_blank"
                  className="text-white w-9 h-9 flex items-center justify-center border  border-shark-400 rounded-[10px] flex-shrink-0 bg-shark-400 bg-opacity-40 transition-colors hover:border-outrageous-orange-500 hover:bg-button-primary-hover hover:bg-opacity-80"
                >
                  <i
                    className={`icon-${link.iconName} ${link.iconName === 'git' ? 'mr-1 text-xs' : 'mr-0 text-sm'}`}
                  ></i>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 text-shark-100 text-xs">
        <div className="flex justify-between md:w-1/2">
          <div className="flex items-center gap-5">
            <div>{currentYear} © Fenix Finance</div>
          </div>
          <a
            href="#"
            className="flex items-center gap-[5px] hover:text-transparent hover:bg-button-primary-hover hover:bg-clip-text"
          >
            <i className="leading-none icon-document"></i>
            <span className=" leading-normal">Legal Disclaimer</span>
          </a>
        </div>
        <div className="flex items-center justify-center gap-2 md:w-1/2 md:justify-end">
          <span>The Unified Trading and Liquidity Marketplace for </span>
          <Image src="/static/images/footer/blast.svg" alt="pancake" width={24} height={24} className="w-6 h-6" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
