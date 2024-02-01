/* eslint-disable max-len */

import Image from 'next/image'
import { FenixIcon } from '@/components/UI/Icons/'
import { NAV_LINKS, SOCIAL_LINKS } from './data'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="px-5 pb-4">
      <footer className="max-w-[1820px] mx-auto">
        <div className="footer relative flex items-end mb-3.5">
          <div className="flex relative z-10 items-center h-[86px] w-full px-5">
            <div className="flex gap-[23px] items-center mb-2">
              <FenixIcon className="text-[32px]" />
              <div>
                <p className="text-shark-100 text-xs leading-normal font-semibold mb-[5px]">Navigation</p>
                <div className="flex gap-[30px]">
                  {NAV_LINKS.map((link, index) => (
                    <a
                      href={link.href}
                      key={index}
                      className="text-xs leading-normal text-white inline-block hover:text-transparent hover:bg-button-primary-hover hover:bg-clip-text"
                    >
                      {link.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2.5 items-center ml-auto pr-1">
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
        <div className="text-shark-100 flex text-xs leading-normal items-center justify-between">
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
            <i className="icon-document text-2xl leading-none"></i>
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
