import { Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import smsIcon from "assets/images/chat.png"
import React from "react"
import { GREY } from "utils/colors"

const useStyles = makeStyles({
  parent: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    display: "flex",
    flex: 1,
    position: "absolute",
    top: 250,
  },
  alertIcon: {
    height: 60,
    width: 60,
    alignSelf: "center",
    justifyContent: "center",
    color: GREY,
    marginBottom: "3%",
  },
})

const EmptyChat = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Box className={classes.parent}>
      <img alt={"Chat"} className={classes.alertIcon} src={smsIcon} />
      <Typography style={{ fontSize: 16, color: GREY, marginTop: 5 }}>No chats, contacts or messages found</Typography>
    </Box>
  )
}

export default EmptyChat
