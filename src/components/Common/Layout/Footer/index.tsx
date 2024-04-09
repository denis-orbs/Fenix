/* eslint-disable max-len */

import Image from 'next/image'
import Link from 'next/link'
import { FenixIcon } from '@/src/components/UI/Icons'
import { NAV_LINKS, SOCIAL_LINKS } from './data'
import { usePathname } from 'next/navigation'

const Footer = () => {
  const pathname = usePathname()
  const currentYear = new Date().getFullYear()
  // Todas las clases que tienen como condicion "pathname === '/' son tomadas en cuenta para el landing page de forma que no modifiquen estilos importantes en el resto de la aplicación"
  return (
    <footer className="relative mx-auto mt-24 flex flex-col gap-3">
      <div className="container relative ">
        <div className="absolute overflow-hidden 2xl:-left-[340px] -left-[158px]  h-[600px] right-0 bottom-0 ">
          <Image
            src="/static/images/footer/fenix-galaxy.svg"
            width={800}
            height={800}
            className={`${pathname === '/' ? '' : 'hidden'}
            absolute 2xl:left-0 object-cover h-[480px] w-[400px] 2xl:h-[800px] 2xl:w-[800px]
            2xl:-bottom-[340px] -bottom-52
            `}
            // className={`absolute sm:bottom-[-270px] max-sm:bottom-[-220px] sm:left-[-270px] max-sm:left-[-220px] z-10 object-center object-cover min-w-[500px]`}
            alt="fenix-galaxy"
          />
        </div>
        <div className={`${pathname === '/' ? 'pl-16 max-lg:!pl-0 max-lg:!pr-0 xl:ms-10' : 'footer-box'} `}>
          <div
            className={`relative flex items-end px-4 ${pathname === '/' ? 'pt-8 pb-6 md:pt-16 md:pb-6 max-md:!px-0' : 'py-8 md:py-16'}`}
          >
            <div className="relative z-10 flex xl:items-center flex-col md:flex-row  w-full px-5 sm:items-start ">
              <div
                className={`flex gap-2 flex-col mb-5 xl:mb-0 ${pathname === '/' ? 'xl:items-center xl:flex-row max-md:w-[100%] w-[70%]' : 'md:items-center md:flex-row sm:w-[70%]'}`}
              >
                <div className="flex items-center gap-4">
                  {/* <FenixIcon className="text-4xl" /> */}
                  {/* <p className="text-shark-100 text-sm leading-normal font-medium md:mb-0 block xl:hidden">Navigation</p> */}
                </div>
                <div className="flex  items-center relative">
                  {/* <p className="text-shark-100 text-sm leading-normal font-medium hidden xl:inline-block mb-2 xl:mb-0">
                    Navigation
                  </p> */}

                  <div
                    className={`grid grid-cols-3 xl:grid-cols-6 ${pathname === '/' ? 'gap-3 max-md:w-[100%]' : 'gap-2 text-center'}`}
                  >
                    {NAV_LINKS.map((link, index) => (
                      <Link
                        href={link.href}
                        key={index}
                        className={`text-xs sm:text-sm text-white hover:text-transparent hover:bg-button-primary-hover hover:bg-clip-text transition-all text-${index % 3 === 0 && pathname === '/' ? 'left' : index % 3 === 1 && pathname === '/' ? 'center' : index % 3 === 2 && pathname === '/' ? 'right' : ''} xl:text-center`}
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
        <div
          className={`flex flex-col gap-4 text-shark-100 text-xs ${pathname === '/' ? 'pl-28 pr-10 max-md:gap-20 max-md:mt-[-16px] lg:flex-row max-md:!pl-4 max-md:!pr-4' : 'md:flex-row'}`}
        >
          <div className={`flex justify-between ${pathname === '/' ? 'lg:w-1/2' : 'md:w-1/2'}`}>
            <div className={`flex items-center gap-5 ${pathname === '/' && 'xl:ms-10'}`}>
              <div>{currentYear} © Fenix Finance</div>
            </div>
            <a
              href="#"
              className="flex items-center gap-[5px] hover:text-transparent hover:bg-button-primary-hover hover:bg-clip-text"
            >
              {/* <i className="leading-none icon-document"></i> */}
              {/* <span className=" leading-normal">Legal Disclaimer</span> */}
            </a>
          </div>
          <div
            className={`flex items-center gap-2 ${pathname === '/' ? 'justify-end lg:w-1/2 text-right' : 'justify-center md:justify-end md:w-1/2'}`}
          >
            <span className="text-[9px] xl:text-xs">The Unified Trading and Liquidity Marketplace for </span>
            <Image src="/static/images/footer/blast.svg" alt="pancake" width={24} height={24} className="w-6 h-6" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
