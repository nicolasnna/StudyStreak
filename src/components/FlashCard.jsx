import {
  Card,
  CardContent,
  DialogContentText,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCardById } from "../reducer/cardReducer";
import { infoNotification } from "../reducer/notificationReducer";
import DeleteIcon from "@mui/icons-material/Delete";
import FlipIcon from "@mui/icons-material/Flip";
import ModalDialog from "./ModalDialog";

const cardStyle = {
  width: "300px",
  height: "200px",
  padding: 1,
  display: "flex",
};

const FlashCard = ({
  cardContent,
  manageMode,
  handleNotification,
}) => {
  const [flipped, setFlipped] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const ChangeFlipped = () => setFlipped(!flipped);
  const handleDialog = () => setOpenDialog(true);
  const closeDialog = () => setOpenDialog(false);

  const deleteFlashCard = () => {
    closeDialog();
    dispatch(infoNotification("Se ha eliminado la tarjeta correctamente"));
    handleNotification();
    dispatch(deleteCardById(cardContent.id));
  };

  return (
    <>
      <Card
        component={Paper}
        id={cardContent.id}
        sx={cardStyle}
      >
        <CardContent
          sx={{
            flexDirection: "column",
            paddingTop: 0,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          {manageMode && (
            <Stack
              flexDirection={"row"}
              justifyContent="end"
              alignItems="self-end"
            >
              <IconButton onClick={handleDialog} aria-label="delete-button">
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={ChangeFlipped} aria-label="flip-button">
                <FlipIcon />
              </IconButton>
            </Stack>
          )}
          {!flipped && (
            <Stack>
              <Typography variant="body1" fontSize={16}>
                {cardContent.question}
              </Typography>
            </Stack>
          )}
          {flipped && (
            <Stack>
              <Typography variant="body1" fontSize={14}>
                {cardContent.answer}
              </Typography>
            </Stack>
          )}
        </CardContent>
      </Card>

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
    </>
  );
};

FlashCard.propTypes = {
  cardContent: PropTypes.object,
  manageMode: PropTypes.bool,
  handleNotification: PropTypes.func,
};

export default FlashCard;
