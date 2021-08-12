import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import Slide from "@material-ui/core/Slide"
import { TransitionProps } from "@material-ui/core/transitions"
import React from "react"

const Transition = React.forwardRef(function Transition(props: TransitionProps, ref: React.Ref<unknown>) {
  return <Slide direction="up" ref={ref} {...props} />
})

type propsType = {
  loading?: boolean
  message: string
  action?: () => void
}

const AlertMessage = (props: propsType): JSX.Element => {
  const { message, loading, action } = props
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
          {loading && <CircularProgress size={20} color={"inherit"} style={{ marginRight: 10 }} />}
          <DialogContentText id="alert-dialog-slide-description">{message}</DialogContentText>
        </div>
      </DialogContent>
      {action && (
        <DialogActions>
          <Button onClick={action}>Oke</Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default AlertMessage
