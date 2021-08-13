import { Button, IconButton, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto"
import AlertMessage from "components/modal/AlertMessage"
import Title from "components/Title"
import { UserMutation } from "hooks/user"
import React from "react"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles({
  inputImage: {
    display: "flex",
    justifyContent: "center",
    padding: "20px 0px",
  },
  inputText: {
    padding: "5px 35px",
  },
  footer: {
    position: "absolute",
    bottom: 80,
    margin: "0px auto",
    left: 145,
  },
})

interface IFormInput {
  name: string
  photo?: string
}

type propsType = {
  user?: User
}

const Profile = (props: propsType): JSX.Element => {
  const { user } = props
  const classes = useStyles()
  const { changeProfile } = UserMutation()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true)
    const { name } = data
    console.log(name)
    changeProfile({
      variables: {
        firstName: name,
      },
    })
      .then(() => {
        history.push("/")
        setLoading(false)
      })
      // !TODO condition error message
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    if (user?.firstName) {
      history.push("/")
    }
  }, [user?.firstName, history])

  if (loading) {
    return <AlertMessage loading={true} message="Saving profile ..." />
  }

  return (
    <div>
      <Title title={"Profile info"} description={"Please profide your name and an optional profile photo"} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={classes.inputImage}>
            <IconButton size="medium">
              <AddAPhotoIcon fontSize={"large"} />
            </IconButton>
          </div>
          <div className={classes.inputText}>
            <TextField id="time" type="text" fullWidth {...register("name")} />
          </div>
        </div>

        <div className={classes.footer}>
          <Button
            type="submit"
            variant="contained"
            disableElevation
            style={{ background: "#46C655", color: "#FFFFFF" }}
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Profile
