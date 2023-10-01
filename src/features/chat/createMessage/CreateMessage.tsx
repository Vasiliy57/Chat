
import { Button, ButtonIcon } from '@shared/ui'

import classes from './createMessage.module.css'


export const CreateMessage: React.FC = () => {

  const styleBtnSend = {
    display: 'flex',
    gap: '10px',
    fontSize: '2rem',
    fontWeight: 400,
    padding: '15px 18px',
    lineHeight: 1,
  }

  return (
    <div className={classes.TypeMessage}>
      <input className={classes.input} type='text' placeholder='Type message...' />
      <span className={classes.smile}><ButtonIcon name='smile' onClick={() => { }} /></span>
      <div className={classes.buttons}>
        <ButtonIcon name='voice' onClick={() => { }} />
        <ButtonIcon name='attach' onClick={() => { }} />
        <Button name='Send' onClick={() => { }} style={styleBtnSend} />
      </div>
    </div>
  )
}

