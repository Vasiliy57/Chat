


import { Message } from '@/shared/components'
import classes from './messages.module.css'
import { IMessages } from './types'

export const Messages: React.FC<IMessages> = ({ currentDialogUser }) => {
  const currentUser = currentDialogUser.email || null
  return (
    <div className={classes.messages}>
      {
        currentUser
          ?
          <>
            {/* messages list */}
            <Message myMessage={false} />
            <Message myMessage={true} />
          </>
          : null
      }

    </div>
  )
}

