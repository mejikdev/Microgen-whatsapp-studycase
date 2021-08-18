import { Box, Typography } from "@material-ui/core"
import CssBaseline from "@material-ui/core/CssBaseline"
import { makeStyles } from "@material-ui/core/styles"
import mgLogo from "assets/icons/mgLogo.png"
import waIcon from "assets/icons/waIcon.png"
import React from "react"

const useStyles = makeStyles({
  root: {
    height: "100vh",
  },
  header: {
    paddingTop: 146,
  },
  waIcon: {
    display: "block",
    margin: "0px auto",
    width: 99.79,
    height: 100,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    margin: "0px auto",
    left: 0,
    right: 0,
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
      <Box className={classes.root}>
        <Box className={classes.header}>
          <img src={waIcon} className={classes.waIcon} alt="logo whatsapp" />
          <Typography variant="h5" align="center" className={classes.headerTitle}>
            Whatsapp Clone
          </Typography>
        </Box>
        <Box className={classes.footer}>
          <img src={mgLogo} className={classes.mgLogo} alt="logo microgen" />
          <Typography variant="caption" align="center">
            created with
          </Typography>
          <Typography variant="h6" align="center" className={classes.createdBy}>
            Microgen
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default SplashScreen
