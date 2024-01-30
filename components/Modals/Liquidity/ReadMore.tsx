'use client'

import React from 'react'
import Image from 'next/image'
import useStore from '@/store'

import { Modal } from '@/components/UI'
import ListItemWrapper from './ListItemWrapper'
import FormulaWrapper from './FormulaWrapper'

import hyperbolaSrc from '@/public/static/images/modals/liquidity/read-more/hyperbola.png'

const LiquidityReadMoreModal = () => {
  //   const openModal = useStore((state) => state.liquidityReadMoreModal)
  const openModal = true
  const { setLiquidityReadMoreModal } = useStore()

  return (
    <Modal className="!justify-end" openModal={openModal} setOpenModal={setLiquidityReadMoreModal}>
      <div className="w-[603px] text-white liquidity-read-more-modal relative ml-auto mx-5">
        <button
          className="absolute top-0 right-2.5 cursor-pointer text-shark-100 text-2xl hover:text-transparent hover:bg-button-primary-hover hover:bg-clip-text z-10"
          type="button"
          aria-label="Close Modal"
          title="Close"
          onClick={() => setLiquidityReadMoreModal(false)}
        >
          <span className="icon-x"></span>
        </button>

        <div className="top"></div>
        <div className="bottom"></div>

        <div className="bg-shark-400 bg-opacity-40 border-l border-r border-shark-950 pr-1">
          <div className="px-[30px] py-3.5 max-h-[calc(100vh-200px)] overflow-auto flex flex-col gap-[27px]  scroll-box">
            <ListItemWrapper title="Liquidity Pools">
              <p>
                The core functionality of Fenix Finance is to allow users to exchange tokens in a secure way, with low
                fees and low slippage.
              </p>

              <p>
                Slippage is the difference between the current market price of an token and the price at which the
                actual exchange/swap is executed. This difference could result in a smaller amount (higher price paid)
                or a higher amount (smaller price paid) of desired tokens returned from a swap.
              </p>

              <p>To provide access to the best rates on the market, we identified two types of tokens:</p>

              <div className="flex items-center gap-[27.27px]">
                <div>correlated - for example stable coins</div>
                <div className="flex items-center gap-[11.92px]">
                  <Image
                    src="/static/images/tokens/eth-purple.png"
                    className="w-6 h-6"
                    alt="logo"
                    width={23.843}
                    height={23.843}
                  />
                  <Image
                    src="/static/images/tokens/dai.png"
                    className="w-6 h-6"
                    alt="logo"
                    width={23.843}
                    height={23.843}
                  />
                </div>
              </div>

              <div className="flex items-center gap-[27.27px]">
                <div>uncorrelated - for example</div>
                <div className="flex items-center gap-[11.92px]">
                  <Image
                    src="/static/images/tokens/eth-purple.png"
                    className="w-6 h-6"
                    alt="logo"
                    width={23.843}
                    height={23.843}
                  />
                  <Image
                    src="/static/images/tokens/dai.png"
                    className="w-6 h-6"
                    alt="logo"
                    width={23.843}
                    height={23.843}
                  />
                </div>
              </div>

              <p>
                Fenix Finance offers two different liquidity pool types based on token pair needs, Stable Pools and
                Volatile Pools. Fenix supports custom factories, so that new pool types can always be integrated.
              </p>

              <p>
                The protocol router evaluates both pool types to determine the most efficient price quotation and trade
                execution route available. To protect against flashloan attacks, the router will use 30-minute TWAPs
                (time-weighted average prices). The router doesn&apos;t require upkeep (external maintenance).
              </p>

              <p>
                The deeper the liquidity of a given pool (higher value locked), the smaller the slippage it will offer.
              </p>
            </ListItemWrapper>
            <ListItemWrapper title="Stable Pools">
              <p>
                Stable pools are designed for tokens which have little to no volatility. This means that the formula
                used for pricing the tokens allows for low slippage even on large traded volumes.
              </p>
              <FormulaWrapper>x³y + y³x ≥ k</FormulaWrapper>
            </ListItemWrapper>
            <ListItemWrapper title="Volatile Pools">
              <p>
                Volatile pools are designed for tokens with high price volatility. These pools use a generic AMM
                formula.
              </p>

              <FormulaWrapper>x × y ≥ k</FormulaWrapper>
            </ListItemWrapper>

            <ListItemWrapper title="A visual representation of the formulas">
              <p>The mathematical formulas are used to keep the total pool liquidity the same at all times.</p>

              <div>
                <p>
                  Below, you can find a visual comparison between the stable (red) and volatile (green) AMM pricing
                  equations, where:
                </p>
                <ul className="list-disc pl-5">
                  <li>x is the amount of first token in the pool</li>
                  <li>y is the amount of second token in the same pool</li>
                  <li>k is a fixed constant</li>
                </ul>
              </div>

              <Image src={hyperbolaSrc} width={472} height={395} alt="Hyperbola" />
            </ListItemWrapper>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default LiquidityReadMoreModal
