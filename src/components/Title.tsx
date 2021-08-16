import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { DARK_GREEN } from "utils/colors"

type propsType = {
  title: string
  description: string | React.ReactNode
}

const useStyles = makeStyles({
  root: {
    padding: "15px 35px 0px",
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 15,
    fontSize: 20,
    color: DARK_GREEN,
  },
  description: {
    fontSize: 12,
  },
})

const Title = (props: propsType): JSX.Element => {
  const { title, description } = props
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant="h6" align="center" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body1" align="center" className={classes.description}>
        {description}
      </Typography>
    </div>
  )
}

export default Title
