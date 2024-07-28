import { Alert, IconButton, Snackbar } from "@mui/material"
import { Fragment, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";

const useNotification = () => {
  const [value, setValue] = useState(false)
  const state = useSelector(state => state.notification)

  const handleOpen = () => {
    setValue(true)
  }

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setValue(false)
  }

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small"/>
      </IconButton>
      
    </Fragment>
  )

  const component = () => {
    return (
      <Snackbar
        open={value}
        autoHideDuration={3500}
        onClose={handleClose}
        action={action}
      >
        <Alert
          onClose={handleClose}
          severity={state.severity}
          color={state.color}
          sx={{width:"100%"}}
        >
          {state.label}
        </Alert>
      </Snackbar>
    )
  }

  return {
    value,
    handleOpen,
    handleClose,
    action,
    component
  }
}

export default useNotification