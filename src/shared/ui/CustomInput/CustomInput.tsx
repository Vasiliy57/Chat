import classes from './style.module.css'

interface CustomInputProps {
  refCustomInput: HTMLDivElement
}

export const CustomInput: React.FC<CustomInputProps> = ({ refCustomInput }) => {
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
}
