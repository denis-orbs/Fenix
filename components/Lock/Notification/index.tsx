import React from 'react'

interface NotificationLockProps {
  info: string
}

const NotificationLock = ({ info }: NotificationLockProps) => {
  return (
    <div className="bg-shark-400 bg-opacity-40 rounded-xl p-5  justify-between rounded-lg w-2/5 mb-5 me-20 hidden xl:flex">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-12 h-12 p-3 rounded-lg bg-shark-400 bg-opacity-60">
          <span className="inline-block text-2xl text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text icon-info"></span>
        </div>
        <p className="text-shark-100 text-xs">{info}</p>
      </div>
    </div>
  )
}

export default NotificationLock
