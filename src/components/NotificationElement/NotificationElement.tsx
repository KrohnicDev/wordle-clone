import { Alert } from '@mui/material'
import { useNotification } from '../../hooks/useNotification'
import './NotificationElement.css'

export function NotificationElement() {
  const notification = useNotification()
  return notification ? (
    <Alert severity={notification.type}>{notification.text}</Alert>
  ) : null
}
