import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@shared/hooks'
import { useNavigate } from 'react-router-dom'
import imageCompression from 'browser-image-compression'

import { Avatar } from './components/Avatar/Avatar'
import { Button } from '@shared/ui'
import { InfoString } from './components/InfoString/InfoString'
import { AboutMe } from './components/AboutMe/AboutMe'

import { logOut, setUser } from '@shared/store/profile/profileSlice'
import { saveImage } from '@/firebase/storageImages/saveImage'
import { getUser, updateUser } from '@/firebase/users'
import { showNotification } from '@shared/utils'

import { Routing, INFO_STRING } from '@shared/constants'
import { BUTTON_TYPE, BUTTON_CLASS_NAME } from '@shared/constants'
import { ICONS } from '@shared/constants/icons'

import classes from './style.module.css'

export const Profile: React.FC = () => {
  const {
    email,
    avatar,
    userId: myUserId,
    infoAboutMe,
    address,
    number,
  } = useAppSelector((state) => state.ProfileReducer.user)

  const [editInfoAboutMe, setEditInfoAboutMe] = useState<string | null>('')
  const [currentImg, setCurrentImg] = useState<string | null>(null)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [editNumber, setEditNumber] = useState<string | null>('')
  const [editAddress, setEditAddress] = useState<string | null>('')

  const styleBtnBack = {
    position: 'absolute',
    top: '20px',
    left: '50px',
  } as const

  const navigation = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    setEditInfoAboutMe(infoAboutMe)
    setEditNumber(number)
    setEditAddress(address)
    setCurrentImg(avatar)
  }, [infoAboutMe])

  const onHandlerInfoAboutMe = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setEditInfoAboutMe(e.currentTarget.value)
  }
  //
  const onHandlerLogOut = () => {
    dispatch(logOut())
    navigation(Routing.AUTHORIZATION)
  }
  const onGoBack = () => {
    if (isEdit) {
      setIsEdit(false)
      setEditInfoAboutMe(infoAboutMe)
      setEditNumber(number)
      setEditAddress(address)
      setCurrentImg(avatar)
    } else {
      navigation(-1)
    }
  }
  const onHandlerEdit = () => {
    setIsEdit(true)
  }
  const onHandlerInputFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const fileImg = files![0]

    if (!/^image/.test(fileImg.type)) {
      showNotification('warning', 'The selected file is not an image!')
      return
    }
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 300,
      useWebWorker: true,
    }

    const compressedImage = await imageCompression(fileImg, options)

    const reader = new FileReader()
    reader.readAsDataURL(compressedImage)

    reader.onload = () => {
      setCurrentImg(reader.result as string)
    }
    reader.onerror = () => {
      showNotification('error', 'An error occurred while reading the file')
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
      .then(() => {
        showNotification('success', 'Saved successfully')
      })
      .catch((error) => {
        showNotification('error', error.message)
      })
    const newUser = await getUser(myUserId!)
    dispatch(setUser(newUser!))
    setIsEdit(false)
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

      <Avatar
        isEdit={isEdit}
        onHandlerInputFile={onHandlerInputFile}
        currentImg={currentImg}
        onHandlerEdit={onHandlerEdit}
      />

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
            content={editNumber ?? ''}
            isEdit={isEdit}
            onHandlerInput={onHandlerNumber}
          />
          <InfoString
            type={INFO_STRING.EMAIL}
            content={email ?? ''}
            isEdit={isEdit}
            onHandlerInput={() => {}}
          />
          <InfoString
            type={INFO_STRING.ADDRESS}
            content={editAddress ?? ''}
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
