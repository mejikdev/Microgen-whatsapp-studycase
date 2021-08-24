import { Avatar, Box, IconButton, TextareaAutosize, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import AttachFileIcon from "@material-ui/icons/AttachFile"
import DeleteIcon from "@material-ui/icons/Delete"
import SendIcon from "@material-ui/icons/Send"
import BgWa from "assets/images/bgWA.png"
import Header from "components/Header"
import LoadingProgress from "components/LoadingProgress"
import MessageTextLeft from "components/MessageTextLeft"
import MessageTextRight from "components/MessageTextRight"
import { ChatMutation, ChatsQuery, ChatSubcription } from "hooks/chats"
import React, { useEffect, useRef, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { FONT_INPUT, GREY_BG_INPUT, WHITE } from "utils/colors"

type ChatProps = {
  user?: User
  dataChat?: {
    conversationId?: string
    recipient?: User
  }
  handleBack: () => void
}

type TitleProps = {
  recipient?: User
  handleBack: () => void
}

type TitleDeletedProps = {
  setIsDeleted: React.Dispatch<React.SetStateAction<string[] | []>>
  isDeleted: string[]
  handleDelete: () => void
}

type Inputs = {
  text: string
}

const useStyles = makeStyles({
  containerListChat: {
    "&::-webkit-scrollbar": {
      width: "0em",
    },
    position: "absolute",
    zIndex: 1000,
    height: "85%",
    width: "100%",
    paddingTop: 20,
    overflow: "auto",
    paddingBottom: 20,
  },
  parentView: {
    width: "100%",
    height: "8%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: "1%",
    borderRadius: 0,
    marginLeft: 0.05,
  },
  profileIcon: {
    alignSelf: "center",
    justifySelf: "center",
    height: 32,
    width: 32,
  },
  userName: {
    fontSize: 20,
    color: WHITE,
    fontWeight: 500,
    paddingLeft: 20,
  },
  parentInput: {
    backgroundColor: GREY_BG_INPUT,
    display: "flex",
    flex: 1,
    width: "100%",
    flexDirection: "row",
    paddingLeft: 10,
  },
  userMessage: {
    fontSize: 16,
    flex: 0.9,
    color: FONT_INPUT,
    justifyContent: "center",
    alignSelf: "center",
    textAlignVertical: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 10,
    maxHeight: 120,
    resize: "vertical",
    backgroundColor: WHITE,
    borderRadius: 20,
    borderColor: GREY_BG_INPUT,
    outline: "none",
  },
})

const Title = (props: TitleProps): JSX.Element => {
  const { recipient, handleBack } = props
  const classes = useStyles()

  return (
    <>
      <Box className={classes.parentView}>
        <Box style={{ display: "flex", alignSelf: "center", paddingRight: 10 }}>
          <IconButton onClick={() => handleBack()} style={{ padding: 0 }}>
            <ArrowBackIcon fontSize="medium" style={{ color: WHITE }} />
          </IconButton>
        </Box>
        <Box
          style={{
            width: "5%",
            alignSelf: "center",
          }}
        >
          <Avatar src={recipient?.avatar} className={classes.profileIcon} alt={recipient?.firstName} />
        </Box>
        <Box
          style={{
            display: "flex",
            width: "76%",
            flexDirection: "column",
            alignSelf: "center",
          }}
        >
          <Typography className={classes.userName}>{recipient?.firstName}</Typography>
        </Box>
      </Box>
    </>
  )
}

const TitleDeleted = (props: TitleDeletedProps): JSX.Element => {
  const classes = useStyles()
  const { isDeleted, setIsDeleted, handleDelete } = props

  return (
    <>
      <Box className={classes.parentView}>
        <Box style={{ display: "flex", alignSelf: "center", paddingRight: 10 }}>
          <IconButton onClick={() => setIsDeleted([])} style={{ padding: 0 }}>
            <ArrowBackIcon fontSize="medium" style={{ color: WHITE }} />
          </IconButton>
        </Box>
        <Box
          style={{
            display: "flex",
            width: "76%",
            flexDirection: "column",
            alignSelf: "center",
          }}
        >
          <Typography className={classes.userName}>{isDeleted?.length}</Typography>
        </Box>
        <Box alignSelf="center">
          <IconButton size="small" onClick={handleDelete}>
            <DeleteIcon fontSize="medium" style={{ color: "white" }} />
          </IconButton>
        </Box>
      </Box>
    </>
  )
}

const Chat = (props: ChatProps): JSX.Element => {
  const { user, dataChat, handleBack } = props
  const classes = useStyles()
  const myRef = useRef<HTMLHeadingElement>(null)
  const { register, reset: resetInput, handleSubmit } = useForm<Inputs>()
  const [messages, setMessages] = useState<Message[]>([])
  const [conversationId, setConversationId] = useState<string>()
  const [isDeleted, setIsDeleted] = useState<string[] | []>([])
  const { data, loading } = ChatsQuery({
    variables: {
      skip: !conversationId,
      conversationId: conversationId,
    },
    fetchPolicy: "network-only",
  })
  const { sendChat, deleteChats } = ChatMutation()
  const { data: sub } = ChatSubcription({
    variables: {
      conversationId: conversationId,
    },
  })

  useEffect(() => {
    if (!conversationId) {
      setConversationId(dataChat?.conversationId || "")
    }
  }, [conversationId, dataChat?.conversationId])

  useEffect(() => {
    if (data?.messages) {
      setMessages(data?.messages)
    }
  }, [data?.messages])

  useEffect(() => {
    function newMessage() {
      if (sub?.messageAdded && sub.messageAdded.recipient?.id === user?.id) {
        const newMessages = [...messages, sub.messageAdded]
        setMessages(newMessages)
      }
    }

    newMessage()
  }, [sub])

  const sendMessage = async (message: Partial<Message>) => {
    if (!dataChat?.recipient) {
      throw new Error("Uknown recipient")
    }
    const { text, file } = message
    const temporaryId = new Date().getTime().toString()
    const newMessages = [...messages]
    newMessages.push({
      id: temporaryId,
      text: text,
      recipient: dataChat?.recipient,
      file: file,
      status: "SENDING",
      createdBy: user,
      createdAt: new Date().toString(),
    })

    setMessages(newMessages)
    resetInput()

    try {
      const res = await sendChat({
        variables: {
          text,
          file,
          recipientId: dataChat?.recipient?.id,
          conversationId: conversationId,
        },
      })

      if (!conversationId) {
        setConversationId(res?.data?.createMessage?.conversation?.id || "")
      }

      const updatedMessages = newMessages.map((message) => {
        if (message.id === temporaryId) {
          message.status = res.data?.createMessage.status
        }
        return message
      })

      setMessages(updatedMessages)
    } catch (e) {
      alert("failed to send message" + e.message)
    }
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { text } = data
    if (!text || !text.trim()) return null
    sendMessage({ text })
  }

  const onSendFile = async (e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget?.files
    if (files && files.length) {
      const [file] = files as any
      await sendMessage({ file })
    }
  }

  // TODO handle error
  const handleDelete = async () => {
    const isDeletedData = isDeleted as string[]
    const newDataMesssage = messages.filter((m) => !isDeletedData.includes(m.id))
    setMessages(newDataMesssage)
    setIsDeleted([])
    deleteChats({
      variables: {
        ids: isDeleted,
      },
    })
  }

  return (
    <>
      <Header
        child={
          isDeleted?.length ? (
            <TitleDeleted isDeleted={isDeleted} setIsDeleted={setIsDeleted} handleDelete={handleDelete} />
          ) : (
            <Title recipient={dataChat?.recipient} handleBack={handleBack} />
          )
        }
      />

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          background: "url(" + BgWa + ")",
          height: "92%",
        }}
      >
        <Box
          style={{
            backgroundColor: "#E4DDD6",
            height: "100%",
            zIndex: 100,
            opacity: "0.95",
          }}
        />

        <Box className={classes.containerListChat}>
          {loading ? (
            <LoadingProgress />
          ) : (
            messages?.map((m, i) => {
              if (!m) return null
              if (m.createdBy?.id === user?.id) {
                return <MessageTextRight key={i} message={m} isDeleted={isDeleted} setIsDeleted={setIsDeleted} />
              } else {
                return <MessageTextLeft key={i} message={m} />
              }
            })
          )}
        </Box>

        <Box
          style={{
            zIndex: 2000,
            width: "100%",
            marginBottom: 0,
            resize: "vertical",
            bottom: 0,
            maxHeight: 160,
            minHeight: 60,
            overflow: "hidden",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className={classes.parentInput}>
              <TextareaAutosize
                className={classes.userMessage}
                placeholder="Type a message ..."
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    onSubmit({ text: e.currentTarget.value })
                  }
                }}
                {...register("text", { required: true })}
              />
              <input type="file" style={{ display: "none" }} id="icon-button-file" onChange={(e) => onSendFile(e)} />
              {/* <IconButton type="submit"> */}
              <Box display="flex" alignSelf="center" paddingRight="5px" paddingLeft="5px" marginTop="7px">
                <label htmlFor="icon-button-file">
                  <AttachFileIcon />
                </label>
              </Box>
              {/* </IconButton> */}
              <IconButton type="submit" size="small" style={{ backgroundColor: "transparent" }}>
                <SendIcon />
              </IconButton>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  )
}

export default Chat
