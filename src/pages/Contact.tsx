import { IconButton, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import ChatItem from "components/ChatItem"
import Header from "components/Header"
import React from "react"
import { useHistory } from "react-router-dom"

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
})

type propsType = {
  user?: User
}

const Title = (): JSX.Element => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <>
      <div className={classes.parentView}>
        <div style={{ display: "flex", alignSelf: "center", paddingRight: 10 }}>
          <IconButton onClick={() => history.push("/")} style={{ padding: 0 }}>
            <ArrowBackIcon fontSize="medium" style={{ color: "#FFFFFF" }} />
          </IconButton>
        </div>
        <Typography variant="h6">Pilih kontak</Typography>
      </div>
    </>
  )
}

const Chat = (props: propsType): JSX.Element => {
  const { user } = props
  const classes = useStyles()

  return (
    <>
      <Header child={<Title />} />

      <div>
        <ChatItem
          key={"1"}
          id={"1"}
          title={"Zainal"}
          subtitle={"+628122433038"}
          handleClick={() => console.log("tes")}
        />
      </div>
    </>
  )
}

export default Chat
