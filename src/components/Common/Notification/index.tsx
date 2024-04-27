'use client'

import { useReadNotificationCallback } from '@/src/state/notifications/hooks'
import { NotificationDetails, NotificationDuration, NotificationType } from '@/src/state/notifications/types'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

type StatusInfo = {
  class: string
  icon: string
  color: string
}

function secondsAgo(createTime: string) {
  const now = new Date()
  const createTimeDate = new Date(createTime)
  const differenceInMilliseconds = now.getTime() - createTimeDate.getTime()
  return Math.floor(differenceInMilliseconds / 1000)
}

const Notification = ({
  id,
  createTime,
  message,
  notificationType,
  txHash,
  notificationDuration = NotificationDuration.DURATION_4000,
}: NotificationDetails) => {
  const readNotification = useReadNotificationCallback()
  const savedCallback = useRef(readNotification)
  const [seconds, setSeconds] = useState(() => secondsAgo(createTime || new Date().toISOString()))
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(secondsAgo(createTime))
    }, 1000)
    return () => clearInterval(interval)
  }, [createTime])

  useEffect(() => {
    savedCallback.current = readNotification
  }, [readNotification])

  useEffect(() => {
    const timer = setTimeout(() => {
      savedCallback.current(id)
    }, notificationDuration)
    return () => clearTimeout(timer)
  }, [readNotification, id, notificationDuration])

  const STATUS: { [key in NotificationType]: StatusInfo } = {
    [NotificationType.DEFAULT]: {
      class: ' bg-gradient-to-r from-outrageous-orange-500 to-chilean-fire-500 ',
      icon: 'icon-info text-gradient',
      color: 'text-gradient',
    },
    [NotificationType.WARNING]: {
      class: ' bg-gradient-to-r from-festival-100 to-festival-200 ',
      icon: 'icon-warning text-festival-200',
      color: 'text-festival-200',
    },
    [NotificationType.ERROR]: {
      class: ' bg-gradient-to-r from-alizarin-crimson-600 to-alizarin-crimson-700 ',
      icon: 'icon-info text-alizarin-crimson-600',
      color: 'text-alizarin-crimson-600',
    },
    [NotificationType.SUCCESS]: {
      class: ' bg-gradient-to-r from-green-200 to-green-300 ',
      icon: 'icon-party text-green-300',
      color: 'text-green-300',
    },
  }
  const animationDuration = {
    [NotificationDuration.DURATION_3000]: 'animate-progress-toast-3000',
    [NotificationDuration.DURATION_4000]: 'animate-progress-toast-4000',
    [NotificationDuration.DURATION_5000]: 'animate-progress-toast-5000',
    [NotificationDuration.DURATION_10000]: 'animate-progress-toast-10000',
    [NotificationDuration.DURATION_15000]: 'animate-progress-toast-15000',
  }
  console.log(notificationDuration)
  return (
    <>
      <div className="notification  box-invert animate-toast-in w-[326px] z-50 px-4 pt-1 pb-3">
        <div className="relative z-50">
          <div className="flex items-center justify-end w-full  gap-3">
            <div className="h-[5px] w-10 bg-shark-400 flex rounded-lg overflow-hidden">
              <div
                className={`h-full ${STATUS[notificationType].class} ${animationDuration[notificationDuration]}`}
              ></div>
            </div>
            <span
              onClick={() => {
                savedCallback.current(id)
              }}
              className="text-base cursor-pointer icon-x text-shark-100"
            ></span>
          </div>
          <div className="flex items-center w-full gap-2 mb-3">
            <div className="flex items-center justify-center w-10 h-10 p-2 rounded-lg bg-shark-400 bg-opacity-40">
              <span className={`inline-block text-xl ${STATUS[notificationType].icon} `} />
            </div>
            <p className="text-white text-sm max-w-[150px] flex-1">{message}</p>
          </div>
          <div className="flex items-center gap-3">
            <p className={`inline-block  text-xs group ${STATUS[notificationType].color}`}>
              {txHash && (
                <>
                  <span className="mr-2 icon-link group-hover:underline"></span>
                  <Link className="group-hover:underline" href={`https://blastscan.io/tx/${txHash}`} target="_blank">
                    View In Explorer
                  </Link>
                </>
              )}
            </p>
            {createTime && (
              <p className="inline-block text-xs  text-shark-100">
                <span className="mr-2 icon-clock"></span>
                {seconds} seconds ago...
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Notification
