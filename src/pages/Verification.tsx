import { Button, Divider, Grid, TextField, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AlertMessage from "components/modal/AlertMessage"
import Title from "components/Title"
import { AuthMutation } from "hooks/auth"
import { setCookie } from "nookies"
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
    padding: "15px 20px 0",
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
})

interface IFormInput {
  code: number
}

const initialValue = {
  code: "",
}

// !TODO input style
const Verifcation: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const { verify } = AuthMutation()
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState<any>(false)
  const phoneNumber = localStorage.getItem("phoneNumber")
  const { register, reset, handleSubmit } = useForm<IFormInput>()

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
        setCookie(null, "token", res?.data?.verifyLoginWithPhone.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        })
        history.push("/")
      })
      .catch((err: Error) => {
        reset()
        setLoading(false)
        if (err?.message?.includes("Invalid verification code")) {
          setFailed({ message: "Invalid verification code" })
        } else {
          setFailed(true)
        }
      })
  }

  if (loading) {
    return <AlertMessage message="Verifying ..." />
  }

  if (failed) {
    return <AlertMessage message={failed?.message || "Something Wrong!"} action={() => setFailed(false)} />
  }

  const Description = (): JSX.Element => {
    return (
      <div>
        Waiting to automatically detect as SMS sent to {phoneNumber}. <Link to="/public">Wrong number ?</Link>
      </div>
    )
  }

  return (
    <>
      <Title title="Verify your phone number" description={Description()} />
      {/* !TODO input style */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container className={classes.inputSection}>
          <Grid item xs={6}>
            <TextField
              id="standard-select-currency-native"
              helperText={
                <Typography variant="caption" style={{ textAlign: "center" }} display="block">
                  Enter 6 digit code
                </Typography>
              }
              type="number"
              fullWidth
              {...register("code")}
            />
          </Grid>
        </Grid>

        <div className={classes.resendGroup}>
          <div className={classes.resend}>
            <img
              src={process.env.REACT_APP_FRONTEND_URL + "/icon/smsIcon.png"}
              alt="sms icon"
              className={classes.iconSms}
            />
            <Typography variant="body1">Resend SMS</Typography>
          </div>
          <div>
            <Typography variant="subtitle1">1.00</Typography>
          </div>
        </div>

        <Divider style={{ margin: "0px 20px", color: "red" }} />

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
