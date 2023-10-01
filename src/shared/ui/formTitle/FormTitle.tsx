import classes from './formTitle.module.css'

export const FormTitle = ({ title }: { title: string }): JSX.Element => {
  return (
    <h3 className={classes.title}>
      {title}
    </h3>
  )
}


