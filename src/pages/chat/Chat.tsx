import { Avatar, IconButton, TextareaAutosize, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import BgWa from "assets/images/bgWA.png"
import Header from "components/Header"
import React from "react"
import { FONT_INPUT, GREY_BG_INPUT, LIGHT_GREEN, WHITE } from "utils/colors"

type propsType = {
  user?: User
  dataChat: any
}

const useStyles = makeStyles({
  parentView: {
    width: "100%",
    height: "8%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: "1%",
    borderRadius: 0,
    marginLeft: 0.05,
  },
  profileIcon: {
    alignSelf: "center",
    justifySelf: "center",
    height: 32,
    width: 32,
  },
  userName: {
    fontSize: 20,
    color: WHITE,
    fontWeight: 500,
    paddingLeft: 24,
  },
  parentInput: {
    backgroundColor: GREY_BG_INPUT,
    display: "flex",
    flex: 1,
    width: "100%",
    flexDirection: "row",
  },
  userMessage: {
    fontSize: 16,
    flex: 0.9,
    color: FONT_INPUT,
    justifyContent: "center",
    alignSelf: "center",
    textAlignVertical: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 10,
    maxHeight: 120,
    resize: "vertical",
    backgroundColor: WHITE,
    borderRadius: 20,
    borderColor: GREY_BG_INPUT,
    outline: "none",
  },
})

const Title = ({ recipient }: any): JSX.Element => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.parentView}>
        <div style={{ display: "flex", alignSelf: "center", paddingRight: 10 }}>
          <IconButton onClick={() => console.log("/")} style={{ padding: 0 }}>
            <ArrowBackIcon fontSize="medium" style={{ color: WHITE }} />
          </IconButton>
        </div>
        <div
          style={{
            width: "5%",
            alignSelf: "center",
          }}
        >
          <Avatar src={recipient?.avatar} className={classes.profileIcon} alt={recipient?.firstName} />
        </div>
        <div
          style={{
            display: "flex",
            width: "76%",
            flexDirection: "column",
            alignSelf: "center",
          }}
        >
          <Typography className={classes.userName}>{recipient?.firstName}</Typography>
        </div>
      </div>
    </>
  )
}

const Chat = (props: propsType): JSX.Element => {
  const { user, dataChat } = props
  const classes = useStyles()

  console.log(dataChat)

  return (
    <>
      <Header child={<Title recipient={dataChat?.recipient} />} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          background: "url(" + BgWa + ")",
          height: "92%",
        }}
      >
        <div
          style={{
            backgroundColor: "#E4DDD6",
            height: "100%",
            zIndex: 100,
            opacity: "0.95",
          }}
        />

        <div
          style={{
            position: "absolute",
            zIndex: 1000,
            height: "92%",
            width: "70%",
          }}
        >
          <p>tes</p>
        </div>

        <div
          //   ref={inputRef}
          style={{
            zIndex: 2000,
            width: "100%",
            marginBottom: 0,
            resize: "vertical",
            bottom: 0,
            maxHeight: 160,
            minHeight: 60,
            overflow: "hidden",
          }}
        >
          <div className={classes.parentInput}>
            <TextareaAutosize className={classes.userMessage} placeholder="Type a message ..." />
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat
