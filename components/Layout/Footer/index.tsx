/* eslint-disable max-len */

import Image from 'next/image'
import { FenixIcon } from '@/components/UI/Icons/'

import arbitrumLogo from '/public/static/images/arbitrum.png'

const navLinks = [
  {
    title: 'Documentation',
    href: '#',
  },
  {
    title: 'Security',
    href: '#',
  },
  {
    title: 'Gitbook',
    href: '#',
  },
  {
    title: 'Brandkit',
    href: '#',
  },
  {
    title: 'Articles',
    href: '#',
  },
  {
    title: 'Support',
    href: '#',
  },
]

const socialLinks = [
  {
    title: 'Twitter',
    href: '#',
    iconName: 'twitter',
  },
  {
    title: 'Discord',
    href: '#',
    iconName: 'discord',
  },
  {
    title: 'Medium',
    href: '#',
    iconName: 'medium',
  },
  {
    title: 'Git',
    href: '#',
    iconName: 'git',
  },
  {
    title: 'Telegram',
    href: '#',
    iconName: 'telegram',
  },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="max-w-[1820px] mx-auto pb-4">
      <div className="relative h-[100px] flex items-end mb-3.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1820"
          height="100"
          viewBox="0 0 1820 100"
          fill="none"
          className="absolute"
        >
          <g filter="url(#filter0_b_531_2199)">
            <mask id="path-1-inside-1_531_2199" fill="white">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 90C0 95.5228 4.47705 100 10 100H1810C1815.52 100 1820 95.5228 1820 90V24C1820 18.4771 1815.52 14 1810 14H350.643C346.487 14 342.906 11.073 342.078 7C341.251 2.92698 337.67 0 333.513 0H29.4868C25.3306 0 21.7494 2.92698 20.922 7C20.0946 11.073 16.5134 14 12.3572 14H10C4.47717 14 0 18.4771 0 24V90Z"
              />
            </mask>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 90C0 95.5228 4.47705 100 10 100H1810C1815.52 100 1820 95.5228 1820 90V24C1820 18.4771 1815.52 14 1810 14H350.643C346.487 14 342.906 11.073 342.078 7C341.251 2.92698 337.67 0 333.513 0H29.4868C25.3306 0 21.7494 2.92698 20.922 7C20.0946 11.073 16.5134 14 12.3572 14H10C4.47717 14 0 18.4771 0 24V90Z"
              fill="#292D32"
              fillOpacity="0.4"
            />
            <path
              d="M1810 99H10V101H1810V99ZM1819 24V90H1821V24H1819ZM350.643 15H1810V13H350.643V15ZM333.513 -1H29.4868V1H333.513V-1ZM10 15H12.3572V13H10V15ZM1 90V24H-1V90H1ZM10 13C3.92493 13 -1 17.9249 -1 24H1C1 19.0294 5.02942 15 10 15V13ZM19.942 6.80094C19.2094 10.4079 16.0378 13 12.3572 13V15C16.9889 15 20.98 11.7381 21.902 7.19906L19.942 6.80094ZM29.4868 -1C24.8551 -1 20.864 2.26189 19.942 6.80094L21.902 7.19906C22.6346 3.59207 25.8062 1 29.4868 1V-1ZM343.058 6.80094C342.136 2.26189 338.145 -1 333.513 -1V1C337.194 1 340.365 3.59207 341.098 7.19906L343.058 6.80094ZM350.643 13C346.962 13 343.791 10.4079 343.058 6.80094L341.098 7.19906C342.02 11.7381 346.011 15 350.643 15V13ZM1821 24C1821 17.9249 1816.08 13 1810 13V15C1814.97 15 1819 19.0294 1819 24H1821ZM10 99C5.02942 99 1 94.9706 1 90H-1C-1 96.0751 3.9248 101 10 101V99ZM1810 101C1816.08 101 1821 96.0751 1821 90H1819C1819 94.9706 1814.97 99 1810 99V101Z"
              fill="#262C33"
              mask="url(#path-1-inside-1_531_2199)"
            />
          </g>
          <defs>
            <filter
              id="filter0_b_531_2199"
              x="-10"
              y="-10"
              width="1840"
              height="120"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_531_2199" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_531_2199" result="shape" />
            </filter>
          </defs>
        </svg>

        <div className="flex relative z-10 items-center h-[86px] w-full px-5">
          <div className="flex gap-[23px] items-center">
            <FenixIcon className="text-[32px]" />
            <div>
              <p className="text-shuttle-gray-600 text-xs leading-normal font-semibold mb-[5px]">Navigation</p>
              <div className="flex gap-[30px]">
                {navLinks.map((link, i) => (
                  <a href={link.href} key={i} className="text-xs leading-normal text-white inline-block hover:text-transparent hover:bg-button-primary-hover hover:bg-clip-text">
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2.5 items-center ml-auto">
            {socialLinks.map((link, i) => (
              <a
                title={link.title}
                href={link.href}
                key={i}
                className="text-base text-white w-9 h-9 flex items-center justify-center border border-oxford-blue-900 rounded-[10px] flex-shrink-0 bg-limed-spruce-900 bg-opacity-40 transition-colors hover:border-outrageous-orange-500 hover:bg-button-primary-hover hover:bg-opacity-80"
              >
                <i className={`icon-${link.iconName}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="text-shuttle-gray-600 flex text-xs leading-normal items-center justify-between">
        <div className="flex items-center gap-5">
          <div>{currentYear} © Fenix Finance</div>
          <div className="px-2.5 h-7 border border-shark-950 rounded-[10px] bg-shark-400 bg-opacity-40 flex items-center">
            Version: 93a8d72
          </div>
        </div>
        <a href="#" className="flex items-center gap-[5px] inline-block hover:text-transparent hover:bg-button-primary-hover hover:bg-clip-text">
          <i className="icon-document text-2xl leading-none"></i>
          <span className="text-xs leading-normal">Legal Disclaimer</span>
        </a>
        <div className='flex items-center gap-[11px]'>
          <span>The central trading and liquidity market on</span>
          <Image src={arbitrumLogo} alt='pancake' width={24} height={24} />
        </div>
      </div>
    </footer>
  )
}

export default Footer
