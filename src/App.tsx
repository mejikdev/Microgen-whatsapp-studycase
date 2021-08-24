import Box from "@material-ui/core/Box"
import CssBaseline from "@material-ui/core/CssBaseline"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React from "react"
import { WHITE } from "utils/colors"

import ApolloProvider from "./ApolloProvider"
import Routes from "./Routes"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "0px auto",
      backgroundColor: WHITE,
      position: "relative",
      maxWidth: "480px",
      width: "100%",
      boxSizing: "border-box",
      [theme.breakpoints.up("md")]: {
        height: "100vh",
        minHeight: "calc(100vh - 60px)",
      },
      [theme.breakpoints.down("sm")]: {
        height: "90vh",
        minHeight: "calc(90vh - 60px)",
      },
      "@global": {
        fontFamily: "roboto",
      },
    },
  }),
)

const App: React.FC = () => {
  const classes = useStyles()
  return (
    <Box bgcolor={"#E5E5E5"} height={"100%"}>
      <CssBaseline />
      <Box className={classes.root}>
        <ApolloProvider>
          <Routes />
        </ApolloProvider>
      </Box>
    </Box>
  )
}

export default App
