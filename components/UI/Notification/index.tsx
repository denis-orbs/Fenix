'use client'
import React, { useEffect } from 'react'

interface NotificationProps {
  show: boolean
}

const Notification = ({ show = false }: NotificationProps) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector('.bg-notification')?.classList.add('hidden')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className="bg-notification animate-toast-in bg-[length:100%] bg-no-repeat fixed top-[150px] right-5 w-[326px] backdrop-blur-sm p-2">
      <div className="flex gap-3 items-center w-full justify-end">
        <div className="h-[5px] w-10 bg-shark-400 flex rounded-lg overflow-hidden">
          <div className="h-full bg-gradient-to-r from-outrageous-orange-500 to-chilean-fire-500 animate-progress"></div>
        </div>
        <span className="icon-bell text-shark-100 text-base"></span>
      </div>
      <div className="flex items-center gap-4 w-full mb-3">
        <div className="bg-shark-400 bg-opacity-40 rounded-lg p-2 w-10 h-10 flex items-center justify-center">
          <span className="text-base inline-block text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text icon-wallet"></span>
        </div>
        <p className="text-white text-xs max-w-[150px]">Wallet (0x98b...6de3c) Connected Successfully</p>
      </div>
      <div className="flex items-center gap-3">
        <p className="inline-block text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text text-xs">
          <span className="icon-link mr-2"></span>
          View In Explorer
        </p>
        <p className="inline-block text-xs text-shark-100">
          <span className="icon-clock mr-2"></span>5 seconds ago...
        </p>
      </div>
    </div>
  )
}

export default Notification
