import { IconButton, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import ChatItem from "components/ChatItem"
import Header from "components/Header"
import LoadingProgress from "components/LoadingProgress"
import { UsersQuery } from "hooks/listContact"
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
  setMode: React.Dispatch<React.SetStateAction<string>>
}

type titleProps = {
  setMode: React.Dispatch<React.SetStateAction<string>>
}

const Title = (props: titleProps): JSX.Element => {
  const { setMode } = props
  const classes = useStyles()
  const history = useHistory()

  return (
    <>
      <div className={classes.parentView}>
        <div style={{ display: "flex", alignSelf: "center", paddingRight: 10 }}>
          <IconButton onClick={() => setMode("LISTCHAT")} style={{ padding: 0 }}>
            <ArrowBackIcon fontSize="medium" style={{ color: "#FFFFFF" }} />
          </IconButton>
        </div>
        <Typography variant="h6">Pilih kontak</Typography>
      </div>
    </>
  )
}

const ListContact = (props: propsType): JSX.Element => {
  const { user, setMode } = props
  const { data, loading } = UsersQuery(user?.id)

  return (
    <>
      <Header child={<Title setMode={setMode} />} />

      {/* <div> */}
      {/* {loading ? (
          <LoadingProgress />
        ) : (
          data?.users.map((u) => (
            // <ChatItem key={u.id} userName={u.firstName} userMessage={u.phoneNumber} userAvatar={u.avatar} />
          ))
        )}
      </div> */}
    </>
  )
}

export default ListContact
