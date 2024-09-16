import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import PropTypes from "prop-types"

const ModalDialog = ({
  children = <></>,
  focusInverseButton = false,
  title = "",
  handleOpen = false,
  handleClose = () => {},
  handleAcept = () => {},
  labelCancelButton = "Cancelar",
  labelAcceptButton = "Aceptar",
  component = "",
  handleSubmit = () => {},
}) => {
  const variantAccept = focusInverseButton
    ? "button--secondary"
    : "button--primary"
  const variantCancel = focusInverseButton
    ? "button--primary"
    : "button--secondary"
  const typeButtonAccept = component === "form" ? "submit" : "button"

  return (
    <Dialog
      open={handleOpen}
      onClose={handleClose}
      component={component}
      onSubmit={handleSubmit}
      className="dialog-modal"
    >
      <DialogTitle className="dialog-modal__title">{title}</DialogTitle>
      <DialogContent className="dialog-modal__content">
        {children}
      </DialogContent>
      <DialogActions className="dialog-modal__actions">
        <Button onClick={handleClose} className={variantCancel}>
          {labelCancelButton}
        </Button>
        <Button
          onClick={handleAcept}
          className={variantAccept}
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
  handleSubmit: PropTypes.func,
}

export default ModalDialog
