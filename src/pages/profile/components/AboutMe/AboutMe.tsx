import { Textarea } from '@shared/ui'
import { TEXTAREA_CLASS_NAME } from '@shared/constants'

interface AboutMeProps {
  content: string | null
  onHandlerTextarea: (e: React.FormEvent<HTMLTextAreaElement>) => void
  isEdit: boolean
}

export const AboutMe: React.FC<AboutMeProps> = ({
  content,
  onHandlerTextarea,
  isEdit,
}) => {
  return (
    <Textarea
      maxLength={400}
      textareaClassName={TEXTAREA_CLASS_NAME.ABOUT_ME}
      value={content ?? undefined}
      onChange={onHandlerTextarea}
      disabled={!isEdit}
      placeholder="Write information about yourself"
    ></Textarea>
  )
}
