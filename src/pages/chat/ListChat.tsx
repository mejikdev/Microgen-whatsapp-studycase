import { Box, Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import smsIconSvg from "assets/icons/sms.svg"
import ChatItem from "components/ChatItem"
import Header from "components/Header"
import LoadingProgress from "components/LoadingProgress"
import { useConversationQuery } from "hooks/conversation"
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
  const { data, loading } = useConversationQuery({
    variables: {
      userId: user?.id,
    },
  })
  const classes = useStyles()

  return (
    <>
      <Header child={<Title />} />

      <Box>
        {loading ? (
          <LoadingProgress />
        ) : (
          data?.conversations.map((conversation: Conversation) => {
            const { people, messages } = conversation
            const recipient = people[0]

            let lastMassage: Message = {
              id: "default Message",
              text: "",
              createdAt: new Date().toString(),
              recipient: recipient,
              createdBy: recipient,
            }

            if (Array.isArray(messages) && messages.length) {
              lastMassage = messages[0]
            }

            return (
              <ChatItem
                key={conversation.id}
                conversationId={conversation.id}
                userName={recipient.firstName}
                userMessage={lastMassage.text}
                userAvatar={recipient.avatar}
                userTime={lastMassage.createdAt}
                recipient={recipient}
                handleOpenChat={handleOpenChat}
              />
            )
          })
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
