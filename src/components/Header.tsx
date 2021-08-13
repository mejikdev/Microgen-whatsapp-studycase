import { makeStyles } from "@material-ui/core/styles"
import React from "react"

const useStyles = makeStyles({
  parentHeader: {
    display: "flex",
    justifyContent: "start",
    padding: "20px 15px",
    backgroundColor: "#075E55",
    color: "#FFFFFF",
  },
})

type propsType = {
  child: string | React.ReactNode
}

const Header = (props: propsType): JSX.Element => {
  const { child } = props
  const classes = useStyles()
  return <div className={classes.parentHeader}>{child}</div>
}

export default Header
