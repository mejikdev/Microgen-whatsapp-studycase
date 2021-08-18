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

  useEffect(() => {
    if (!user?.firstName) {
      history.push("/setProfile")
    }
  }, [user, history])

  // ===== render =========

  if (mode === "LISTCONTACT") {
    return <ListContact user={user} setMode={setMode} />
  }

  if (mode === "ROOMCHAT") {
    return <p>room chat</p>
  }

  return <ListChat user={user} setMode={setMode} />
}

export default Home
