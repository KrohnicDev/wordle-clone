import { INotification } from '../types'

interface Props {
  notification?: INotification
}

export default function NotificationElement({ notification }: Props) {
  return notification ? (
    <div className={`notification ${notification.type}`}>
      {notification.text}
    </div>
  ) : null
}
