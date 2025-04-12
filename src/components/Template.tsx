import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
  template: {
    color: "red"
  }
})

export const Template = () => {
  const classes = useStyles()
  return <div className={classes.template}>template</div>
}