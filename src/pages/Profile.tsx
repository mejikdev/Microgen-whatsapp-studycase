import { IconButton, TextField } from "@material-ui/core"
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

type propsType = {
  user?: User
}

const Profile = (props: propsType): JSX.Element => {
  const { user } = props
  const classes = useStyles()
  const { changeProfile } = UserMutation()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [fileInput, setFileInput] = useState<any>({})
  const [fileUrl, setFileUrl] = useState<any>("")
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
    return <AlertMessage loading={true} message="Saving profile ..." />
  }

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true)
    const { name } = data
    changeProfile({
      variables: {
        firstName: name,
        avatar: fileInput,
      },
    })
      .then(() => {
        window.location.href = "/"
        setLoading(false)
      })
      // !TODO condition error message
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
    <div>
      <Title title={"Profile info"} description={"Please profide your name and an optional profile photo"} />

      {/* !TODO upload avatar */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={classes.inputImage}>
            <input
              accept="image/*"
              type="file"
              onChange={(e) => changePhoto(e)}
              style={{ display: "none" }}
              id="icon-button-file"
            />
            <IconButton size="medium">
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
          </div>
          <div className={classes.inputText}>
            <TextField id="time" type="text" fullWidth {...register("name", { required: true })} />
            {errors.name && <span style={{ fontSize: 12, color: "red" }}>Please insert a name !</span>}
          </div>
        </div>

        <ButtonCustom title="Next" />
      </form>
    </div>
  )
}

export default Profile
