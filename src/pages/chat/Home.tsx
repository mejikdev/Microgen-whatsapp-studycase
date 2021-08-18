import Chat from "pages/chat/Chat"
import ListChat from "pages/chat/ListChat"
import ListContact from "pages/chat/ListContact"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

type HomeProps = {
  user?: User
}

const Home = (props: HomeProps): JSX.Element => {
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

  // ===== render =========

  // if (mode === "LISTCONTACT") {
  //   return <ListContact user={user} setMode={setMode} />
  // }

  if (mode === "CHAT") {
    return <Chat user={user} dataChat={dataChat} />
  }

  return <ListChat user={user} handleOpenChat={handleOpenChat} />
}

export default Home
