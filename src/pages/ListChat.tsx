import { Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ChatItem from "components/ChatItem"
import Header from "components/Header"
import SplashScreen from "components/SplashScreen"
import { ChatQuery } from "hooks/useChat"
import React from "react"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles({
  parentHeader: {
    display: "flex",
    justifyContent: "start",
    padding: "20px 15px",
    backgroundColor: "#075E55",
    color: "#FFFFFF",
  },
  startMessage: {
    position: "absolute",
    width: 62,
    height: 62,
    left: 293,
    top: 696,
    backgroundColor: "#46C655",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
})

type propsType = {
  user?: User
}

const Title = (): JSX.Element => {
  return (
    <Typography variant="h6" style={{ fontWeight: "bold" }}>
      WhatsApp
    </Typography>
  )
}

const ListChat = (props: propsType): JSX.Element => {
  const { user } = props
  const classes = useStyles()
  const history = useHistory()
  // !TODO usable variables
  const { data, loading } = ChatQuery({ id: user?.id })

  const handleClick = (id: string) => {
    history.push("/chat?id=" + id)
  }

  if (loading) {
    return <SplashScreen />
  }

  console.log(data)

  return (
    <>
      <Header child={<Title />} />

      <div>
        {/* !TODO title if sender not to user in first */}
        {/* !TODO show avatar */}
        {/* !TODO show unread message */}
        {data?.rooms.map((room) => (
          <ChatItem
            key={room.id}
            id={room.id}
            title={room.chats[0].toUser.firstName}
            subtitle={room.chats[0].message}
            time={room.chats[0].createdAt}
            handleClick={handleClick}
          />
        ))}
      </div>

      <div className={classes.startMessage}>
        <Button>
          <img src={process.env.REACT_APP_FRONTEND_URL + "/icon/sms.svg"} alt="sms icon" />
        </Button>
      </div>
    </>
  )
}

export default ListChat
