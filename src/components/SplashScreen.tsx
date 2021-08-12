import { Typography } from "@material-ui/core"
import CssBaseline from "@material-ui/core/CssBaseline"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"

const useStyles = makeStyles({
  root: {
    height: "100vh",
  },
  header: {
    paddingTop: 156,
  },
  waIcon: {
    display: "block",
    margin: "0px auto",
    width: 99.79,
    height: 100,
  },
  footer: {
    marginTop: 396,
    textAlign: "center",
  },
  mgLogo: {
    display: "block",
    margin: "0px auto",
    width: 25,
    height: 28,
    paddingBottom: 5,
  },
  headerTitle: {
    color: "#46C655",
    paddingTop: 20,
  },
  createdBy: {
    color: "#46C655",
  },
})

const SplashScreen = (): JSX.Element => {
  const classes = useStyles()
  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.header}>
          <img
            src={process.env.REACT_APP_FRONTEND_URL + "/icon/waIcon.png"}
            className={classes.waIcon}
            alt="logo whatsapp"
          />
          <Typography variant="h5" align="center" className={classes.headerTitle}>
            Whatsapp Clone
          </Typography>
        </div>
        <div className={classes.footer}>
          <img
            src={process.env.REACT_APP_FRONTEND_URL + "/icon/mgLogo.png"}
            className={classes.mgLogo}
            alt="logo microgen"
          />
          <Typography variant="caption" align="center">
            created with
          </Typography>
          <Typography variant="h6" align="center" className={classes.createdBy}>
            Microgen
          </Typography>
        </div>
      </div>
    </>
  )
}

export default SplashScreen
