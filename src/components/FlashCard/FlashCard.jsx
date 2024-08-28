import ModalDialog from "@components/ModalDialog"
import { Box, DialogContentText } from "@mui/material"
import { deleteCardById } from "@reducer/cardReducer"
import { infoNotification } from "@reducer/notificationReducer"
import PropTypes from "prop-types"
import { useState } from "react"
import { useDispatch } from "react-redux"
import FlashCardBack from "./FlashCardBack"
import FlashCardFront from "./FlashCardFront"
import FlashCardUpdateModal from "./FlashCardUpdateModal"

const FlashCard = ({
  cardContent,
  manageMode = false,
  disableFlip = false,
  initialFlipped = false,
}) => {
  const [flipped, setFlipped] = useState(initialFlipped)
  const [openDialog, setOpenDialog] = useState(false)
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false)
  const dispatch = useDispatch()

  const flipClass = flipped ? "is-flipped" : ""

  const ChangeFlipped = () => setFlipped(!flipped)
  const handleDialog = () => setOpenDialog(true)
  const closeDialog = () => setOpenDialog(false)
  const handleDialogUpdate = () => setOpenDialogUpdate(true)
  const closeDialogUpdate = () => setOpenDialogUpdate(false)
  const flipWithClick = () => {
    if (!manageMode && !disableFlip) {
      setFlipped(!flipped)
    }
  }

  const deleteFlashCard = () => {
    closeDialog()
    dispatch(infoNotification("Se ha eliminado la tarjeta correctamente"))
    dispatch(deleteCardById(cardContent.id))
  }

  return (
    <>
      <Box
        id={cardContent.id}
        className={`flash-card ${flipClass}`}
        onClick={flipWithClick}
      >
        <FlashCardFront
          manageMode={manageMode}
          text={cardContent.question}
          difficulty={cardContent.difficulty}
          categories={cardContent.tags}
          handleDialog={handleDialog}
          handleDialogUpdate={handleDialogUpdate}
          ChangeFlipped={ChangeFlipped}
        />
        <FlashCardBack
          text={cardContent.answer}
          manageMode={manageMode}
          handleDialog={handleDialog}
          handleDialogUpdate={handleDialogUpdate}
          ChangeFlipped={ChangeFlipped}
        />
      </Box>

      <ModalDialog
        title="Eliminar tarjeta?"
        handleOpen={openDialog}
        handleClose={closeDialog}
        handleAcept={deleteFlashCard}
        focusInverseButton={true}
      >
        <DialogContentText>
          Desea eliminar la tarjeta: <br />
          <strong>{cardContent.question}</strong> <br />
          {cardContent.answer}
        </DialogContentText>
      </ModalDialog>
      <FlashCardUpdateModal
        card={cardContent}
        open={openDialogUpdate}
        handleClose={closeDialogUpdate}
      />
    </>
  )
}

FlashCard.propTypes = {
  cardContent: PropTypes.object,
  manageMode: PropTypes.bool,
  disableFlip: PropTypes.bool,
  initialFlipped: PropTypes.bool,
}

export default FlashCard
