import { Box, Grid, InputAdornment, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import axios from "axios"
import ButtonCustom from "components/Button"
import AlertMessage from "components/modal/AlertMessage"
import SpanError from "components/SpanError"
import Title from "components/Title"
import { destroyCookie, setCookie } from "nookies"
import React, { useEffect, useState } from "react"
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
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<IFormInput>()
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState<any>(false)

  useEffect(() => {
    destroyCookie(null, "phoneNumber")
    destroyCookie(null, "fakeOtp")
  }, [])

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true)
    const { phoneNumber, phoneCode } = data
    const fullPhoneNumber = (phoneCode || "+62") + phoneNumber
    axios
      .post(process.env.REACT_APP_API_URL + "/function/otp/loginWithPhone", {
        phoneNumber: fullPhoneNumber,
      })
      .then((res) => {
        const code = res?.data?.code
        if (code) {
          setCookie(null, "fakeOtp", code, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          })
        }
        setCookie(null, "phoneNumber", fullPhoneNumber, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        })
        setLoading(false)
        resetForm()
        history.push("/verification")
      })
      .catch((err) => {
        console.log("error", err)
        if (err?.response.status === 400) {
          setFailed({ message: err?.response?.data?.message || "Something Wrong!" })
        } else {
          setFailed(true)
        }
        setLoading(false)
        resetForm()
      })
  }

  if (loading) {
    return <AlertMessage open={true} loading={true} message="Connecting ..." />
  }

  if (failed) {
    return <AlertMessage open={true} message={failed?.message || "Something Wrong!"} action={() => setFailed(false)} />
  }

  return (
    <Box>
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
    </Box>
  )
}

export default Login
