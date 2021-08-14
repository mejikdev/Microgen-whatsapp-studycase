import { Avatar, IconButton, TextareaAutosize, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import ChatTextLeft from "components/ChatTextLeft"
import ChatTextRight from "components/ChatTextRight"
import Header from "components/Header"
import React, { useRef } from "react"
import { useHistory } from "react-router-dom"

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
    color: "#FFFFFF",
    fontWeight: 500,
    paddingLeft: 24,
  },
  parentInput: {
    backgroundColor: "#EDEDED",
    display: "flex",
    flex: 1,
    width: "100%",
    flexDirection: "row",
  },
  userMessage: {
    fontSize: 16,
    flex: 0.9,
    color: "#222222",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderColor: "#EDEDED",
    outline: "none",
  },
})

type propsType = {
  user?: User
}

const Title = (): JSX.Element => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <>
      <div className={classes.parentView}>
        <div style={{ display: "flex", alignSelf: "center", paddingRight: 10 }}>
          <IconButton onClick={() => history.push("/")} style={{ padding: 0 }}>
            <ArrowBackIcon fontSize="medium" style={{ color: "#FFFFFF" }} />
          </IconButton>
        </div>
        <div
          style={{
            width: "5%",
            // marginLeft: "1%",
            alignSelf: "center",
            // marginTop: "0.2%",
          }}
        >
          <Avatar
            src={process.env.REACT_FRONTEND_URL + "/icon/waIcon.png"}
            className={classes.profileIcon}
            alt="Aqil"
          />
        </div>
        <div
          style={{
            display: "flex",
            width: "76%",
            flexDirection: "column",
            // marginLeft: "1%",
            alignSelf: "center",
          }}
        >
          <Typography className={classes.userName}>
            {/* {userType == webConstants.FRIEND ? data.userName : data.chatName} */}
            Aqil
          </Typography>
        </div>
      </div>
    </>
  )
}

const Chat = (props: propsType): JSX.Element => {
  const { user } = props
  const inputRef = useRef()
  const classes = useStyles()

  return (
    <>
      <Header child={<Title />} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          background: "url(" + process.env.REACT_APP_FRONTEND_URL + "/image/bgWA.png" + ")",
          height: "90vh",
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
            height: "90vh",
            width: "100%",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              outline: "none",
              paddingBottom: 80,
              paddingTop: 10,
            }}
          >
            {[1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5].map((a, index) => {
              if (index % 2) {
                return <ChatTextLeft />
              } else {
                return <ChatTextRight />
              }
            })}
          </div>
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
            <TextareaAutosize
              className={classes.userMessage}
              placeholder="Type a message ..."
              //   value={message}
              //   onKeyPress={(e) => handleKeyDown(e)}
              //   onChange={(event) => {
              //     onTyping(event)
              //     setMessage(event.target.value)
              //   }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat
