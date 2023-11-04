import { icons } from '@shared/constants/icons'

type Keys = keyof typeof icons
type values = (typeof icons)[Keys]

export interface SvgProps {
  iconName?: values
  styleIcon?: React.CSSProperties
  heightIcon?: string
  widthIcon?: string
}
