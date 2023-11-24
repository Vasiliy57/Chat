import classes from './style.module.css'

interface CustomInputProps {
  refCustomInput: HTMLDivElement
}

export const CustomInput: React.FC<CustomInputProps> = ({ refCustomInput }) => {
  const onHandlerClick = () => {}

  return (
    <div className={classes.customInput}>
      <div
        ref={refCustomInput}
        className={classes.content}
        onClick={onHandlerClick}
        contentEditable={true}
        suppressContentEditableWarning={true}
      ></div>
    </div>
  )
}
