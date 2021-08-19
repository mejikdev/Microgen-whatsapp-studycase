import { Box, Card, Icon, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import DoneAllIcon from "@material-ui/icons/DoneAll"
import iconDocument from "assets/icons/doc.png"
import moment from "moment"
import React from "react"
import { FONT_INPUT, GREY_SECOND } from "utils/colors"

const useStyles = makeStyles({
  parentView: {
    maxWidth: "60%",
    width: "100%",
    right: 0,
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    flexDirection: "row",
    display: "flex",
    marginLeft: "auto",
    marginRight: 10,
  },
  userMessage: {
    fontSize: 14,
    color: FONT_INPUT,
    marginTop: 5,
    alignSelf: "flex-start",
  },
  userTime: {
    fontSize: 11,
    color: GREY_SECOND,
    alignSelf: "flex-end",
    textAlign: "right",
  },
  cardView: {
    backgroundColor: "#DCF7C5",
    paddingTop: 5,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 3,
    marginTop: 2,
    marginBottom: 2,
    minWidth: 100,
    borderRadius: 8,
  },
})

type ChatTextRightProps = {
  message?: string
  createdAt?: string
  file?: string
}

const ChatTextRight = (props: ChatTextRightProps): JSX.Element => {
  const { message, createdAt, file } = props
  const classes = useStyles()
  return (
    <Box className={classes.parentView}>
      <Card className={classes.cardView} variant={"elevation"} elevation={0.9}>
        {message ? (
          <>
            <Typography className={classes.userMessage}>{message}</Typography>
          </>
        ) : (
          file && (
            <>
              <Box bgcolor="#7676801F" padding="5px" display="flex">
                <a href={file}>
                  <img src={iconDocument} alt="icon" style={{ marginRight: 5 }} />
                </a>
                <Typography className={classes.userMessage}>FILE</Typography>
              </Box>
            </>
          )
        )}

        <Box display="flex" textAlign="right" paddingLeft="50px">
          <Typography className={classes.userTime}>{moment(createdAt).format("hh:mm")}</Typography>
          <DoneAllIcon style={{ fontSize: 14, marginLeft: 5 }} />
        </Box>
      </Card>
    </Box>
  )
}

export default ChatTextRight
