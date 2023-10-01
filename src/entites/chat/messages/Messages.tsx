


import { Message } from '@/shared/components'
import classes from './messages.module.css'

export const Messages: React.FC = () => {

  return (
    <div className={classes.messages}>
      <Message myMessage={false} />
      <Message myMessage={true} />

    </div>
  )
}

