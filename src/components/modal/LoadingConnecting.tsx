import CircularProgress from "@material-ui/core/CircularProgress"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import Slide from "@material-ui/core/Slide"
import { TransitionProps } from "@material-ui/core/transitions"
import React from "react"

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

type propsType = {
  message: string
}

const LoadingConnecting = (props: propsType): JSX.Element => {
  const { message } = props
  const open = true
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <div style={{ display: "flex" }}>
          <CircularProgress size={20} color={"inherit"} style={{ marginRight: 10 }} />
          <DialogContentText id="alert-dialog-slide-description">{message}</DialogContentText>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoadingConnecting
