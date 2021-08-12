import { Button, Grid, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import LoadingConnecting from "components/modal/LoadingConnecting"
import Title from "components/Title"
import { AuthMutation } from "hooks/auth"
import { setCookie } from "nookies"
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles({
  inputSection: {
    display: "flex",
    justifyContent: "center",
    padding: "20px 15px 0px",
  },
  footer: {
    position: "absolute",
    bottom: 80,
    margin: "0px auto",
    left: 145,
  },
})

interface IFormInput {
  code: number
}

// !TODO input style
const Verifcation: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const { verify } = AuthMutation()
  const [loading, setLoading] = useState(false)
  const phoneNumber = localStorage.getItem("phoneNumber")
  const { register, handleSubmit } = useForm<IFormInput>()

  useEffect(() => {
    if (!phoneNumber) {
      history.push("/public")
    }
  }, [phoneNumber, history])

  // !TODO setCookie
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true)
    verify({
      variables: {
        phoneNumber: phoneNumber,
        code: data.code,
      },
    })
      .then((res: any) => {
        setLoading(false)
        setCookie(null, "token", res?.data)
      })
      .catch((err: any) => {
        console.log(err)
        setLoading(false)
      })
  }

  if (loading) {
    return <LoadingConnecting message="Verifying ..." />
  }

  return (
    <>
      <Title
        title="Verify your phone number"
        description={`Waiting to automatically detect as SMS sent to ${phoneNumber}. Wrong number?`}
      />
      {/* !TODO input style */}
      {/* !TODO validation input */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container className={classes.inputSection}>
          <Grid item xs={6}>
            <TextField id="standard-select-currency-native" type="number" fullWidth {...register("code")} />
          </Grid>
        </Grid>

        <div className={classes.footer}>
          <Button
            type="submit"
            variant="contained"
            disableElevation
            style={{ background: "#46C655", color: "#FFFFFF" }}
          >
            Verify
          </Button>
        </div>
      </form>
    </>
  )
}

export default Verifcation
