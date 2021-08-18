import { Card, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
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
    backgroundColor: "#E1FFC7",
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

type propsType = {
  message: string
  createdAt?: string
}

const ChatTextRight = (props: propsType): JSX.Element => {
  const { message, createdAt } = props
  const classes = useStyles()
  return (
    <div className={classes.parentView}>
      <Card className={classes.cardView} variant={"elevation"} elevation={0.9}>
        <Typography className={classes.userMessage}>{message}</Typography>
        <Typography className={classes.userTime}>{moment(createdAt).format("hh:mm")}</Typography>
      </Card>
    </div>
  )
}

export default ChatTextRight
