import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import moment from "moment"
import React from "react"

const useStyles = makeStyles({
  parentHeader: {
    display: "flex",
    justifyContent: "start",
    padding: "20px 15px",
    backgroundColor: "#075E55",
    color: "#FFFFFF",
  },
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
    color: "#87888A",
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
    color: "#87888A",
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
    backgroundColor: "#00C854",
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
    backgroundColor: "#FFFFFF",
  },
  textMsgCount: {
    fontSize: 10,
    color: "#FFFFFF",
    fontWeight: "bold",
    justifyContent: "center",
    alignSelf: "center",
  },
})

type propsType = {
  avatar?: string
  title: string
  subtitle?: string | Text
  time?: string
  handleClick: (id: string) => void
  id: string
}

const ChatItem = (props: propsType): JSX.Element => {
  const { avatar, title, subtitle, time, handleClick, id } = props
  const classes = useStyles()
  return (
    <div style={{ cursor: "pointer" }}>
      <ListItem
        alignItems="flex-start"
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          marginTop: "-1%",
        }}
        onClick={() => handleClick(id)}
      >
        <ListItemAvatar style={{ flex: 0.15, marginLeft: "-1%" }}>
          <Avatar alt={title} src={avatar} className={classes.profileImage} />
        </ListItemAvatar>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 0.7,
          }}
        >
          <ListItemText
            primary={
              <Typography className={classes.userName}>
                {/* {userType == webConstants.FRIEND ? data.userName : data.chatName} */}
                {title}
              </Typography>
            }
          />
          {subtitle && (
            <ListItemText
              secondary={
                <Typography className={classes.userMessage}>
                  {/* {data.chatMessage} */}
                  {subtitle}
                </Typography>
              }
            />
          )}
        </div>
        <ListItemText
          style={{
            display: "flex",
            flex: 0.15,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            flexDirection: "column",
          }}
          primary={
            time && (
              <Typography className={classes.userTime}>
                {/* {getTimeInFormat(data.chatTime)} */}
                {moment(time).format("hh:mm")}
              </Typography>
            )
          }
          // secondary={
          //   <Avatar
          //     className={
          //       // item.chatUnreadCount != 0 ? classes.avatarStyle : classes.emptyAvatarStyle
          //       classes.avatarStyle
          //     }
          //   >
          //     <Typography className={classes.textMsgCount}>{/* {item.chatUnreadCount} */}1</Typography>
          //   </Avatar>
          // }
        />
      </ListItem>
    </div>
  )
}

export default ChatItem
