import { useAppDispatch, useAppSelector } from '@shared/hooks'
import classes from './style.module.css'
import img from './user-img.jpg'
import { logOut } from '@shared/store/profile/profileSlice'
import { useNavigate } from 'react-router-dom'
import { Routing } from '@shared/constants'
import backIcon from './icons/back.svg'
import editIcon from './icons/edit.svg'
import downloadIcon from './icons/download.svg'
import { useState, useEffect } from 'react'
import { savaImage } from '@/firebase/storageImages/saveImage'
import { getUserAvatar } from '@/firebase/storageImages/getUserAvatar'
export const Profile: React.FC = () => {
  const myUserId = useAppSelector((state) => state.ProfileReducer.user.userId)
  const [currentImg, setCurrentImg] = useState<any>(null)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const { userName, email } = useAppSelector(
    (state) => state.ProfileReducer.user
  )
  const navigation = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    getUserAvatar(myUserId!)
  }, [])

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
  const onSaveEdit = () => {
    savaImage(currentImg, myUserId!)
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
              src={currentImg || img}
              alt="avatar"
            />
          </div>
          <div className={classes.name}>{userName}</div>
        </div>
        <div className={classes.aboutMe}>
          <h4 className={classes.title}>Info About Me</h4>
          {/* <textarea className={classes.textarea}>
            5
          </textarea> */}
        </div>
        <div className={classes.contacts}>
          <h4 className={classes.title}>Contacts</h4>
          <div className={classes.column}>
            <div className={classes.number}></div>
            <div className={classes.email}></div>

            <div className={classes.address}></div>
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
          <img src={img} alt="avatar" />
        </div>
        <div className={classes.name}>{userName}</div>
      </div>
      <div className={classes.aboutMe}>
        <h4 className={classes.title}>Info About Me</h4>
        <p className={classes.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
          distinctio! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quo voluptas id culpa tenetur illo exercitationem similique,
          repellendus dicta recusandae delectus quae ex labore, consectetur
          eveniet omnis facilis voluptatibus? Deserunt saepe cum fugiat enim,
          explicabo quos assumenda cumque rerum beatae facere.
        </p>
      </div>
      <div className={classes.contacts}>
        <h4 className={classes.title}>Contacts</h4>
        <div className={classes.column}>
          <div className={classes.number}>+92 1234567890</div>
          <div className={classes.email}>{email}</div>

          <div className={classes.address}>
            Street 2, house #05, Motarway Route Road
          </div>
        </div>
      </div>
      <button className={classes.btn} onClick={onHandlerLogOut}>
        Log out
      </button>
    </div>
  )
}
