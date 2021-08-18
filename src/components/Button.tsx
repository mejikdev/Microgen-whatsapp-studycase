import { Box, Button as ButtonMui } from "@material-ui/core"
import React from "react"
import { LIGHT_GREEN, WHITE } from "utils/colors"

type propsType = {
  title: string
  disabled?: boolean
}

const Button = (props: propsType): JSX.Element => {
  const { title, disabled } = props
  return (
    <Box
      style={{
        position: "absolute",
        bottom: 80,
        margin: "0px auto",
        left: 0,
        right: 0,
        textAlign: "center",
      }}
    >
      <ButtonMui
        type="submit"
        variant="contained"
        disableElevation
        style={{ background: LIGHT_GREEN, color: WHITE }}
        disabled={disabled}
      >
        {title}
      </ButtonMui>
    </Box>
  )
}

export default Button
