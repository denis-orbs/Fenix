'use client'
import { useUnreadNotifications } from '@/src/state/notifications/hooks'
import Notification from '.'

const NotificationFeed = () => {
  const notifications = useUnreadNotifications()
  const visibleNotifications = notifications.slice(-7).reverse()
  return (
    <div className="fixed top-[150px] right-5 flex flex-col space-y-2">
      {visibleNotifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          createTime={notification?.createTime}
          message={notification?.message}
          notificationType={notification?.notificationType}
          txHash={notification?.txHash}
          timeToShow={notification?.timeToShow}
          notificationDuration={notification?.notificationDuration}
        />
      ))}
    </div>
  )
}

export default NotificationFeed
