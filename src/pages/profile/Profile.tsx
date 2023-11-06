import { useAppDispatch, useAppSelector } from '@shared/hooks'
import classes from './style.module.css'
import defaultImg from './user-img.jpg'
import { logOut, setUser } from '@shared/store/profile/profileSlice'
import { useNavigate } from 'react-router-dom'
import { Routing, INFO_STRING } from '@shared/constants'
import { useEffect, useState } from 'react'
import { saveImage } from '@/firebase/storageImages/saveImage'
import { getUser, updateUser } from '@/firebase/users'
import { InfoString } from './components/InfoString/InfoString'
import { AboutMe } from './components/AboutMe/AboutMe'
import { Button } from '@shared/ui'
import { BUTTON_TYPE, BUTTON_CLASS_NAME } from '@shared/constants'
import { ICONS } from '@shared/constants/icons'
import { Icon } from '@shared/assets/Icon/Icon'

export const Profile: React.FC = () => {
  const {
    userName,
    email,
    avatar,
    userId: myUserId,
    infoAboutMe,
    address,
    number,
  } = useAppSelector((state) => state.ProfileReducer.user)

  const [editInfoAboutMe, setEditInfoAboutMe] = useState<string>('')
  const [currentImg, setCurrentImg] = useState<string | null>(null)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [editNumber, setEditNumber] = useState<string>('')
  const [editAddress, setEditAddress] = useState<string>('')
  const styleBtnEdit = {
    position: 'absolute',
    top: '20px',
    right: '50px',
  } as const

  const styleBtnBack = {
    position: 'absolute',
    top: '20px',
    left: '50px',
  } as const

  const styleIconDownload = {
    position: 'absolute',
    top: '-10px',
    right: '-21px',
    color: '#D9D9D9',
    width: '30px',
    height: '30px',
  } as const

  const navigation = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    setEditInfoAboutMe(infoAboutMe || 'Write information about yourself')
    setEditNumber(number || 'write your number')
    setEditAddress(address || 'write your address')
    setCurrentImg(avatar)
  }, [infoAboutMe])

  const onHandlerInfoAboutMe = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setEditInfoAboutMe(e.currentTarget.value)
  }

  const onHandlerLogOut = () => {
    dispatch(logOut())
    navigation(Routing.AUTHORIZATION)
  }
  const onGoBack = () => {
    if (isEdit) {
      setIsEdit(false)
      setEditInfoAboutMe(infoAboutMe || 'Write information about yourself')
      setEditNumber(number || 'write your number')
      setEditAddress(address || 'write your address')
      setCurrentImg(avatar)
    } else {
      navigation(-1)
    }
  }
  const onHandlerEdit = () => {
    setIsEdit(true)
  }
  const onHandlerInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const fileImg = files![0]

    if (!/^image/.test(fileImg.type)) {
      alert('The selected file is not an image!')
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(fileImg)

    reader.onload = () => {
      setCurrentImg(reader.result as string)
    }
    reader.onerror = () => {
      alert('An error occurred while reading the file')
    }
  }
  const onSaveEdit = async () => {
    if (currentImg) {
      saveImage(currentImg, myUserId!)
    }
    await updateUser(
      myUserId!,
      currentImg,
      editInfoAboutMe,
      editNumber || '',
      editAddress || ''
    )
    const newUser = await getUser(myUserId!)
    dispatch(setUser(newUser!))
  }

  const onHandlerAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditAddress(e.currentTarget.value)
  }
  const onHandlerNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value
    if (value.length > 12) value = value.slice(0, 12)
    setEditNumber(value)
  }

  return (
    <div className={classes.profile}>
      <Button
        styleBtn={styleBtnBack}
        widthIcon="30px"
        heightIcon="30px"
        onClick={onGoBack}
        buttonType={BUTTON_TYPE.ICON}
        iconName={ICONS.BACK}
        buttonClassName={BUTTON_CLASS_NAME.ICON}
      />
      {/* Подумать как можно сократить */}
      {isEdit ? (
        <>
          <div className={classes.info}>
            <input
              className={classes.inputFile}
              type="file"
              id="down"
              onChange={(e) => onHandlerInputFile(e)}
            />
            <label htmlFor="down">
              <Icon iconName={ICONS.DOWNLOAD} styleIcon={styleIconDownload} />
            </label>
            <div className={classes.img}>
              <img
                className={classes.avatar}
                src={currentImg ? currentImg : avatar ? avatar : defaultImg}
                alt="avatar"
              />
            </div>
            <div className={classes.name}>{userName}</div>
          </div>
        </>
      ) : (
        <>
          <Button
            styleBtn={styleBtnEdit}
            widthIcon="22px"
            heightIcon="22px"
            onClick={onHandlerEdit}
            buttonType={BUTTON_TYPE.ICON}
            iconName={ICONS.EDIT}
            buttonClassName={BUTTON_CLASS_NAME.ICON}
          />
          <div className={classes.info}>
            <div className={classes.img}>
              <img src={avatar || defaultImg} alt="avatar" />
            </div>
            <div className={classes.name}>{userName}</div>
          </div>
        </>
      )}
      {/* ************************************************** */}

      <div className={classes.aboutMe}>
        <h4 className={classes.title}>Info About Me</h4>
        <AboutMe
          content={editInfoAboutMe}
          onHandlerTextarea={onHandlerInfoAboutMe}
          isEdit={isEdit}
        />
      </div>
      <div className={classes.contacts}>
        <h4 className={classes.title}>Contacts</h4>
        <div className={classes.column}>
          <InfoString
            type={INFO_STRING.NUMBER}
            content={editNumber}
            isEdit={isEdit}
            onHandlerInput={onHandlerNumber}
          />
          <InfoString
            type={INFO_STRING.EMAIL}
            content={email}
            isEdit={isEdit}
            onHandlerInput={() => {}}
          />
          <InfoString
            type={INFO_STRING.ADDRESS}
            content={editAddress}
            isEdit={isEdit}
            onHandlerTextarea={onHandlerAddress}
          />
        </div>
      </div>
      {isEdit ? (
        <Button
          onClick={onSaveEdit}
          buttonType={BUTTON_TYPE.BUTTON}
          content="Save"
          buttonClassName={BUTTON_CLASS_NAME.SAVE}
        />
      ) : (
        <Button
          onClick={onHandlerLogOut}
          buttonType={BUTTON_TYPE.BUTTON}
          content="Log out"
          buttonClassName={BUTTON_CLASS_NAME.LOGOUT}
        />
      )}
    </div>
  )
}
