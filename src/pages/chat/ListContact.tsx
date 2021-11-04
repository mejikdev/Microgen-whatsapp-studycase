import { Box, IconButton, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import ChatItem from "components/ChatItem"
import Header from "components/Header"
import LoadingProgress from "components/LoadingProgress"
import { ContactQuery } from "hooks/listContact"
import React from "react"

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

type ListContactProps = {
  user?: User
  handleOpenChat: (conversationId?: string, recipient?: User) => void
  handleBack: () => void
}

type titleProps = {
  handleBack: () => void
}

const Title = (props: titleProps): JSX.Element => {
  const { handleBack } = props
  const classes = useStyles()

  return (
    <>
      <Box className={classes.parentView}>
        <Box style={{ display: "flex", alignSelf: "center", paddingRight: 10 }}>
          <IconButton onClick={() => handleBack()} style={{ padding: 0 }}>
            <ArrowBackIcon fontSize="medium" style={{ color: "#FFFFFF" }} />
          </IconButton>
        </Box>
        <Typography variant="h6">Pilih kontak</Typography>
      </Box>
    </>
  )
}

const ListContact = (props: ListContactProps): JSX.Element => {
  const { user, handleOpenChat, handleBack } = props
  const { data, loading } = ContactQuery({
    variables: {
      userId: user?.id,
    },
  })

  return (
    <>
      <Header child={<Title handleBack={handleBack} />} />

      <div>
        {loading ? (
          <LoadingProgress />
        ) : (
          data?.users.map((u) => (
            <ChatItem
              key={u.id}
              userName={u.firstName}
              userMessage={u.phoneNumber}
              userAvatar={u.avatar}
              handleOpenChat={handleOpenChat}
              recipient={u}
              ownerId={user?.id}
            />
          ))
        )}
      </div>
    </>
  )
}

export default ListContact
