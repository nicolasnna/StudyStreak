import {
  Card,
  CardContent,
  DialogContentText,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCardById, modifyCardById } from "../reducer/cardReducer";
import { infoNotification, successNotification } from "../reducer/notificationReducer";
import DeleteIcon from "@mui/icons-material/Delete";
import FlipIcon from "@mui/icons-material/Flip";
import ModalDialog from "./ModalDialog";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import useField from "../hooks/useField";

const cardStyle = {
  width: "300px",
  height: "200px",
  padding: 1,
  display: "flex",
  flexDirection: 'column',
  justifyContent: 'space-between'
};

const FlashCard = ({
  cardContent,
  manageMode = false,
  handleNotification,
}) => {
  const [flipped, setFlipped] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false)
  const dispatch = useDispatch();
  const categories = useSelector(state => state.category)
  const questionField = useField(cardContent.question)
  const answerField = useField(cardContent.answer)
  const difficultField = useField(cardContent.difficulty || '')
  const tagField = useField(cardContent.tags || '')
  const commentField = useField('')

  const ChangeFlipped = () => setFlipped(!flipped);
  const handleDialog = () => setOpenDialog(true);
  const closeDialog = () => setOpenDialog(false);
  const handleDialogUpdate = () => setOpenDialogUpdate(true)
  const closeDialogUpdate = () => setOpenDialogUpdate(false)

  const deleteFlashCard = () => {
    closeDialog();
    dispatch(infoNotification("Se ha eliminado la tarjeta correctamente"));
    handleNotification();
    dispatch(deleteCardById(cardContent.id));
  };

  const handleUpdate = (e) => {
    e.preventDefault()
    const newContent = {
      id: cardContent.id,
      question: questionField.value,
      answer: answerField.value,
      tags: tagField.value,
      difficulty: difficultField.value,
      comments: commentField.value
    }
    dispatch(modifyCardById(cardContent,newContent))
    dispatch(successNotification("Se ha modificado la tarjeta correctamente"))
    handleNotification()
    setOpenDialogUpdate(false)
  }

  return (
    <>
      <Card
        component={Paper}
        id={cardContent.id}
        sx={cardStyle}
      >
        {manageMode && (
            <Stack
              flexDirection={"row"}
              justifyContent="end"
              alignItems="center"
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
          }}
        >
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
      
      <ModalDialog
        title="Rellene los campos que desea modificar"
        handleOpen={openDialogUpdate}
        handleClose={closeDialogUpdate}
        component="form"
        handleAcept={handleUpdate}
      >
        <Stack gap={1} sx={{ width: '30em'}}>
          <Stack flexDirection={'row'} gap={2}>
            <TextField
              id="question-text"
              label="Pregunta"
              size="small"
              type="sentence"
              name="question"
              multiline
              margin="dense"
              value={questionField.value}
              onChange={questionField.changeValue}
              inputProps={{ maxLength: 60 }}
            />
            <TextField
              id="answer-text"
              label="Respuesta"
              size="small"
              type="words"
              name="question"
              sx={{ width: '60%'}}
              maxRows={3}
              multiline
              margin="dense"
              value={answerField.value}
              onChange={answerField.changeValue}
              inputProps={{ maxLength: 200}}
            />
          </Stack>
          <Stack flexDirection={'row'} gap={2}>
            <FormControl sx={{width:'40%'}} size="small">
              <InputLabel id="selector-difficult-label">Dificultad</InputLabel>
              <Select
                labelId="selector-difficult-label"
                id="selector-difficult"
                label="Dificultad"
                margin="dense"
                value={difficultField.value}
                onChange={difficultField.changeValue}
              >
                <MenuItem value='easy'>Fácil</MenuItem>
                <MenuItem value='medium'>Medio</MenuItem>
                <MenuItem value='hard'>Difícil</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
            <InputLabel id="selector-tag-label">Categoría</InputLabel>
              <Select
                labelId="selector-tag-label"
                id="selector-tag"
                label="Categoría"
                value={tagField.value}
                onChange={tagField.changeValue}
              > 
                {categories.map(c => (<MenuItem key={c} value={c}>{c}</MenuItem>))}
              </Select>
            </FormControl>
          </Stack>

          <TextField
              id="comments-text"
              label="Comentario"
              size="small"
              type="words"
              name="comments"
              sx={{ width: '100%'}}
              maxRows={3}
              multiline
              margin="dense"
              value={commentField.value}
              onChange={commentField.changeValue}
            />
        </Stack>
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
