import { Button, Input } from '@/shared/ui'
import { Icon } from '@shared/assets/Icon/Icon'

import { BUTTON_TYPE, BUTTON_CLASS_NAME } from '@shared/constants'
import { ICONS } from '@shared/constants'
import { INPUT_CLASS_NAME } from '@shared/constants'

import classes from './search.module.css'

export const Search: React.FC = () => {
  const styleIcon = {
    position: 'absolute',
    left: '39px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '18.3px',
    height: ' 18.3px',
    Zindex: '10',
  } as const

  return (
    <div className={classes.search}>
      <Icon iconName={ICONS.SEARCH} styleIcon={styleIcon} />
      <Input
        onChange={() => {}}
        inputClassName={INPUT_CLASS_NAME.SEARCH}
        placeholder="Search messages, people"
      />
      <Button
        buttonType={BUTTON_TYPE.ICON}
        onClick={() => {}}
        iconName={ICONS.PLUS}
        buttonClassName={BUTTON_CLASS_NAME.FORM}
      />
    </div>
  )
}
