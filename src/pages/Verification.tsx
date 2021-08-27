import { Button, Divider, Grid, TextField, Typography } from "@material-ui/core"
import Box from "@material-ui/core/Box"
import { makeStyles } from "@material-ui/core/styles"
import smsIcon from "assets/icons/smsIcon.png"
import axios from "axios"
import ButtonCustom from "components/Button"
import AlertMessage from "components/modal/AlertMessage"
import SpanError from "components/SpanError"
import Title from "components/Title"
import { AuthMutation } from "hooks/auth"
import { destroyCookie, parseCookies, setCookie } from "nookies"
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link, useHistory } from "react-router-dom"

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
  resendGroup: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 45px 0",
  },
  resend: {
    display: "flex",
  },
  iconSms: {
    height: 20,
    width: 20,
    marginRight: 5,
    alignSelf: "center",
  },
  descriptionText: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 12,
    textAlign: "center",
    color: "#000000",
  },
})

interface IFormInput {
  code: number
}

type propsDescriptionFakeOTp = {
  code: string
}

type propsDescription = {
  phoneNumber: string
}

const Description = (props: propsDescription): JSX.Element => {
  const classes = useStyles()
  return (
    <Box>
      <Typography className={classes.descriptionText}>
        Waiting to automatically detect as SMS sent to <br /> {props?.phoneNumber}.{" "}
        <Link to="/public" style={{ textDecoration: "none", color: "blue" }}>
          Wrong number ?
        </Link>
      </Typography>
    </Box>
  )
}

const DescriptionFakeOtp = (props: propsDescriptionFakeOTp): JSX.Element => {
  const classes = useStyles()
  return (
    <Box>
      <Typography className={classes.descriptionText}>
        Your OTP is <b>{props?.code} </b> (This is for demo purpose only, set your twilio key in order to work on
        production env)
      </Typography>
      <Link to="/public" style={{ textDecoration: "none", color: "blue" }}>
        Wrong number ?
      </Link>
    </Box>
  )
}

const Verifcation: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const { login } = AuthMutation()
  const [loading, setLoading] = useState(false)
  const [loadingResend, setLoadingResend] = useState(false)
  const [seconds, setSeconds] = React.useState(60)
  const [failed, setFailed] = useState<any>(false)
  const {
    register,
    reset: resetForm,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()
  const cookies = parseCookies()
  const { phoneNumber, fakeOtp } = cookies

  useEffect(() => {
    if (!phoneNumber) {
      history.push("/public")
    }
  }, [phoneNumber, history])

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000)
    }
  }, [seconds])

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!data?.code) return null
    setLoading(true)
    await axios
      .post(process.env.REACT_APP_API_URL + "/function/otp/verifyLoginWithPhone", {
        phoneNumber,
        code: data.code,
      })
      .then((res) => {
        console.log(res)
        resetForm()
        setLoading(false)
        setCookie(null, "token", res?.data?.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        })
        if (res?.data?.user?.firstName) {
          window.location.href = "/"
        } else {
          window.location.href = "/setProfile"
        }
        destroyCookie(null, "phoneNumber")
        destroyCookie(null, "fakeOtp")
      })
      .catch((err) => {
        console.log("err", err)
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
    return <AlertMessage open={true} message="Verifying ..." />
  }

  if (loadingResend) {
    return <AlertMessage open={true} message="Sending ..." />
  }

  if (failed) {
    return <AlertMessage open={true} message={failed?.message || "Something Wrong!"} action={() => setFailed(false)} />
  }

  const handleResendCode = async () => {
    setLoadingResend(true)
    login({
      variables: {
        phoneNumber: phoneNumber,
      },
    })
      .then(() => {
        setLoadingResend(false)
      })
      .catch((err) => {
        console.log(err)
        setLoadingResend(false)
        setFailed(true)
      })
  }

  return (
    <>
      <Title
        title="Verify your phone number"
        description={fakeOtp ? <DescriptionFakeOtp code={fakeOtp} /> : <Description phoneNumber={phoneNumber} />}
      />
      {/* !TODO input style */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container className={classes.inputSection}>
          <Grid item xs={6}>
            <TextField
              id="standard-select-currency-native"
              helperText={
                errors.code ? (
                  <SpanError title="Please input verification code!" />
                ) : (
                  <Typography variant="caption" style={{ textAlign: "center" }} display="block">
                    Enter 6 digit code
                  </Typography>
                )
              }
              type="number"
              fullWidth
              {...register("code", { required: true })}
            />
          </Grid>
        </Grid>

        {!fakeOtp && (
          <>
            <Box className={classes.resendGroup}>
              <Button className={classes.resend} onClick={() => handleResendCode()} disabled={Boolean(seconds)}>
                <img src={smsIcon} alt="sms icon" className={classes.iconSms} />
                <Typography variant="subtitle2">Resend SMS</Typography>
              </Button>
              <Box>
                <Typography variant="subtitle1">{seconds}</Typography>
              </Box>
            </Box>

            <Divider style={{ margin: "0px 45px", color: "red" }} />
          </>
        )}

        <ButtonCustom title="Verify" />
      </form>
    </>
  )
}

export default Verifcation
