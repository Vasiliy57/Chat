import { useAppDispatch, useAppSelector } from '@shared/hooks'
import classes from './style.module.css'
import defaultImg from './user-img.jpg'
import { logOut, setUser } from '@shared/store/profile/profileSlice'
import { useNavigate } from 'react-router-dom'
import { Routing } from '@shared/constants'
import backIcon from './icons/back.svg'
import editIcon from './icons/edit.svg'
import downloadIcon from './icons/download.svg'
import { useEffect, useState } from 'react'
import { saveImage } from '@/firebase/storageImages/saveImage'
import { getUser, updateUser } from '@/firebase/users'
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
  const [currentImg, setCurrentImg] = useState<any>(null)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [editNumber, setEditNumber] = useState<string>('')
  const [editAddress, setEditAddress] = useState<string>('')

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
      setCurrentImg(reader.result)
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

  const onHandlerAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditAddress(e.currentTarget.value)
  }
  const onHandlerNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditNumber(e.currentTarget.value)
  }

  if (isEdit) {
    return (
      <div className={classes.profile}>
        <img
          onClick={onGoBack}
          className={classes.back}
          src={backIcon}
          alt="back icon"
        />
        <div className={classes.info}>
          <input
            className={classes.inputFile}
            type="file"
            id="down"
            onChange={(e) => onHandlerInputFile(e)}
          />
          <label htmlFor="down">
            <img
              className={classes.download}
              src={downloadIcon}
              alt="download"
            />
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
        <div className={classes.aboutMe}>
          <h4 className={classes.title}>Info About Me</h4>
          <textarea
            maxLength={700}
            className={classes.textarea}
            value={editInfoAboutMe}
            onChange={onHandlerInfoAboutMe}
          ></textarea>
        </div>
        <div className={classes.contacts}>
          <h4 className={classes.title}>Contacts</h4>
          <div className={classes.column}>
            <div className={classes.number}>
              <input
                maxLength={12}
                value={editNumber!}
                onChange={onHandlerNumber}
              />
            </div>

            <div className={classes.email}>{email}</div>
            <div className={classes.address}>
              <input
                maxLength={120}
                value={editAddress!}
                onChange={onHandlerAddress}
              />
            </div>
          </div>
        </div>
        <button className={classes.btnSave} onClick={onSaveEdit}>
          Save
        </button>
      </div>
    )
  }
  return (
    <div className={classes.profile}>
      <img
        onClick={onGoBack}
        className={classes.back}
        src={backIcon}
        alt="back icon"
      />
      <img onClick={onHandlerEdit} src={editIcon} className={classes.edit} />
      <div className={classes.info}>
        <div className={classes.img}>
          <img src={avatar || defaultImg} alt="avatar" />
        </div>
        <div className={classes.name}>{userName}</div>
      </div>
      <div className={classes.aboutMe}>
        <h4 className={classes.title}>Info About Me</h4>
        <p className={classes.text}>{infoAboutMe}</p>
      </div>
      <div className={classes.contacts}>
        <h4 className={classes.title}>Contacts</h4>
        <div className={classes.column}>
          <div className={classes.number}>{number || 'Write your number'}</div>
          <div className={classes.email}>{email || 'Write your email'}</div>
          <div className={classes.address}>
            {address || 'Write your address'}
          </div>
        </div>
      </div>
      <button className={classes.btn} onClick={onHandlerLogOut}>
        Log out
      </button>
    </div>
  )
}
