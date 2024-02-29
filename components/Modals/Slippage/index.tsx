'use client'

import { Button, Modal } from '@/components/UI'

interface SlippageProps {
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
}

const Slippage = ({ setOpenModal, openModal }: SlippageProps) => {

  const handlerClose = () => setOpenModal(false)

  return (
    <Modal className="mx-auto" openModal={openModal} setOpenModal={setOpenModal}>
      <div className="common-modal">
        <span className="absolute top-0 right-0 text-2xl cursor-pointer icon-x text-shark-100" onClick={handlerClose} />
        <div className="relative w-full h-full">
          <h1 className="mt-5 text-xl font-bold text-center text-white sm:mt-10 lg:mt-10">Slippage Tolerance</h1>
          <p className="text-shark-100 text-base mt-3 text-center lg:mb-6 sm:mb-6 mb-2 max-w-[300px] mx-auto">
            Adjust to your personal preferences.
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="0"
              className="p-4 w-full h-[55px] rounded-lg outline-none bg-shark-400 text-white"
            />
            <button className="absolute w-6 h-6 text-xs text-white rounded-lg cursor-pointer hover:bg-button-primary hover:border-outrageous-orange-400 right-2 top-4 bg-shark-300 bg-none">
              %
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-3 p-3 lg:flex-nowrap">
            <Button className="!py-2" variant="tertiary">
              Auto
            </Button>
            <Button className="!py-2" variant="tertiary">
              0.5%
            </Button>
            <Button className="!py-2" variant="tertiary">
              1.0%
            </Button>
            <Button className="!py-2" variant="tertiary">
              1.5%
            </Button>
            <Button className="!py-2" variant="tertiary">
              5.0%
            </Button>
          </div>
          <p className="text-sm text-center text-shark-200">
            Setting a high slippage tolerance can help transactions filled succesfully, but you may not get such a good
            price. Use with caution.
          </p>
          <div className="flex justify-center">
            <Button className="mt-2 mb-2 lg:w-full sm:w-full w-72" variant="tertiary">
              Confirm Slippage
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

export default Slippage
