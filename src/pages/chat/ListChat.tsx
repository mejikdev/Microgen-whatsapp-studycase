import { Box, Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import smsIconSvg from "assets/icons/sms.svg"
import ChatItem from "components/ChatItem"
import EmptyChat from "components/EmptyChat"
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
    <Box display="flex" justifyContent="space-between" width="100%">
      <Typography variant="h6" style={{ fontWeight: "bold" }}>
        WhatsApp
      </Typography>
    </Box>
  )
}

const ListChat = (props: ListChatProps): JSX.Element => {
  const { user, handleOpenChat, handleOpenContact } = props
  const classes = useStyles()
  const { data, loading } = useConversationQuery({
    skip: !user?.id,
    variables: {
      userId: user?.id,
    },
  })

  return (
    <>
      <Header child={<Title />} />

      <Box>
        {loading ? (
          <LoadingProgress />
        ) : data?.conversations?.length === 0 ? (
          <EmptyChat />
        ) : (
          data?.conversations.map((conversation: Conversation) => {
            const { people, messages } = conversation

            let recipient = {
              id: "",
              email: "",
              firstName: "User not found",
              role: "",
              avatar: "",
              phoneNumber: "",
            }

            if (Array.isArray(people) && people.length) {
              recipient = people[0]
            }

            let lastMessage: Message = {
              id: "default Message",
              text: "",
              file: "",
              createdAt: new Date().toString(),
              recipient: recipient,
              createdBy: recipient,
            }

            if (Array.isArray(messages) && messages.length) {
              lastMessage = messages[0]
            }

            return (
              <ChatItem
                key={conversation.id}
                conversationId={conversation.id}
                userName={recipient.firstName}
                userMessage={lastMessage.text || (lastMessage?.file && "File")}
                userAvatar={recipient.avatar}
                userTime={lastMessage.createdAt}
                recipient={recipient}
                handleOpenChat={handleOpenChat}
                unreadMessage={conversation.unreadedMessageCount}
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
