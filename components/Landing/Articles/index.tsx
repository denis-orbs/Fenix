import Image from 'next/image'

const Articles = () => {
  return (
    <div className="relative pb-[200px]">
      <div className="container relative z-10 flex flex-col items-center justify-center gap-5 xl:gap-10 xl:flex-row">
        <div className="flex max-lg:flex-col  xl:flex-col gap-4 xl:gap-8 max-xl:justify-between max-xl:w-full">
          <div className="article-box">
            <Image
              src="/static/images/landing/articles/fenix.svg"
              alt="img"
              width={190}
              height={160}
              className="w-full xl:w-[190px] hidden sm:block xl:h-[160px] rounded-lg max-h-[159px] max-lg:mx-auto object-contain"
            />
            <Image
              src="/static/images/landing/articles/fenix-mobile.png"
              alt="img"
              width={190}
              height={160}
              className="w-full sm:hidden rounded-lg max-h-[159px] max-lg:mx-auto object-contain"
            />
            <div className="flex flex-col">
              <h1 className="text-xl font-medium text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text">
                veFNX Voters
              </h1>
              <p className="text-sm text-white xl:line-clamp-none">
                veFNX voters are an essential component to the Fenix economy. You can obtain veFNX by locking FNX that
                is purchased from the open market or from emissions received as a liquidity provider to receive 100% of
                protocol revenue.
              </p>
            </div>
          </div>
          <div className="article-box">
            <Image
              src="/static/images/landing/articles/blast.svg"
              alt="img"
              width={190}
              height={160}
              className="w-full xl:w-[190px] hidden sm:block xl:h-[160px] rounded-lg  max-h-[159px] max-lg:mx-auto object-contain"
            />
            <Image
              src="/static/images/landing/articles/blast-mobile.png"
              alt="img"
              width={190}
              height={160}
              className="w-full sm:hidden rounded-lg  max-h-[159px] max-lg:mx-auto object-contain"
            />
            <div className="flex flex-col">
              <h1 className="text-xl font-medium text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text">
                Traders
              </h1>
              <p className="text-sm text-white xl:line-clamp-none">
                Fenix provides traders with the best spot prices on Blast and the most comprehensive toolset for that
                includes limit orders, DCA and can operate as on-chain market makers by being able to run range and
                recurring orders to buy and sell tokens over predefined ranges without impermanent loss.
              </p>
            </div>
          </div>
          <div className="article-box">
            <Image
              src="/static/images/landing/articles/protocols.svg"
              alt="img"
              width={190}
              height={160}
              className="w-full xl:w-[190px] hidden sm:block xl:h-[160px] rounded-lg max-h-[159px] max-lg:mx-auto object-contain"
            />
            <Image
              src="/static/images/landing/articles/protocols-mobile.png"
              alt="img"
              width={190}
              height={160}
              className="w-full sm:hidden rounded-lg max-h-[159px] max-lg:mx-auto object-contain"
            />
            <div className="flex flex-col">
              <h1 className="text-xl font-medium text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text">
                Protocols
              </h1>
              <p className="text-sm text-white line-clamp-4 xl:line-clamp-none">
                Deposit bribe incentives onto Fenix to attract emissions to your pools at the lowest possible cost.
                Through a complete suite of AMM pools, customisable fees and UNIV4 plugins and hooks, protocols will be
                able to deploy their liquidity strategies with maximum functionality to ensure the best trading
                conditions.
              </p>
            </div>
          </div>
        </div>
        <div className="article-big-box">
          <h1 className="mb-3 text-xl font-medium text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text">
            Liquidity Providers
          </h1>
          <p className="mb-5 xl:mb-10 text-sm text-white">
            Competitive farming means LPs are encouraged to tighten their ranges to earn more FNX emissions according to
            fees generated.
            <br />
            <br />
            Professional LPs can enjoy fully customisable manual ranges and security provided by Algebra pools and fully
            battle-tested Solidly pools.
            <br />
            <br />
            Fenix is partnering with leading liquidity managers to make providing liquidity as easy as depositing with
            one token and sitting back to earn FNX emissions as your position is automatically managed.
          </p>
          <div className="w-full xl:h-[300px]">
            <Image
              src="/static/images/landing/articles/liquidity.svg"
              alt="img"
              width={600}
              height={300}
              className="w-full hidden sm:block h-full rounded-lg"
            />
            <Image
              src="/static/images/landing/articles/liquidity-mobile.png"
              alt="img"
              width={190}
              height={160}
              className="w-full sm:hidden rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className="max-w-[1932px] max-h-[1060px] absolute bottom-[-220px] mix-blend-lighten overflow-hidden">
        <Image
          src="/static/images/landing/articles/world.png"
          alt="img"
          width={1946}
          height={1085}
          className="w-[1932px] h-[1208px] object-contain"
        />
      </div>
    </div>
  )
}

export default Articles
