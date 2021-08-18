import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import moment from "moment"
import React from "react"
import { GREY, LIGHT_GREEN_SECOND, WHITE } from "utils/colors"

const useStyles = makeStyles({
  profileImage: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginLeft: "-5%",
  },
  userName: {
    fontSize: 16,
    marginTop: 6,
  },
  userMessage: {
    fontSize: 14,
    color: GREY,
    marginTop: -8,
    width: 280,
    alignSelf: "flex-start",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    fontFamily: "Roboto",
  },
  userTime: {
    fontSize: 12,
    marginTop: 6,
    color: GREY,
    alignSelf: "flex-end",
  },
  avatarStyle: {
    fontSize: 8,
    width: 10,
    height: 10,
    marginTop: 6,
    display: "flex",
    padding: 6,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: LIGHT_GREEN_SECOND,
  },
  emptyAvatarStyle: {
    fontSize: 8,
    width: 10,
    height: 10,
    marginTop: 6,
    display: "flex",
    padding: 6,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: WHITE,
  },
  textMsgCount: {
    fontSize: 10,
    color: WHITE,
    fontWeight: "bold",
    justifyContent: "center",
    alignSelf: "center",
  },
})

type ChatItemProps = {
  userName: string
  userAvatar?: string
  userMessage?: string
  userTime?: string
  unreadMessage?: number
  recipient?: User
  conversationId?: string
  handleOpenChat: (conversationId?: string, recipient?: User) => void
}

const ChatItem = (props: ChatItemProps): JSX.Element => {
  const { userName, userAvatar, userMessage, userTime, unreadMessage, recipient, conversationId, handleOpenChat } =
    props
  const classes = useStyles()
  return (
    <Box style={{ cursor: "pointer" }}>
      <ListItem
        alignItems="flex-start"
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          marginTop: "-1%",
        }}
        onClick={() => handleOpenChat(conversationId, recipient)}
      >
        <ListItemAvatar style={{ flex: 0.15, marginLeft: "-1%" }}>
          <Avatar alt={userName} src={userAvatar} className={classes.profileImage} />
        </ListItemAvatar>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 0.7,
          }}
        >
          <ListItemText primary={<Typography className={classes.userName}>{userName}</Typography>} />
          {userMessage && (
            <ListItemText secondary={<Typography className={classes.userMessage}>{userMessage}</Typography>} />
          )}
        </Box>
        <ListItemText
          style={{
            display: "flex",
            flex: 0.15,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            flexDirection: "column",
          }}
          primary={userTime && <Typography className={classes.userTime}>{moment(userTime).format("hh:mm")}</Typography>}
          secondary={
            unreadMessage && (
              <Avatar className={unreadMessage >= 0 ? classes.avatarStyle : classes.emptyAvatarStyle}>
                <Typography className={classes.textMsgCount}>{unreadMessage}</Typography>
              </Avatar>
            )
          }
        />
      </ListItem>
    </Box>
  )
}

export default ChatItem
