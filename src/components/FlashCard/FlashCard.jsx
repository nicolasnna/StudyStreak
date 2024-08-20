import DeleteIcon from "@mui/icons-material/Delete";
import FlipIcon from "@mui/icons-material/Flip";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import {
  Box,
  Card,
  CardContent,
  DialogContentText,
  IconButton,
  Paper,
  Stack
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCardById } from "@reducer/cardReducer";
import { infoNotification } from "@reducer/notificationReducer";
import ModalDialog from "@components/ModalDialog";
import FlashCardBack from "./FlashCardBack";
import FlashCardFront from "./FlashCardFront";
import FlashCardUpdateModal from "./FlashCardUpdateModal";


const FlashCard = ({
  cardContent,
  manageMode = false,
  disableFlip = false,
}) => {
  const [flipped, setFlipped] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false)
  const dispatch = useDispatch();
  

  const ChangeFlipped = () => setFlipped(!flipped);
  const handleDialog = () => setOpenDialog(true);
  const closeDialog = () => setOpenDialog(false);
  const handleDialogUpdate = () => setOpenDialogUpdate(true)
  const closeDialogUpdate = () => setOpenDialogUpdate(false)
  const flipWithClick = () => {
    if (!manageMode && !disableFlip) {
      setFlipped(!flipped)
    }
  }

  const deleteFlashCard = () => {
    closeDialog();
    dispatch(infoNotification("Se ha eliminado la tarjeta correctamente"));
    dispatch(deleteCardById(cardContent.id));
  };

  return (
    <>
      <Box
        id={cardContent.id}
        className="flash-card"
        onClick={flipWithClick}
      >
        {manageMode && (
            <Stack
              flexDirection={"row"}
              justifyContent="end"
            >
              <IconButton onClick={handleDialog} aria-label="delete-button">
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={ChangeFlipped} aria-label="flip-button">
                <FlipIcon />
              </IconButton>
            </Stack>
          )}
        <CardContent
          sx={{
            display:'flex',
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
            height: "100%",
            paddingTop: 0,
            paddingBottom: 0,
            flexGrow: 1,
            boxSizing: 'border-box',
            overflow: 'auto',
          }}
        >
          {!flipped && (
            <FlashCardFront 
              text={cardContent.question} 
              difficulty={cardContent.difficulty} 
              categories={cardContent.tags}/>
          )}
          {flipped && (
            <FlashCardBack text={cardContent.answer}/>
          )}
        </CardContent>
        {manageMode && (
            <Stack
              flexDirection={"row"}
              justifyContent="start"
            >
              <IconButton onClick={handleDialogUpdate} aria-label="update-button">
                <SystemUpdateAltIcon />
              </IconButton>
            </Stack>
          )}
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
        handleClose={closeDialogUpdate}/>
    </>
  );
};

FlashCard.propTypes = {
  cardContent: PropTypes.object,
  manageMode: PropTypes.bool,
  disableFlip: PropTypes.bool,
};

export default FlashCard;
