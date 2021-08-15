import { Button as ButtonMui } from "@material-ui/core"
import React from "react"

type propsType = {
  title: string
}

const Button = (props: propsType): JSX.Element => {
  const { title } = props
  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        margin: "0px auto",
        left: 0,
        right: 0,
        textAlign: "center",
      }}
    >
      <ButtonMui type="submit" variant="contained" disableElevation style={{ background: "#46C655", color: "#FFFFFF" }}>
        {title}
      </ButtonMui>
    </div>
  )
}

export default Button
