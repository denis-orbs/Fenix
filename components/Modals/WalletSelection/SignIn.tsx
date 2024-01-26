'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import useStore from '@/store'

interface SignInProps {
  setOpenModal: (openModal: boolean) => void
}

const SignIn = ({ setOpenModal }: SignInProps) => {

  const { setIsConnected } = useStore()
  const handlerClose = () => setOpenModal(false)

  useEffect(() => {
    setTimeout(() => {
      setOpenModal(false)
      setIsConnected(true)
    }, 1000)
  }, [])

  return (
    <div className="w-[478px] h-[468px] px-8 py-8 bg-no-repeat bg-[length:100%] bg-modal-signin flex flex-col items-center justify-center relative">
      <span
        className="icon-x text-shark-100 text-2xl absolute top-0 right-0 cursor-pointer"
        onClick={handlerClose}
      ></span>
      <div className="w-full h-full relative">
        <div className="bg-shark-400 bg-opacity-40 rounded-lg p-3 w-12 h-12 flex items-center justify-center">
          <span className="text-xl text-chilean-fire-600 icon-wallet"></span>
        </div>
        <Image
          src="/static/images/modals/spinner.png"
          alt="loading"
          className="w-[156px] h-[156px] mx-auto mb-5"
          width={156}
          height={156}
        />
        <h4 className="text-white mb-3 text-lg text-center">Approve Signature</h4>
        <p className="text-shark-100 text-sm text-center mb-6 max-w-[300px] mx-auto">
          Please approve the wallet signature in order to log into the Platform.
        </p>
        <div className="flex items-center gap-2 cursor-pointer text-shark-100 hover:text-outrageous-orange-500 justify-center">
          <span className="icon-discord"></span>
          <p className="text-sm">Need help?</p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
