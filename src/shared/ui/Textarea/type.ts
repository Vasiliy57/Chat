import { TextareaHTMLAttributes } from 'react'
import { TEXTAREA_CLASS_NAME } from '@shared/constants'

type Keys = keyof typeof TEXTAREA_CLASS_NAME
type values = (typeof TEXTAREA_CLASS_NAME)[Keys]

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  textareaClassName: values
}
