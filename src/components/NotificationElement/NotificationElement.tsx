import './NotificationElement.css'
import { Alert } from '@mui/material'
import { INotification } from '../../types'

interface Props {
  notification?: INotification
}

export function NotificationElement({ notification }: Props) {
  return notification ? (
    <Alert severity={notification.type}>{notification.text}</Alert>
  ) : null
}
