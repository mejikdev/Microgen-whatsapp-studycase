import { Box, Button, IconButton, Menu, MenuItem, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import smsIconSvg from "assets/icons/sms.svg"
import ChatItem from "components/ChatItem"
import Header from "components/Header"
import LoadingProgress from "components/LoadingProgress"
import { useConversationQuery, useConversationSubcription } from "hooks/conversation"
import { destroyCookie } from "nookies"
import React, { useEffect } from "react"

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    destroyCookie(null, "token")
    window.location.href = "/public"
  }

  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      <Typography variant="h6" style={{ fontWeight: "bold" }}>
        WhatsApp
      </Typography>
      <IconButton size="small" style={{ color: "white" }} onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu id="long-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        <MenuItem key={"Logout"} onClick={handleClose}>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

/* !TODO show unread message */
const ListChat = (props: ListChatProps): JSX.Element => {
  const { user, handleOpenChat, handleOpenContact } = props
  const classes = useStyles()
  const { data, loading } = useConversationQuery({
    variables: {
      userId: user?.id,
    },
  })
  const { data: sub } = useConversationSubcription({
    variables: {
      userId: user?.id,
    },
  })

  useEffect(() => {
    if (sub?.conversationAdded) {
      console.log("sub")
    }
  }, [sub?.conversationAdded])

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
                userMessage={lastMassage.text || "FILE"}
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
