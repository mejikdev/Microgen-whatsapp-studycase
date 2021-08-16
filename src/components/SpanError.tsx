import React from "react"

type propsType = {
  title: string
}

const Button = (props: propsType): JSX.Element => {
  const { title } = props
  return <span style={{ fontSize: 12, color: "red" }}>{title}</span>
}

export default Button
