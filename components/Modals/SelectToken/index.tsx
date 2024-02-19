/* eslint-disable max-len */
'use client'

import { Button, Modal } from '@/components/UI'
import Search from '@/components/Common/Search'
import Image from 'next/image'

import { IToken } from '@/types'

import { COMMON_TOKENS_LIST, TOKENS_LIST } from './data'

interface SelectTokenProps {
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
  setToken: (token: IToken) => void
}

const SelectToken = ({ setOpenModal, openModal, setToken }: SelectTokenProps) => {
  const handlerClose = () => setOpenModal(false)

  const handlerSelectToken = (token: IToken) => {
    setToken(token)
    setOpenModal(false)
  }

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className="box-select-token">
        <span
          className="absolute top-2 xl:top-0 right-3 xl:right-0 text-2xl cursor-pointer icon-x text-shark-100"
          onClick={handlerClose}
        />
        <div className="relative w-full h-full z-10">
          <h1 className="text-lg font-medium text-white">Select a Token</h1>
          <p className="text-shark-100 text-sm mb-4">
            Select a token from our default list or search for a token by symbol or address.
          </p>

          <div className="mb-4">
            <Search />
          </div>

          <div className="text-white text-sm mb-2">Common Tokens</div>
          <div className="flex items-center gap-1 mb-4 flex-col xl:flex-row">
            {COMMON_TOKENS_LIST.map((token, index) => (
              <div
                key={index}
                onClick={() => handlerSelectToken(token)}
                className="flex gap-2 items-center bg-shark-400 bg-opacity-40 py-2 xl:py-1 px-2 rounded-lg cursor-pointer w-full xl:w-auto"
              >
                <Image
                  src={`/static/images/tokens/${token.symbol}.png`}
                  alt="token"
                  width={30}
                  height={30}
                  className="w-5 h-5"
                />
                <p className="text-white text-xs">{token.symbol}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 max-h-[130px] overflow-y-auto">
            {TOKENS_LIST.map((token, index) => (
              <div
                key={index}
                onClick={() => handlerSelectToken(token)}
                className="flex items-center justify-between cursor-pointer bg-shark-400 bg-opacity-40 p-3 rounded-lg"
              >
                <div className="flex gap-2 items-center">
                  <Image
                    src={`/static/images/tokens/${token.symbol}.png`}
                    alt="token"
                    width={30}
                    height={30}
                    className="w-7 h-7"
                  />
                  <div className="relative">
                    <p className="text-white text-xs">{token.symbol}</p>
                    <p className="text-shark-100 text-xs">{token.name}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-end">
                  <div className="flex items-center gap-2">
                    <span className="icon-wallet text-sm text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
                    <p className="text-white text-xs">Balance: {token.balance}</p>
                  </div>
                  <div className="text-white bg-button-primary text-[10px] leading-none py-1 rounded-md text-center px-2">
                    ${token.amount}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Button className="mt-2 mb-2 lg:w-full sm:w-full w-72" variant="tertiary">
              Confirm SelectToken
            </Button>
          </div>
          <div className="flex items-center justify-center gap-2 cursor-pointer text-shark-100 hover:text-outrageous-orange-500">
            <span className="icon-discord"></span>
            <p className="text-sm">Need help?</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SelectToken
