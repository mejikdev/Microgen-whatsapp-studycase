import { Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import DoneAllIcon from "@material-ui/icons/DoneAll"
import iconDocument from "assets/icons/doc.png"
import useLongPress from "hooks/useLoongPress"
import moment from "moment"
import React from "react"

const useStyles = makeStyles({
  parentView: {
    paddingRight: "5%",
    paddingLeft: "5%",
    marginBottom: "9px",
    alignItems: "flex-end",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    userSelect: "text",
  },
  wrapper: {
    marginBottom: 0,
    borderRadius: 7.5,
    maxWidth: "75%",
    position: "relative",
    flex: "none",
    fontSize: 14.2,
    //   lineHeight: 19,
    color: "#303030",
    minWidth: 120,
  },
  tailOut: {
    right: -8,
    color: " #dcf8c6",
    position: "absolute",
    top: -2,
    zIndex: 100,
    display: "block",
    width: 8,
    height: 14,
  },
  messageContainer: {
    borderTopRightRadius: 0,
    backgroundColor: "#dcf8c6",
    borderRadius: 7.5,
    position: "relative",
    zIndex: 200,
    cursor: "pointer",
  },
  messageWrapper: {
    padding: "6px 7px 8px 9px",
    boxSizing: "border-box",
    userSelect: "text",
  },
  messageTextWrapper: {
    position: "relative",
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap",
    marginBottom: 10,
    marginRight: 20,
  },
  timeWrapper: {
    float: "right",
    margin: "-10px 0 -5px 4px",
    position: "relative",
    zIndex: 10,
    height: 15,
    fontSize: 11,
    color: "grey",
    whiteSpace: "nowrap",
  },
})

type MessageTextRightProps = {
  message?: Message
  setIsDeleted: React.Dispatch<React.SetStateAction<string[] | []>>
  isDeleted: string[]
}

const MessageTextRight = (props: MessageTextRightProps): JSX.Element => {
  const classes = useStyles()
  const { message, setIsDeleted, isDeleted } = props

  const onLongPress = () => {
    if (isDeleted.includes(message?.id || "")) {
      setIsDeleted(isDeleted.filter((i) => i !== message?.id))
    } else {
      setIsDeleted((prevState) => {
        return [...prevState, message?.id || ""]
      })
    }
  }

  const onClick = () => {
    if (isDeleted.length) {
      if (isDeleted.includes(message?.id || "")) {
        setIsDeleted(isDeleted.filter((i) => i !== message?.id))
      } else {
        setIsDeleted((prevState) => {
          return [...prevState, message?.id || ""]
        })
      }
    }
  }

  const longPressEvent = useLongPress(onLongPress, onClick, { shouldPreventDefault: true, delay: 500 })

  return (
    <>
      <Box
        className={classes.parentView}
        style={isDeleted.includes(message?.id || "") ? { backgroundColor: " rgba(115, 188, 176, 0.4)" } : undefined}
      >
        <Box className={classes.wrapper}>
          <span className={classes.tailOut}>
            <svg viewBox="0 0 8 13" width="8" height="13">
              <path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path>
              <path fill="currentColor" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path>
            </svg>
          </span>
          <Box
            className={classes.messageContainer}
            {...longPressEvent}
            onContextMenu={(e) => {
              e.preventDefault()
            }}
            id="messageContainer"
          >
            <Box className={classes.messageWrapper}>
              {!message?.file ? (
                <Box className={classes.messageTextWrapper}>
                  <Typography variant="inherit" component="span">
                    {message?.text}
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Box bgcolor="#7676801F" display="flex" marginBottom="12px" style={{ padding: "7px 9px" }}>
                    <a href={message?.file} target="_blank" rel="noopener noreferrer">
                      <img src={iconDocument} alt="icon" style={{ marginRight: 5 }} />
                    </a>
                    <Typography component="span" style={{ alignSelf: "center" }}>
                      FILE
                    </Typography>
                  </Box>
                </Box>
              )}

              {message?.status === "SENDING" ? (
                <Box className={classes.timeWrapper}>
                  <span
                    className="kOrB_"
                    dir="auto"
                    style={{
                      display: "inline-block",
                      verticalAlign: "top",
                    }}
                  >
                    sending ...
                  </span>
                </Box>
              ) : (
                <Box className={classes.timeWrapper}>
                  <Box>
                    <span
                      className="kOrB_"
                      dir="auto"
                      style={{
                        display: "inline-block",
                        verticalAlign: "top",
                      }}
                    >
                      {moment(message?.createdAt).format("hh:mm")}
                    </span>
                    <Box
                      className="_2F01v"
                      style={{
                        marginLeft: 3,
                        display: "inline-block",
                      }}
                    >
                      <DoneAllIcon
                        style={
                          message?.status === "READ"
                            ? { fontSize: 14, marginLeft: 5, color: "#3497F9" }
                            : { fontSize: 14, marginLeft: 5 }
                        }
                      />
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default MessageTextRight
