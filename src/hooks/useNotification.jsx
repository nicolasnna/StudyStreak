import { IconButton } from "@mui/material"
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

  return {
    value,
    handleOpen,
    handleClose,
    action
  }
}

export default useNotification