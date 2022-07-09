import { Alert } from '@mui/material'
import { INotification } from '../types'

interface Props {
  notification?: INotification
}

export default function NotificationElement({ notification }: Props) {
  return notification ? <Alert>{notification.text}</Alert> : null
}
