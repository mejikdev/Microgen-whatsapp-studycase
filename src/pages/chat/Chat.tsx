import { Avatar, Box, IconButton, TextareaAutosize, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import SendIcon from "@material-ui/icons/Send"
import BgWa from "assets/images/bgWA.png"
import ChatTextLeft from "components/ChatTextLeft"
import ChatTextRight from "components/ChatTextRight"
import Header from "components/Header"
import LoadingProgress from "components/LoadingProgress"
import { ChatMutation, ChatsQuery, ChatSubcription } from "hooks/chats"
import React from "react"
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

type Inputs = {
  text: string
}

const useStyles = makeStyles({
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
    paddingLeft: 24,
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

const Chat = (props: ChatProps): JSX.Element => {
  const { user, dataChat, handleBack } = props
  const classes = useStyles()
  const { register, reset, handleSubmit } = useForm<Inputs>()
  const { data, loading } = ChatsQuery({
    variables: {
      conversationId: dataChat?.conversationId,
    },
  })
  const { sendChat } = ChatMutation()
  const { data: sub } = ChatSubcription({
    variables: {
      conversationId: dataChat?.conversationId,
    },
    onSubscriptionData: ({ subscriptionData }) => {
      console.log("s", subscriptionData.data.messageAdded)
    },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { text } = data
    if (!dataChat?.recipient) return null
    sendChat({
      variables: {
        text,
        recipientId: dataChat?.recipient.id,
      },
    })
      .then((res) => {
        console.log(res)
        reset()
      })
      .catch((err) => {
        console.log(err)
        reset()
      })
  }

  return (
    <>
      <Header child={<Title recipient={dataChat?.recipient} handleBack={handleBack} />} />

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

        <Box
          style={{
            position: "absolute",
            zIndex: 1000,
            height: "92%",
            width: "100%",
            paddingTop: 20,
          }}
        >
          {loading ? (
            <LoadingProgress />
          ) : (
            data?.conversation?.messages.map((m, i) => {
              if (m.createdBy.id === user?.id) {
                return <ChatTextRight message={m.text} createdAt={m.createdAt} />
              } else {
                return <ChatTextLeft message={m.text} createdAt={m.createdAt} />
              }
            })
          )}
        </Box>

        <Box
          //   ref={inputRef}
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
                {...register("text", { required: true })}
              />
              <IconButton type="submit">
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
