import { Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import iconDocument from "assets/icons/doc.png"
import moment from "moment"
import React from "react"

const useStyles = makeStyles({
  parentView: {
    paddingRight: "5%",
    paddingLeft: "5%",
    marginBottom: "9px",
    alignItems: "flex-start",
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
    left: -8,
    color: " #fff",
    position: "absolute",
    top: -2,
    zIndex: 100,
    display: "block",
    width: 8,
    height: 14,
  },
  messageContainer: {
    borderTopLeftRadius: 0,
    backgroundColor: "#fff",
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
  disabledLink: {
    pointerEvents: "none",
    cursor: "default",
  },
})

type MessageTextLeftProps = {
  message?: Message
}

function isImgLink(url: string): boolean {
  if (typeof url !== "string") return false
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null
}

const MessageTextLeft = (props: MessageTextLeftProps): JSX.Element => {
  const classes = useStyles()
  const { message } = props

  return (
    <>
      <Box className={classes.parentView}>
        <Box className={classes.wrapper}>
          <span className={classes.tailOut}>
            <svg viewBox="0 0 8 13" width="8" height="13">
              <path
                opacity=".13"
                fill="#0000000"
                d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"
              ></path>
              <path fill="currentColor" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path>
            </svg>
          </span>
          <Box className={classes.messageContainer} id="messageContainer">
            <Box className={classes.messageWrapper}>
              {!message?.file ? (
                <Box className={classes.messageTextWrapper}>
                  <Typography variant="inherit" component="span">
                    {message?.text}
                  </Typography>
                </Box>
              ) : (
                <Box>
                  {isImgLink(message?.file) ? (
                    <a
                      href={message?.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={message?.status === "SENDING" ? classes.disabledLink : undefined}
                    >
                      <img
                        src={message?.file}
                        alt=""
                        style={{ height: "100%", width: "100%", margin: "5px 8px 12px 0px" }}
                      />
                    </a>
                  ) : (
                    <Box bgcolor="#7676801F" display="flex" marginBottom="12px" style={{ padding: "7px 9px" }}>
                      <a
                        href={message?.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={message?.status === "SENDING" ? classes.disabledLink : undefined}
                      >
                        <img src={iconDocument} alt="icon" style={{ marginRight: 5 }} />
                      </a>
                      <Typography component="span" style={{ alignSelf: "center" }}>
                        FILE
                      </Typography>
                    </Box>
                  )}
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

export default MessageTextLeft
