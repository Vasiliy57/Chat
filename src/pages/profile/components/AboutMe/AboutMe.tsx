import classes from './style.module.css'

interface AboutMeProps {
  content: string
  onHandlerTextarea: (e: React.FormEvent<HTMLTextAreaElement>) => void
  isEdit: boolean
}

export const AboutMe: React.FC<AboutMeProps> = ({
  content,
  onHandlerTextarea,
  isEdit,
}) => {
  return (
    <textarea
      maxLength={700}
      className={classes.textarea}
      value={content}
      onChange={onHandlerTextarea}
      disabled={!isEdit}
    ></textarea>
  )
}
