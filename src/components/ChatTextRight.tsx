import { Card, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"

const useStyles = makeStyles({
  userMessage: {
    fontSize: 14,
    color: "#222222",
    marginTop: 5,
    alignSelf: "flex-start",
  },
  userTime: {
    fontSize: 11,
    color: "#87888A",
    alignSelf: "flex-end",
    textAlign: "right",
  },
  cardView: {
    backgroundColor: "#FAFAFA",
    paddingTop: 5,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 3,
    marginTop: 2,
    marginBottom: 2,
  },
})

const ChatTextRight = (): JSX.Element => {
  const classes = useStyles()
  return (
    <div>
      <Card className={classes.cardView} variant={"elevation"} elevation={0.9}>
        <Typography className={classes.userMessage}>right</Typography>
        <Typography className={classes.userTime}>21</Typography>
      </Card>
    </div>
  )
}

export default ChatTextRight
