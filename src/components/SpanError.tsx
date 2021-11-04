import React from "react"

type SpanErrorProps = {
  title: string
}

const SpanError = (props: SpanErrorProps): JSX.Element => {
  const { title } = props
  return <span style={{ fontSize: 12, color: "red" }}>{title}</span>
}

export default SpanError
