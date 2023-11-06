import { ButtonHTMLAttributes } from 'react'
import { SvgProps } from '@shared/types/icon'
import { BUTTON_TYPE, BUTTON_CLASS_NAME } from '@shared/constants'

type Keys = keyof typeof BUTTON_CLASS_NAME
type values = (typeof BUTTON_CLASS_NAME)[Keys]

export interface ButtonProps
  extends SvgProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  styleBtn?: React.CSSProperties
  buttonType: keyof typeof BUTTON_TYPE
  content?: string
  buttonClassName: values
}
