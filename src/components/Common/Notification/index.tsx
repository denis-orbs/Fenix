'use client'
import React, { useEffect } from 'react'

interface NotificationProps {
  show: boolean
  status: string
  txHash?: number
  timestamp?: number
  message?: string
}

type StatusInfo = {
  class: string
  text: string
  icon: string
  viewColor: string
}

const Notification = ({ show = true, status }: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector('.notification')?.classList.add('visible')
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const STATUS: { [key: string]: StatusInfo } = {
    connected: {
      class: ' bg-gradient-to-r from-outrageous-orange-500 to-chilean-fire-500 ',
      text: 'Wallet (0x98b...6de3c) Connected Successfully',
      icon: 'icon-wallet text-gradient',
      viewColor: 'text-gradient',
    },
    warning: {
      class: ' bg-gradient-to-r from-festival-100 to-festival-200 ',
      text: 'Something is wrong! Invalid Decimal Value',
      icon: 'icon-warning text-festival-200',
      viewColor: 'text-festival-200',
    },
    error: {
      class: ' bg-gradient-to-r from-alizarin-crimson-600 to-alizarin-crimson-700 ',
      text: 'User Rejected Request!',
      icon: 'icon-info text-alizarin-crimson-600',
      viewColor: 'text-alizarin-crimson-600',
    },
    success: {
      class: ' bg-gradient-to-r from-green-200 to-green-300 ',
      text: 'FNX swapped for ETH',
      icon: 'icon-party text-green-300',
      viewColor: 'text-green-300',
    },
  }
  if (!show) return null

  return (
    <>
      <div className="notification  box-invert animate-toast-in    fixed top-[150px] right-5 w-[326px]  px-4 pt-1 pb-3">
        <div className="relative z-50">
          <div className="flex items-center justify-end w-full  gap-3">
            <div className="h-[5px] w-10 bg-shark-400 flex rounded-lg overflow-hidden">
              <div className={`h-full ${STATUS[status].class} animate-progress`}></div>
            </div>
            <span className="text-base icon-bell text-shark-100"></span>
          </div>
          <div className="flex items-center w-full gap-4 mb-3">
            <div className="flex items-center justify-center w-10 h-10 p-2 rounded-lg bg-shark-400 bg-opacity-40">
              <span className={`inline-block text-xl ${STATUS[status].icon} `} />
            </div>
            <p className="text-white text-xs max-w-[150px]">{STATUS[status].text}</p>
          </div>
          <div className="flex items-center gap-3">
            <p className={`inline-block text-xs ${STATUS[status].viewColor}`}>
              <span className="mr-2 icon-link"></span>
              View In Explorer
            </p>
            <p className="inline-block text-xs text-shark-100">
              <span className="mr-2 icon-clock"></span>5 seconds ago...
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Notification
