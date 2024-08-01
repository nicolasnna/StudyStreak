import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import PropTypes from 'prop-types'

const ModalDialog = ({
  children = <></>, 
  focusInverseButton = false,
  title = "",
  handleOpen = false, 
  handleClose = () => {}, 
  handleAcept = () => {},
  labelCancelButton = "Cancelar",
  labelAcceptButton = "Aceptar",
  component = '',
  handleSubmit = () => {}
}) => {
  const variantCancel = focusInverseButton ? "contained" : "outlined"
  const variantAccept = focusInverseButton ? "outlined" : "contained"
  const typeButtonAccept = component === 'form' ? 'submit' : 'button'

  return (
    <Dialog
      open={handleOpen}
      onClose={handleClose}
      component={component}
      onSubmit={handleSubmit}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant={variantCancel}>
          {labelCancelButton}
        </Button>
        <Button 
          onClick={handleAcept}  
          variant={variantAccept}
          type={typeButtonAccept}
        >
          {labelAcceptButton}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ModalDialog.propTypes = {
  children: PropTypes.element,
  focusInverseButton: PropTypes.bool,
  title: PropTypes.string,
  handleOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  handleAcept: PropTypes.func,
  labelAcceptButton: PropTypes.string,
  labelCancelButton: PropTypes.string,
  component: PropTypes.string,
  handleSubmit: PropTypes.func
}

export default ModalDialog