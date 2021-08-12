import CssBaseline from "@material-ui/core/CssBaseline"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"

import ApolloProvider from "./ApolloProvider"
import Routes from "./Routes"

const useStyles = makeStyles({
  root: {
    margin: "0px auto",
    // backgroundColor: "#E5E5E5",
    position: "relative",
    maxWidth: "480px",
    width: "100%",
    boxSizing: "border-box",
    height: "100vh",
    minHeight: "calc(100vh - 60px)",
  },
})

const App: React.FC = () => {
  const classes = useStyles()
  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <ApolloProvider>
          <Routes />
        </ApolloProvider>
      </div>
    </>
  )
}

export default App
