import { Box } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"
import React from "react"

const LoadingProgress = (): JSX.Element => {
  return (
    <Box
      style={{
        position: "absolute",
        margin: "150px auto",
        left: 0,
        right: 0,
        textAlign: "center",
      }}
    >
      <CircularProgress style={{ color: "green" }} />
    </Box>
  )
}

export default LoadingProgress
