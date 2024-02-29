/* eslint-disable max-len */
'use client'

import Image from 'next/image'

const Info = () => {
  return (
    <div className="overflow-hidden">
      <div className="relative pt-20 max-md:pb-[159px] md:pt-[386px] py-[200px] max-w-[1760px] mx-auto px-5">
        <div className="flex gap-6 md:gap-10 items-center relative z-20 mx-auto justify-center lg:flex-wrap max-lg:flex-col">
          <div className="md:w-[calc(50%-20px)] bg-shark-400 bg-opacity-[0.35] rounded-lg items-start md:items-center flex backdrop-blur-[38px] overflow-hidden landing-info-box transition-shadow hover:shadow-[0px_4px_30px_0px_rgba(246,_119,_2,_0.50)] max-md:pb-[167px]">
            <div className="md:w-[70%] 2xl:w-[50%] max-md:pb-0 max-md:pt-10 p-8 relative z-10">
              <h3 className="text-base xl:text-lg font-medium leading-normal mb-2 xl:mb-3 text-outrageous-orange-500">
                Merkl Integration
              </h3>
              <p className="text-white text-xs xl:text-sm leading-normal">
                Merkl enables Fenix to provide a custom emissions distribution structure for manual user and automated
                liquidity management providers that encourages fee generation and in range liquidity provision to ensure
                stable liquidity profiles and high revenue.
              </p>
            </div>
            <Image
              src="/static/images/landing/info/01.png"
              alt="img"
              width={792}
              height={674}
              className="min-w-[792px] min-h-[674px] absolute right-[-500px] xl:right-[-400px] 2xl:right-[-228px] top-[-278px] max-md:hidden"
            />
            <Image
              src="/static/images/landing/info/01-mobile.png"
              alt="img"
              width={649}
              height={336}
              className="min-w-[649px] min-h-[336px] absolute left-[-144px] bottom-[-124px] md:hidden"
            />
          </div>

          <div className="md:w-[calc(50%-20px)] bg-shark-400 bg-opacity-[0.35] rounded-lg items-start md:items-center flex backdrop-blur-[38px] overflow-hidden landing-info-box transition-shadow hover:shadow-[0px_4px_30px_0px_rgba(255,_11,_148,_0.50)] max-md:pb-[167px]">
            <div className="md:w-[80%] 2xl:w-[60%] max-md:pb-0 max-md:pt-10 p-8">
              <h3 className="text-base xl:text-lg font-medium leading-normal mb-2 xl:mb-3 text-[#FF0B94]">
                Unified Trading Engine
              </h3>
              <p className="text-white text-xs xl:text-sm leading-normal relative z-10">
                Fenix deploys a next-generation modular AMM that incorporates the Algebra Integral UNIV3 and UNIV4 style
                pools and traditional UNIV2 and solidly stable swap pools. Fenix will maximise capital efficiency, price
                execution and fee generation on exchange assets and gives protocols maximum flexibility on pool
                deployment.
              </p>
            </div>

            <Image
              src="/static/images/landing/info/02.png"
              alt="img"
              width={862}
              height={765}
              className="absolute min-w-[862px] min-h-[765px] right-[-500px] xl:right-[-350px] 2xl:right-[-218px] top-[-300px] max-md:hidden"
            />
            <Image
              src="/static/images/landing/info/02-mobile.png"
              alt="img"
              width={365}
              height={276}
              className="min-w-[365px] min-h-[276px] absolute left-[13px] bottom-[-104px] md:hidden"
            />
          </div>

          <div className="md:w-[calc(50%-20px)] bg-shark-400 bg-opacity-[0.35] rounded-lg items-start md:items-center flex backdrop-blur-[38px] overflow-hidden landing-info-box transition-shadow hover:shadow-[0px_4px_30px_0px_rgba(239,_239,_0,_0.50)] max-md:pb-[149px]">
            <div className="md:w-[80%] 2xl:w-[60%] max-md:pb-0 max-md:pt-10 p-8 relative z-10">
              <h3 className="text-base xl:text-lg font-medium leading-normal mb-2 xl:mb-3 text-[#EFEF00]">
                Fenix Liquidity Hub
              </h3>
              <div className="text-white text-xs xl:text-sm">
                <p className="mb-2 xl:mb-[22px] leading-normal">
                  The Fenix Liquidity Hub powered by ORBS is an intent-based trading engine that allows traders to
                  compare quotes across DEXs and market markers to ensure the best price execution for any token on
                  Blast.
                </p>
              </div>
            </div>

            <Image
              src="/static/images/landing/info/03.png"
              alt="img"
              width={1229}
              height={844}
              className="absolute min-w-[1229px] min-h-[844px] top-[-317px] right-[-450px] xl:right-[-400px] 2xl:right-[-240px] max-md:hidden"
            />

            <Image
              src="/static/images/landing/info/03-mobile.png"
              alt="img"
              width={462}
              height={299}
              className="min-w-[462px] min-h-[299px] absolute left-[16px] bottom-[-127px] md:hidden"
            />
          </div>

          <div className="md:w-[calc(50%-20px)] bg-shark-400 bg-opacity-[0.35] rounded-lg items-start md:items-center flex backdrop-blur-[38px] overflow-hidden landing-info-box transition-shadow hover:shadow-[0px_4px_30px_0px_rgba(0,_105,_238,_0.50)] max-md:pb-[185px]">
            <div className="md:w-[70%] xl:w-[60%] max-md:pb-0 max-md:pt-10 p-8 relative z-10">
              <h3 className="text-base xl:text-lg font-medium leading-normal mb-2 xl:mb-3 text-[#0069EE]">
                ICHI Market Making
              </h3>
              <p className="text-white text-xs xl:text-sm leading-normal">
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
              className="absolute min-w-[1132px] min-h-[831px] top-[-248px] right-[-300px] xl:right-[-250px] 2xl:right-[-108px] max-md:hidden"
            />

            <Image
              src="/static/images/landing/info/04-mobile.png"
              alt="img"
              width={600}
              height={362}
              className="min-w-[600px] min-h-[362px] absolute left-[-160px] bottom-[-154px] md:hidden"
            />
          </div>

          <div className="md:w-[calc(50%-20px)] bg-shark-400 bg-opacity-[0.35] rounded-lg items-start md:items-center flex backdrop-blur-[38px] overflow-hidden landing-info-box transition-shadow hover:shadow-[0px_4px_30px_0px_rgba(246,_119,_2,_0.50)] max-md:pb-[176px]">
            <div className="md:w-[90%] lg:w-[80%] max-md:pb-0 max-md:pt-10 p-8 relative z-10">
              <h3 className="text-base xl:text-lg font-medium leading-normal mb-1 md:mb-3 text-transparent bg-button-primary-hover bg-clip-text">
                Zero-Inflation Rebase
              </h3>
              <p className="text-white text-xs xl:text-sm leading-normal">
                Fenix will use buy backs generated from treasury voting revenue to buy back and lock FNX that will be
                distributed to new lockers and bribing protocols. This significantly enhances incentives efficiency by
                rewarding users who are providing most value to the Blast ecosystem with a larger share of governance
                power over FNX emissions.
              </p>
            </div>

            <Image
              src="/static/images/landing/info/05.png"
              alt="img"
              width={803}
              height={809}
              className="absolute min-w-[803px] h-[809px] top-[-297px]  xl:right-[-250px] 2xl:right-[-154px] max-md:hidden"
            />
            <Image
              src="/static/images/landing/info/05-mobile.png"
              alt="img"
              width={617.489}
              height={395.489}
              className="min-w-[617.489px] min-h-[395.489px] absolute left-[-160px] bottom-[-176px] md:hidden"
            />
          </div>

          <div className="md:w-[calc(50%-20px)] bg-shark-400 bg-opacity-[0.35] rounded-lg items-start md:items-center flex backdrop-blur-[38px] overflow-hidden landing-info-box transition-shadow hover:shadow-[0px_4px_30px_0px_rgba(246,_119,_2,_0.50)] max-md:pb-[230px]">
            <div className="md:w-[80%] xl:w-[55%] max-md:pb-0 max-md:pt-10 p-8 relative z-10">
              <h3 className="text-base xl:text-lg font-medium leading-normal mb-2 xl:mb-3 text-transparent bg-button-primary-hover bg-clip-text">
                Dynamic Fees
              </h3>
              <p className="text-white text-xs xl:text-sm leading-normal">
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
              className="absolute min-w-[875px] min-h-[856px] top-[-297px] right-[-500px] xl:right-[-400px] 2xl:right-[-274px] max-md:hidden"
            />
            <Image
              src="/static/images/landing/info/06-mobile.png"
              alt="img"
              width={496}
              height={351}
              className="min-w-[496px] min-h-[351px] absolute left-[-11px] bottom-[-176px] md:hidden"
            />
          </div>
        </div>
        <div className="absolute top-0 md:top-[60px] overflow-hidden mix-blend-lighten rotate-[-46.195deg] left-1/2 -translate-x-1/2">
          <Image
            src="/static/images/landing/info/planet.png"
            alt="img"
            width={2086.412}
            height={1583.943}
            className="min-w-[2086.412px] object-contain pointer-events-none select-none"
          />
        </div>
      </div>
    </div>
  )
}

export default Info
