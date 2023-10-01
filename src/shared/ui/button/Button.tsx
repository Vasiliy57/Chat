import classes from './button.module.css'
import plus from './plus.svg'
import iconSend from './send.svg'

interface IBtn {
  onClick: () => void
  name: string
  style?: React.CSSProperties
}

export const Button: React.FC<IBtn> = ({ name, onClick, style }) => {

  const onHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onClick()
  }

  return (
    <button className={classes.btn} onClick={onHandler} style={style}>
      {
        name === '+'
          ? <img src={plus} alt="Add" />
          : name === 'Send'
            ? [name, <img src={iconSend} alt='icon send' key={1} />]
            : name
      }


    </button>
  )
}

