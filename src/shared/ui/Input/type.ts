import { InputHTMLAttributes } from 'react'
import { INPUT_CLASS_NAME } from '@shared/constants/input'

type Keys = keyof typeof INPUT_CLASS_NAME
type values = (typeof INPUT_CLASS_NAME)[Keys]

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputClassName: values
}
