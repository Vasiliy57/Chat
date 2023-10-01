
import { Button } from '@/shared/ui'
import classes from './search.module.css'
export const Search: React.FC = () => {
  return (
    <div className={classes.search}>
      <input className={classes.input} type="text" placeholder='Search messages, people' />
      <Button name='+' onClick={() => { }} style={{ lineHeight: 0 }} />
    </div>
  )
}

