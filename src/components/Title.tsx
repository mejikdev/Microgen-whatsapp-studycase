import { Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { DARK_GREEN } from "utils/colors"

type TitleProps = {
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

const Title = (props: TitleProps): JSX.Element => {
  const { title, description } = props
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Typography variant="h6" align="center" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body1" align="center" className={classes.description}>
        {description}
      </Typography>
    </Box>
  )
}

export default Title
