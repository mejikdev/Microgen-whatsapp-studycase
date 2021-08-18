import { Grid, InputAdornment, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ButtonCustom from "components/Button"
import AlertMessage from "components/modal/AlertMessage"
import SpanError from "components/SpanError"
import Title from "components/Title"
import { AuthMutation } from "hooks/auth"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"

const countries = [
  {
    id: 1,
    name: "Indonesia",
  },
]

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
  country: string
  phoneCode: string
  phoneNumber: number
}

const Login: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const { login } = AuthMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>()
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true)
    const { phoneNumber, phoneCode } = data
    const fullPhoneNumber = (phoneCode || "+62") + phoneNumber
    await login({
      variables: {
        phoneNumber: fullPhoneNumber,
      },
    })
      .then(() => {
        setLoading(false)
        localStorage.setItem("phoneNumber", fullPhoneNumber)
        reset()
        history.push("/verification")
      })
      .catch((err) => {
        setLoading(false)
        setFailed(true)
        reset()
      })
  }

  if (loading) {
    return <AlertMessage loading={true} message="Connecting ..." />
  }

  if (failed) {
    return <AlertMessage message="Something Wrong!" action={() => setFailed(false)} />
  }

  return (
    <div>
      <Title
        title={"Enter your phone number"}
        description={"WhatsApp will send an SMS message to verify your phone number"}
      />
      {/* !TODO input style */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container className={classes.inputSection}>
          <Grid item xs={8}>
            <TextField
              id="standard-select-currency-native"
              select
              SelectProps={{
                native: true,
              }}
              fullWidth
              disabled={true}
              defaultValue="Indonesia"
              {...register("country")}
            >
              {countries.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Grid container className={classes.inputSection}>
          <Grid item xs={2} style={{ marginRight: "20px" }}>
            <TextField
              id="standard-start-adornment"
              fullWidth
              disabled={true}
              InputProps={{
                startAdornment: <InputAdornment position="start">+</InputAdornment>,
              }}
              defaultValue="62"
              {...register("phoneCode")}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="standard-select-currency-native"
              type="number"
              fullWidth
              {...register("phoneNumber", { required: true })}
            />
            {errors.phoneNumber && <SpanError title="Please enter your phone number!" />}
          </Grid>
        </Grid>
        <ButtonCustom title="Next" />
      </form>
    </div>
  )
}

export default Login
