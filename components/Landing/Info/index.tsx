/* eslint-disable max-len */
/* eslint-disable react/no-multi-comp */
'use client'

import Image from 'next/image'

const Info = () => {
  return (
    <div className="overflow-hidden">
      <div className="relative pt-20 md:pt-[386px] py-[200px] max-w-[1760px] mx-auto px-5">
        <div className="flex gap-10 items-center relative z-20 mx-auto justify-center flex-wrap">
          <div className="w-[840px] bg-shark-400 bg-opacity-[0.35] rounded-lg items-center flex backdrop-blur-[38px] overflow-hidden landing-info-box transition-shadow hover:shadow-[0px_4px_30px_0px_rgba(246,_119,_2,_0.50)]">
            <div className="lg:w-[60%] p-8">
              <h3 className="text-base md:text-lg font-medium leading-normal mb-2 md:mb-3 text-outrageous-orange-500">
                Competitive Farming
              </h3>
              <p className="text-white text-xs md:text-sm leading-normalS">
                Algebra’s Built in Farming Distributor enables Fenix to provide a custom emissions distribution
                structure for all CL liquidity providing strategies, encouraging fee generation and in range liquidity
                provision to ensure stable liquidity profiles and leading to higher trading volumes and platform
                revenues.
              </p>
            </div>
            <Image
              src="/static/images/landing/info/01.png"
              alt="img"
              width={483}
              height={643}
              className="min-w-[483px] min-h-[643px] absolute right-[-127px] top-[-236px] max-lg:hidden"
            />
          </div>

          <div className="w-[840px] bg-shark-400 bg-opacity-[0.35] rounded-lg items-center flex backdrop-blur-[38px] overflow-hidden landing-info-box transition-shadow hover:shadow-[0px_4px_30px_0px_rgba(255,_11,_148,_0.50)]">
            <div className="lg:w-[60%] p-8">
              <h3 className="text-base md:text-lg font-medium leading-normal mb-2 md:mb-3 text-[#FF0B94]">Fenix Trading Engine</h3>
              <p className="text-white text-xs md:text-sm leading-normal">
                Fenix utilizes the secure and battle-tested Algebras “Integral” concentrated liquidity engine for Core
                Pools, Uniswap V2 pools for Partners Pools and Curves Stable Swap for Stable Pools, that gives
                flexibility and best strategies for each party & liquidity providers andprovides traders with the
                deepest liquidity and best prices.
              </p>
            </div>

            <Image
              src="/static/images/landing/info/02.png"
              alt="img"
              width={862}
              height={765}
              className="absolute min-w-[862px] min-h-[765px] right-[-218px] top-[-300px] max-lg:hidden"
            />
          </div>

          <div className="w-[840px] bg-shark-400 bg-opacity-[0.35] rounded-lg items-center flex backdrop-blur-[38px] overflow-hidden landing-info-box transition-shadow hover:shadow-[0px_4px_30px_0px_rgba(239,_239,_0,_0.50)]">
            <div className="lg:w-[60%] p-8">
              <h3 className="text-base md:text-lg font-medium leading-normal mb-2 md:mb-3 text-[#EFEF00]">
                Fenix Liquidity Hub + Zero Gas Swaps
              </h3>
              <div className="text-white text-xs md:text-sm line-clamp-5">
                <p className="mb-[22px] leading-normal">
                  Fenix aggregates liquidity from all DEXs across Blast to guarantee the best price execution for
                  traders, powered by an intent architecture using Orbs technology.
                </p>
                <p className="leading-normal">
                  Additionally, Blast&apos;s gas reimbursement program enables zero gas fee swaps, offering a seamless
                  trading experience.
                </p>
              </div>
            </div>
            <Image
              src="/static/images/landing/info/03.png"
              alt="img"
              width={1229}
              height={844}
              className="absolute min-w-[1229px] min-h-[844px] top-[-317px] right-[-240px] max-lg:hidden"
            />
          </div>

          <div className="w-[840px] bg-shark-400 bg-opacity-[0.35] rounded-lg items-center flex backdrop-blur-[38px] overflow-hidden landing-info-box transition-shadow hover:shadow-[0px_4px_30px_0px_rgba(0,_105,_238,_0.50)]">
            <div className="lg:w-[60%] p-8">
              <h3 className="text-base md:text-lg font-medium leading-normal mb-2 md:mb-3 text-[#0069EE]">ICHI Market Making</h3>
              <p className="text-white text-xs md:text-sm leading-normal">
                ICHI is a DeFi protocol that specializes in market making and liquidity management. Enabling
                single-token deposits and employing algorithmic strategies to optimize liquidity provision in a
                trustless, non-custodial, and transparent manner.
              </p>
            </div>

            <Image
              src="/static/images/landing/info/04.png"
              alt="img"
              width={1132}
              height={831}
              className="absolute min-w-[1132px] min-h-[831px] top-[-248px] right-[-108px] max-lg:hidden"
            />
          </div>

          <div className="w-[840px] bg-shark-400 bg-opacity-[0.35] rounded-lg items-center flex backdrop-blur-[38px] overflow-hidden landing-info-box transition-shadow hover:shadow-[0px_4px_30px_0px_rgba(246,_119,_2,_0.50)]">
            <div className="lg:w-[70%] p-8">
              <h3 className="text-base md:text-lg font-medium leading-normal mb-1 md:mb-3 text-transparent bg-button-primary-hover bg-clip-text">
                Zero-Inflation Rebase
              </h3>
              <p className="text-white text-xs md:text-sm leading-normal">
                Fenix is rebase model, aiming for a 15-30% dynamic rate, uses FNX buybacks and locking from revenue to
                reward long-term holders and governance participants, boosting capital efficiency and governance
                strength. This approach ensures liquidity providers receive full emissions, enhancing trading liquidity.
                Achieving Zero-Inflation rebase, the model benefits from RISE veFNX allocation revenue and BLAST Airdrop
                for lockers, further rewarding network contributors.
              </p>
            </div>
            <Image
              src="/static/images/landing/info/05.png"
              alt="img"
              width={803}
              height={809}
              className="absolute min-w-[803px] h-[809px] top-[-297px] right-[-154px] max-lg:hidden"
            />
          </div>

          <div className="w-[840px] bg-shark-400 bg-opacity-[0.35] rounded-lg items-center flex backdrop-blur-[38px] overflow-hidden landing-info-box transition-shadow hover:shadow-[0px_4px_30px_0px_rgba(246,_119,_2,_0.50)]">
            <div className="lg:w-[55%] p-8">
              <h3 className="text-base md:text-lg font-medium leading-normal mb-2 md:mb-3 text-transparent bg-button-primary-hover bg-clip-text">
                Dynamic Fees
              </h3>
              <p className="text-white text-xs md:text-sm leading-normal">
                We offer a flexible fee structure that adapts in real-time to market conditions. By considering; asset
                volatility, trading volume, and liquidity levels, dynamic fees ensure that LPs are fairly compensated
                from potential impermanent loss and also optimizes their earnings by adjusting fees to encourage trading
                when appropriate.
              </p>
            </div>

            <Image
              src="/static/images/landing/info/06.png"
              alt="img"
              width={875}
              height={856}
              className="absolute min-w-[875px] min-h-[856px] top-[-297px] right-[-274px] max-lg:hidden"
            />
          </div>
        </div>
        <div className="absolute top-0 md:top-[60px] overflow-hidden mix-blend-lighten rotate-[-46.195deg] left-1/2 -translate-x-1/2">
          <Image
            src="/static/images/landing/info/planet.png"
            alt="img"
            width={2086.412}
            height={1583.943}
            className="min-w-[2086.412px] object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default Info
