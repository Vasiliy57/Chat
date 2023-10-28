import { useAppDispatch, useAppSelector } from '@shared/hooks'
import classes from './style.module.css'
import img from './user-img.jpg'
import { logOut } from '@shared/store/profile/profileSlice'
export const Profile: React.FC = () => {
  const { userName, email } = useAppSelector(
    (state) => state.ProfileReducer.user
  )
  const dispatch = useAppDispatch()
  const onHandlerBtn = () => {
    dispatch(logOut())
  }
  return (
    <div className={classes.profile}>
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
      <button className={classes.btn} onClick={onHandlerBtn}>
        Log out
      </button>
    </div>
  )
}
