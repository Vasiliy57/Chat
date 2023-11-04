import { icons } from '@shared/constants/icons'
import { SvgProps } from '@shared/types/icon'
import back from './svg/back.svg'
import download from './svg/download.svg'
import edit from './svg/edit.svg'
import email from './svg/email.svg'
import location from './svg/location.svg'
import search from './svg/search.svg'
import attach from './svg/attach.svg'
import tel from './svg/tel.svg'
import menu from './svg/menu.svg'
import phone from './svg/phone.svg'
import smile from './svg/smile.svg'
import video from './svg/video.svg'
import voice from './svg/voice.svg'
import plus from './svg/plus.svg'
import send from './svg/send.svg'
import logo from './svg/logo.svg'
import classes from './style.module.css'

export const Icon: React.FC<SvgProps> = ({
  iconName,
  styleIcon,
  widthIcon = 'auto',
  heightIcon = 'auto',
}) => {
  switch (iconName) {
    case icons.BACK:
      return (
        <img
          width={widthIcon}
          height={heightIcon}
          src={back}
          style={styleIcon}
          className={classes.icon}
          alt="icon back"
        />
      )
    case icons.DOWNLOAD:
      return (
        <img
          width={widthIcon}
          height={heightIcon}
          src={download}
          style={styleIcon}
          className={classes.icon}
          alt="icon download"
        />
      )
    case icons.EDIT:
      return (
        <img
          width={widthIcon}
          height={heightIcon}
          src={edit}
          style={styleIcon}
          className={classes.icon}
          alt="icon edit"
        />
      )
    case icons.EMAIL:
      return (
        <img
          width={widthIcon}
          height={heightIcon}
          src={email}
          style={styleIcon}
          className={classes.icon}
          alt="icon email"
        />
      )
    case icons.LOCATION:
      return (
        <img
          width={widthIcon}
          height={heightIcon}
          src={location}
          style={styleIcon}
          className={classes.icon}
          alt="icon location"
        />
      )
    case icons.SEARCH:
      return (
        <img
          width={widthIcon}
          height={heightIcon}
          src={search}
          style={styleIcon}
          className={classes.icon}
          alt="icon search"
        />
      )
    case icons.TEL:
      return (
        <img
          width={widthIcon}
          height={heightIcon}
          src={tel}
          style={styleIcon}
          className={classes.icon}
          alt="icon tel"
        />
      )
    case icons.ATTACH:
      return (
        <img
          width={widthIcon}
          height={heightIcon}
          src={attach}
          style={styleIcon}
          className={classes.icon}
          alt="icon attach"
        />
      )
    case icons.MENU:
      return (
        <img
          width={widthIcon}
          height={heightIcon}
          src={menu}
          style={styleIcon}
          className={classes.icon}
          alt="icon menu"
        />
      )
    case icons.PHONE:
      return (
        <img
          width={widthIcon}
          height={heightIcon}
          src={phone}
          style={styleIcon}
          className={classes.icon}
          alt="icon phone"
        />
      )
    case icons.SMILE:
      return (
        <img
          width={widthIcon}
          height={heightIcon}
          src={smile}
          style={styleIcon}
          className={classes.icon}
          alt="icon smile"
        />
      )
    case icons.VIDEO:
      return (
        <img
          width={widthIcon}
          height={heightIcon}
          src={video}
          style={styleIcon}
          className={classes.icon}
          alt="icon video"
        />
      )
    case icons.VOICE:
      return (
        <img
          width={widthIcon}
          height={heightIcon}
          src={voice}
          style={styleIcon}
          className={classes.icon}
          alt="icon voice"
        />
      )
    case icons.PLUS:
      return (
        <img
          width={widthIcon}
          height={heightIcon}
          src={plus}
          style={styleIcon}
          className={classes.icon}
          alt="icon plus"
        />
      )
    case icons.SEND:
      return (
        <img
          width={widthIcon}
          height={heightIcon}
          src={send}
          style={styleIcon}
          className={classes.icon}
          alt="icon send"
        />
      )
    case icons.LOGO:
      return (
        <img
          width={widthIcon}
          height={heightIcon}
          src={logo}
          style={styleIcon}
          className={classes.icon}
          alt="icon logotype"
        />
      )
    default:
      break
  }
}
