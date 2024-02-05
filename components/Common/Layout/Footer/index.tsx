/* eslint-disable max-len */

import Image from 'next/image'
import { FenixIcon } from '@/components/UI/Icons/'
import { NAV_LINKS, SOCIAL_LINKS } from './data'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="px-5">
      <footer className="max-w-[1820px] mx-auto">
        <div className="footer relative flex items-end mb-3.5 bg-shark-400 md:bg-none bg-opacity-40 rounded-lg py-5">
          <div className="relative z-10 flex flex-col w-full px-5 md:items-center md:flex-row">
            <div className="flex gap-[23px] md:items-center flex-col md:flex-row w-full mb-5 md:mb-0">
              <div className="flex items-center gap-4">
                <FenixIcon className="text-[32px]" />
                <p className="text-shark-100 text-xs leading-normal font-semibold mb-[5px]">Navigation</p>
              </div>
              <div className="grid grid-cols-3 md:w-1/2 md:grid-cols-6">
                {NAV_LINKS.map((link, index) => (
                  <a
                    href={link.href}
                    key={index}
                    className="flex justify-center py-3 text-xs leading-normal text-white hover:text-transparent hover:bg-button-primary-hover hover:bg-clip-text"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex gap-2.5 items-center">
              {SOCIAL_LINKS.map((link, index) => (
                <a
                  title={link.title}
                  href={link.href}
                  key={index}
                  className="text-base text-white w-9 h-9 flex items-center justify-center border border-shark-400 rounded-[10px] flex-shrink-0 bg-shark-400 bg-opacity-40 transition-colors hover:border-outrageous-orange-500 hover:bg-button-primary-hover hover:bg-opacity-80"
                >
                  <i className={`icon-${link.iconName}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 mb-4 text-xs leading-normal md:items-center md:flex-row text-shark-100">
          <div className="flex items-center gap-5">
            <div>{currentYear} © Fenix Finance</div>
            <div className="px-2.5 h-7 border border-shark-300 rounded-[10px] bg-shark-400 bg-opacity-40 flex items-center">
              Version: 93a8d72
            </div>
          </div>
          <a
            href="#"
            className="flex items-center gap-[5px] hover:text-transparent hover:bg-button-primary-hover hover:bg-clip-text"
          >
            <i className="text-2xl leading-none icon-document"></i>
            <span className="text-xs leading-normal">Legal Disclaimer</span>
          </a>
          <div className="flex items-center gap-[11px]">
            <span>The central trading and liquidity market on</span>
            <Image src="/static/images/footer/arbitrum.png" alt="pancake" width={24} height={24} className="w-6 h-6" />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
