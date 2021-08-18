import { Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import smsIconSvg from "assets/icons/sms.svg"
import ChatItem from "components/ChatItem"
import Header from "components/Header"
import LoadingProgress from "components/LoadingProgress"
import { ListChatsQuery } from "hooks/listChat"
import React from "react"

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
  handleOpenChat: (conversationId?: string, recipient?: User) => void
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
  const { user, handleOpenChat } = props
  const { data, loading } = ListChatsQuery(user?.id)
  const classes = useStyles()

  return (
    <>
      <Header child={<Title />} />

      <div>
        {loading ? (
          <LoadingProgress />
        ) : (
          data?.conversations.map((conversation: Conversation) => (
            <ChatItem
              key={conversation.id}
              conversationId={conversation.id}
              userName={conversation.people[0].firstName}
              userMessage={conversation.messages[0].text}
              userAvatar={conversation.people[0].avatar}
              userTime={conversation.messages[0].createdAt}
              recipient={conversation.people[0]}
              handleOpenChat={handleOpenChat}
            />
          ))
        )}
      </div>

      <div className={classes.startMessage}>
        <Button onClick={() => console.log("LISTCONTACT")}>
          <img src={smsIconSvg} alt="sms icon" />
        </Button>
      </div>
    </>
  )
}

export default ListChat
