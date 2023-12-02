import { forwardRef } from 'react'
import classes from './style.module.css'

export const CustomInput = forwardRef<HTMLDivElement>((_, refCustomInput) => {
  return (
    <div className={classes.customInput}>
      <div
        ref={refCustomInput}
        className={classes.content}
        contentEditable={true}
        suppressContentEditableWarning={true}
      ></div>
    </div>
  )
})
CustomInput.displayName = 'CustomInput'
