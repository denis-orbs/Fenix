export interface NotificationDetails {
  id: string
  createTime: string
  message: string
  notificationType: NotificationType
  txHash?: string
}
export enum NotificationType {
  DEFAULT = 'Default',
  SUCCESS = 'Success',
  ERROR = 'Error',
  WARNING = 'Warning',
}
