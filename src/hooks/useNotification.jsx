import { Alert, IconButton, Snackbar } from "@mui/material"
import { Fragment, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';

const useNotification = () => {
  const [value, setValue] = useState(false)

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

  const component = ({severity = 'success', label = ''}) => {
    return (
      <Snackbar
        open={value}
        autoHideDuration={3000}
        onClose={handleClose}
        action={action}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{width:"100%"}}
        >
          {label}
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