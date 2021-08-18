import { Box, Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import smsIconSvg from "assets/icons/sms.svg"
import ChatItem from "components/ChatItem"
import Header from "components/Header"
import LoadingProgress from "components/LoadingProgress"
import { ListChatQuery, ListChatsQuery } from "hooks/listChat"
import React from "react"

const useStyles = makeStyles({
  startMessage: {
    position: "absolute",
    width: 62,
    height: 62,
    backgroundColor: "#46C655",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bottom: 50,
    right: 30,
  },
})

type ListChatProps = {
  user?: User
  handleOpenChat: (conversationId?: string, recipient?: User) => void
  handleOpenContact: () => void
}

const Title = (): JSX.Element => {
  return (
    <Typography variant="h6" style={{ fontWeight: "bold" }}>
      WhatsApp
    </Typography>
  )
}

/* !TODO show unread message */
const ListChat = (props: ListChatProps): JSX.Element => {
  const { user, handleOpenChat, handleOpenContact } = props
  const { data, loading } = ListChatsQuery(user?.id)
  const classes = useStyles()

  return (
    <>
      <Header child={<Title />} />

      <Box>
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
      </Box>

      <Box className={classes.startMessage}>
        <Button onClick={() => handleOpenContact()}>
          <img src={smsIconSvg} alt="sms icon" />
        </Button>
      </Box>
    </>
  )
}

export default ListChat
