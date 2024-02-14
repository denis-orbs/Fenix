'use client'

import Image from 'next/image'

const Info = () => {
  return (
    <div className="relative py-[200px] max-w-[1840px] mx-auto">
      <div className="flex gap-8 items-center flex-wrap relative z-20 mx-auto justify-center">
        <div className="w-[45%] min-h-[210px] bg-shark-400 border border-shark-300 bg-opacity-30 rounded-lg items-center flex backdrop-blur-sm overflow-hidden">
          <div className="w-[60%] p-8">
            <h3 className="text-lg text-outrageous-orange-500 mb-2">Competitive Farming</h3>
            <p className="text-white text-sm line-clamp-5">
              Algebra’s Built in Farming Distributor enables Fenix to provide a custom emissions distribution structure
              for all CL liquidity providing strategies, encouraging fee generation and in range liquidity provision to
              ensure stable liquidity profiles and leading to higher trading volumes and platform revenues.
            </p>
          </div>
          <div className="absolute top-[-90px] right-[-110px] h-[300px] overflow-hidden">
            <Image
              src="/static/images/landing/info/01.png"
              alt="img"
              width={400}
              height={400}
              className="w-[400px] h-[400px] max-w-none"
            />
          </div>
        </div>
        <div className="w-[45%] min-h-[210px] bg-shark-400 border border-shark-300 bg-opacity-30 rounded-lg items-center flex backdrop-blur-sm overflow-hidden">
          <div className="w-[60%] p-8">
            <h3 className="text-lg text-outrageous-orange-500 mb-2">Fenix Trading Engine</h3>
            <p className="text-white text-sm line-clamp-5">
              Fenix utilizes the secure and battle-tested Algebras “Integral” concentrated liquidity engine for Core
              Pools, Uniswap V2 pools for Partners Pools and Curves Stable Swap for Stable Pools, that gives flexibility
              and best strategies for each party & liquidity providers andprovides traders with the deepest liquidity
              and best prices.
            </p>
          </div>
          <div className="absolute top-[-170px] right-[-90px] h-[370px] overflow-hidden">
            <Image
              src="/static/images/landing/info/02.png"
              alt="img"
              width={400}
              height={400}
              className="w-[600px] h-[500px] max-w-none"
            />
          </div>
        </div>
        <div className="w-[45%] min-h-[210px] bg-shark-400 border border-shark-300 bg-opacity-30 rounded-lg items-center flex backdrop-blur-sm overflow-hidden">
          <div className="w-[60%] p-8">
            <h3 className="text-lg text-yellow-400 mb-2">Fenix Liquidity Hub + Zero Gas Swaps</h3>
            <p className="text-white text-sm line-clamp-5">
              Fenix aggregates liquidity from all DEXs across Blast to guarantee the best price execution for traders,
              powered by an intent architecture using Orbs technology. Additionally, Blasts gas reimbursement program
              enables zero gas fee swaps, offering a seamless trading experience.
            </p>
          </div>
          <div className="absolute top-[-120px] right-[-110px] h-[330px] overflow-hidden">
            <Image
              src="/static/images/landing/info/03.png"
              alt="img"
              width={400}
              height={400}
              className="w-[450px] h-[450px] max-w-none"
            />
          </div>
        </div>
        <div className="w-[45%] min-h-[210px] bg-shark-400 border border-shark-300 bg-opacity-30 rounded-lg items-center flex backdrop-blur-sm overflow-hidden">
          <div className="w-[60%] p-8">
            <h3 className="text-lg text-blue-700 mb-2">ICHI Market Making</h3>
            <p className="text-white text-sm line-clamp-5">
              ICHI is a DeFi protocol that specializes in market making and liquidity management. Enabling single-token
              deposits and employing algorithmic strategies to optimize liquidity provision in a trustless,
              non-custodial, and transparent manner.
            </p>
          </div>
          <div className="absolute top-[-210px] right-[-90px] overflow-hidden">
            <Image
              src="/static/images/landing/info/04.png"
              alt="img"
              width={400}
              height={400}
              className="w-[500px] h-[540px] max-w-none"
            />
          </div>
        </div>
        <div className="w-[45%] min-h-[210px] bg-shark-400 border border-shark-300 bg-opacity-30 rounded-lg items-center flex backdrop-blur-sm overflow-hidden">
          <div className="w-[60%] p-8">
            <h3 className="text-lg text-outrageous-orange-500 mb-2">Zero-Inflation Rebase</h3>
            <p className="text-white text-sm line-clamp-5">
              Fenix is rebase model, aiming for a 15-30% dynamic rate, uses FNX buybacks and locking from revenue to
              reward long-term holders and governance participants, boosting capital efficiency and governance strength.
              This approach ensures liquidity providers receive full emissions, enhancing trading liquidity. Achieving
              Zero-Inflation rebase, the model benefits from RISE veFNX allocation revenue and BLAST Airdrop for
              lockers, further rewarding network contributors.
            </p>
          </div>
          <div className="absolute top-[-110px] right-[-140px] overflow-hidden">
            <Image
              src="/static/images/landing/info/05.png"
              alt="img"
              width={400}
              height={400}
              className="w-[500px] h-[540px] max-w-none"
            />
          </div>
        </div>
        <div className="w-[45%] min-h-[210px] bg-shark-400 border border-shark-300 bg-opacity-30 rounded-lg items-center flex backdrop-blur-sm overflow-hidden">
          <div className="w-[60%] p-8">
            <h3 className="text-lg text-outrageous-orange-500 mb-2">Dynamic Fees</h3>
            <p className="text-white text-sm line-clamp-5">
              We offer a flexible fee structure that adapts in real-time to market conditions. By considering; asset
              volatility, trading volume, and liquidity levels, dynamic fees ensure that LPs are fairly compensated from
              potential impermanent loss and also optimizes their earnings by adjusting fees to encourage trading when
              appropriate.
            </p>
          </div>
          <div className="absolute top-0 right-[-150px] overflow-hidden">
            <Image
              src="/static/images/landing/info/06.png"
              alt="img"
              width={400}
              height={400}
              className="w-[550px] h-[540px] max-w-none"
            />
          </div>
        </div>
      </div>
      <div className="absolute top-[-400px] right-0 overflow-hidden mix-blend-lighten">
        <Image
          src="/static/images/landing/info/planet.png"
          alt="img"
          width={400}
          height={400}
          className="w-[1800px] max-w-none"
        />
      </div>
    </div>
  )
}

export default Info
