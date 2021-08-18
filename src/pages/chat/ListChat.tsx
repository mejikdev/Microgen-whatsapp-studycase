import { Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import smsIconSvg from "assets/icons/sms.svg"
import ChatItem from "components/ChatItem"
import Header from "components/Header"
import SplashScreen from "components/SplashScreen"
import { ListChatsQuery } from "hooks/listChat"
import React from "react"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles({
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
  setMode: React.Dispatch<React.SetStateAction<string>>
}

const Title = (): JSX.Element => {
  return (
    <Typography variant="h6" style={{ fontWeight: "bold" }}>
      WhatsApp
    </Typography>
  )
}

/* !TODO show unread message */
const ListChat = (props: propsType): JSX.Element => {
  const { user, setMode } = props
  const { data, loading } = ListChatsQuery(user?.id)
  const classes = useStyles()
  const history = useHistory()

  const handleClick = (id: string) => {
    history.push("/chat?roomId=" + id)
  }

  if (loading) {
    return <SplashScreen />
  }

  console.log("data", data)

  return (
    <>
      <Header child={<Title />} />

      <div>
        {data &&
          data?.conversations.map((conversation) => (
            <ChatItem key={conversation.id} userName={"Zainal pdi"} userMessage="afaf" userAvatar="afaf" />
          ))}
      </div>

      <div className={classes.startMessage}>
        <Button onClick={() => setMode("LISTCONTACT")}>
          <img src={smsIconSvg} alt="sms icon" />
        </Button>
      </div>
    </>
  )
}

export default ListChat
