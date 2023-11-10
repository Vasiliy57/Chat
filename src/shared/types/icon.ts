import { ICONS } from '@shared/constants/icons'

type Keys = keyof typeof ICONS
type values = (typeof ICONS)[Keys]

export interface SvgProps {
  iconName?: values
  styleIcon?: React.CSSProperties
  heightIcon?: string
  widthIcon?: string
}
