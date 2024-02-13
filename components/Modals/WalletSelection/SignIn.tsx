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
        className="absolute top-0 right-0 text-2xl cursor-pointer icon-x text-shark-100"
        onClick={handlerClose}
      />
      <div className="relative w-full h-full">
        <div className="flex items-center justify-center w-12 h-12 p-3 rounded-lg bg-shark-400 bg-opacity-40">
          <span className="text-xl text-chilean-fire-600 icon-wallet"></span>
        </div>
        <Image
          src="/static/images/modals/spinner.png"
          alt="loading"
          className="w-[156px] h-[156px] mx-auto mb-5"
          width={156}
          height={156}
        />
        <h4 className="mb-3 text-lg text-center text-white">Approve Signature</h4>
        <p className="text-shark-100 text-sm text-center mb-6 max-w-[300px] mx-auto">
          Please approve the wallet signature in order to log into the Platform.
        </p>
        <div className="flex items-center justify-center gap-2 cursor-pointer text-shark-100 hover:text-outrageous-orange-500">
          <span className="icon-discord"></span>
          <p className="text-sm">Need help?</p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
