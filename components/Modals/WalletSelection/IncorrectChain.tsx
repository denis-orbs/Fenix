'use client'

import { Button } from '@/components/UI'
import Image from 'next/image'

interface SlippageToleranceProps {
  setOpenModal: (openModal: boolean) => void
}

const IncorrectChain = ({ setOpenModal }: SlippageToleranceProps) => {

  const handlerClose = () => setOpenModal(false)

  return (
    <div className="w-[478px] h-[468px] px-8 py-8 bg-no-repeat bg-[length:100%] bg-modal-signin flex flex-col items-center justify-center relative">
      <span className="absolute top-0 right-0 text-2xl cursor-pointer icon-x text-shark-100" onClick={handlerClose} />
      <div className="relative w-full h-full">
        <div className="flex items-center justify-center w-12 h-12 border border-solid rounded-lg bg-shark-400 border-shark-400">
          <span className="text-lg text-transparent icon-unplug bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text"></span>
        </div>
        <div className="flex items-center justify-center mb-3">
          <Image
            src={'/static/images/modals/plug.png'}
            alt=""
            width={512}
            className="h-[128px]  w-[128px]"
            height={512}
          />
        </div>
        <div className="flex flex-col items-center justify-center mb-4">
          <h1 className="mb-2 text-xl font-bold text-center text-white">You are in the wrong network</h1>
          <p className="text-sm text-[#53606A] w-[261px] text-center">
            Please switch to Blast Network to use Fenix Protocol.
          </p>
        </div>
        <div className="flex justify-center">
          <Button variant="primary">
            <span className="text-xs">Switch to Blast Network</span>
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2 mt-10 cursor-pointer text-shark-100 hover:text-outrageous-orange-500">
          <span className="icon-discord"></span>
          <p className="text-sm">Need help?</p>
        </div>
      </div>
    </div>
  )
}

export default IncorrectChain
