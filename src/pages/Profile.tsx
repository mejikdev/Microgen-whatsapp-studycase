import { Box, IconButton, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto"
import ButtonCustom from "components/Button"
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
    padding: "20px 0px 0px",
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

type ProfileProps = {
  user?: User
}

const Profile = (props: ProfileProps): JSX.Element => {
  const { user } = props
  const classes = useStyles()
  const { changeProfile } = UserMutation()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [fileInput, setFileInput] = useState<any>()
  const [fileUrl, setFileUrl] = useState<string>("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  useEffect(() => {
    if (user?.firstName) {
      history.push("/")
    }
  }, [user?.firstName, history])

  if (loading) {
    return <AlertMessage open={true} loading={true} message="Saving profile ..." />
  }

  // !TODO condition error message
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true)
    const { name } = data
    changeProfile({
      variables: {
        firstName: name,
        avatar: fileInput !== 0 ? fileInput : "",
      },
    })
      .then(() => {
        window.location.href = "/"
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const changePhoto = async (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files !== null) {
      const file = e.currentTarget.files[0]
      setFileInput(file)
      const url = URL.createObjectURL(e.currentTarget.files[0])
      setFileUrl(url)
    }
  }

  return (
    <Box>
      <Title title={"Profile info"} description={"Please profide your name and an optional profile photo"} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Box className={classes.inputImage}>
            <input
              accept="image/*"
              type="file"
              onChange={(e) => changePhoto(e)}
              style={{ display: "none" }}
              id="icon-button-file"
            />
            <IconButton size="medium" style={{ padding: "10px 15px" }}>
              <label htmlFor="icon-button-file">
                {fileUrl ? (
                  <img
                    src={fileUrl}
                    alt=""
                    style={{ width: 80, height: 80, borderRadius: "50%", borderColor: "black" }}
                  />
                ) : (
                  <AddAPhotoIcon fontSize={"large"} />
                )}
              </label>
            </IconButton>
          </Box>
          <Box className={classes.inputText}>
            <TextField id="time" type="text" fullWidth {...register("name", { required: true })} />
            {errors.name && <span style={{ fontSize: 12, color: "red" }}>Please insert a name !</span>}
          </Box>
        </Box>

        <ButtonCustom title="Next" />
      </form>
    </Box>
  )
}

export default Profile
