import Chat from "pages/chat/Chat"
import ListChat from "pages/chat/ListChat"
import ListContact from "pages/chat/ListContact"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

type propsType = {
  user?: User
}

const Home = (props: propsType): JSX.Element => {
  const { user } = props
  const history = useHistory()
  const [mode, setMode] = useState("LISTCHAT")
  const [dataChat, setDataChat] = useState<{ conversationId?: string; recipient?: User }>()

  useEffect(() => {
    if (!user?.firstName) {
      history.push("/setProfile")
    }
  }, [user, history])

  const handleOpenChat = (conversationId?: string, recipient?: User) => {
    setMode("CHAT")
    setDataChat({
      conversationId,
      recipient,
    })
  }
  const handleOpenContact = () => {
    setMode("LISTCONTACT")
  }

  const handleBack = () => {
    setMode("LISTCHAT")
    setDataChat({})
  }

  // ===== render =========

  if (mode === "LISTCONTACT") {
    return <ListContact user={user} handleOpenChat={handleOpenChat} handleBack={handleBack} />
  }

  if (mode === "CHAT") {
    return <Chat user={user} dataChat={dataChat} handleBack={handleBack} />
  }

  return <ListChat user={user} handleOpenChat={handleOpenChat} handleOpenContact={handleOpenContact} />
}

export default Home
