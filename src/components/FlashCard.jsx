import { Alert, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Typography } from "@mui/material"
import PropTypes from 'prop-types'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteCardById } from "../redux/cardReducer"
import useNotification from "../hooks/useNotification"
import { createPortal } from "react-dom"

const cardStyle = {
  width: "max-content",
  maxWidth: "250px",
  minHeight: "150px",
  height: "max-content",
  padding: 1,
}

const FlashCard = ({cardContent, handleOnDrop}) => {
  const [flipped, setFlipped] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const dispatch = useDispatch()
  const notification = useNotification()

  const frontElement = flipped ? 'none' : 'flex'
  const backElement = flipped ? 'flex' : 'none'

  const ChangeFlipped = () => {
    setFlipped(!flipped)
  }

  const deleteFlashCard = () => {  
    closeDialog()
    notification.handleOpen()
    setHidden(true)
    setTimeout(() => {
      dispatch(deleteCardById(cardContent.id))
    },2000)
  }

  const handleDialog = () => {
    setOpenDialog(true)

  }
  const closeDialog = () => {
    setOpenDialog(false)
  }

  const handleOnDrag = (e) => {
    e.dataTransfer.setData('flashCardSelect', e.target.id)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return ( 
    <>
      <Card 
        id={cardContent.id} 
        hidden={hidden}
        component="div" 
        draggable 
        onDragStart={handleOnDrag}
        onDragOver={handleDragOver}
        onDrop={handleOnDrop}
        sx={cardStyle}>
        <CardContent sx={{display: frontElement, flexDirection: 'column'}}>
          <button onClick={handleDialog}>Delete</button>
          <Typography variant="body1" fontSize={16}>{cardContent.front}</Typography>
          <button onClick={ChangeFlipped}>.</button>
        </CardContent>
        <CardContent sx={{display: backElement, flexDirection: 'column'}}>
          <Typography variant="body1" fontSize={14}>{cardContent.front}</Typography>
          <button onClick={ChangeFlipped}>.</button>
        </CardContent>
      </Card>
      {createPortal(
        <Snackbar
          open={notification.value}
          autoHideDuration={3000}
          onClose={notification.handleClose}
          action={notification.action}
        >
          <Alert
            onClose={notification.handleClose}
            severity="success"
            color="info"
            sx={{width:"100%"}}
          >
            Se ha eliminado una flash card
          </Alert>
        </Snackbar>,
        document.body
      )}
      <Dialog
        open={openDialog}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          {"Eliminar Flash Card?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Desea eliminar la flash card: <br/><strong>{cardContent.front}</strong> <br/>{cardContent.back}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} variant="contained">Cancelar</Button>
          <Button onClick={deleteFlashCard} variant="outlined">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

FlashCard.propTypes = {
  cardContent: PropTypes.object,
  handleOnDrop: PropTypes.func
}

export default FlashCard