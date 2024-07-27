import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Snackbar, Stack, TextField, Typography } from "@mui/material"
import useField from "../hooks/useField"
import { useDispatch } from "react-redux"
import { createCard } from "../redux/cardReducer"
import useNotification from "../hooks/useNotification"
import { FontSize, PaddingSize } from "../utils/constants"

const fieldStyle = {
  width: "400px",
}

const CardForm = () => {
  const questionField = useField('')
  const answerField = useField('')
  const difficultField = useField('')
  const tagField = useField([])
  const notification = useNotification('')
  const dispatch = useDispatch()

  const cleanField = () => {
    questionField.clean()
    answerField.clean()
  }

  const createNewCard = (event) => {
    event.preventDefault()
    const card = {
      question: questionField.value,
      answer: answerField.value
    }
    dispatch(createCard(card))
    cleanField()
    notification.handleOpen()
  }

  return (
    <Box 
      component={Paper}
      sx={{
        display:"flex",
        flexDirection:"column",
        width: "max-content",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        padding: PaddingSize.NORMAL
      }}
      >
      <Typography variant="h2" fontSize={FontSize.BIG} align="center">Crear nueva FlashCard</Typography>
      <Box 
        component="form" 
        flexDirection={"column"} 
        display="flex" 
        gap={1}
        onSubmit={createNewCard}
        >
        <TextField
          required
          id="question-text"
          label="Pregunta"
          size="small"
          type="sentence"
          multiline
          sx={fieldStyle}
          maxRows={2}
          value={questionField.value}
          onChange={questionField.changeValue}
          inputProps={{ maxLength: 60 }}
        />
        <TextField
          id="answer-text"
          label="Respuesta"
          size="small"
          type="words"
          maxRows={3}
          multiline
          sx={fieldStyle}
          value={answerField.value}
          onChange={answerField.changeValue}
          inputProps={{ maxLength: 200}}
        />
        <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'} gap={1}>
          <FormControl fullWidth size="small" required>
            <InputLabel id="selector-difficult-label">Dificultad</InputLabel>
            <Select
              labelId="selector-difficult-label"
              id="selector-difficult"
              label="Dificultad"
              value={difficultField.value}
              onChange={difficultField.changeValue}
            >
              <MenuItem value='easy'>Fácil</MenuItem>
              <MenuItem value='medium'>Medio</MenuItem>
              <MenuItem value='hard'>Difícil</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" required>
            <InputLabel id="selector-tag-label">Categoria</InputLabel>
            <Select
              labelId="selector-tag-label"
              id="selector-tag"
              label="Categoria"
              value={tagField.value}
              onChange={tagField.changeValue}
            >
              <MenuItem value='easy'>Fácil</MenuItem>
              <MenuItem value='medium'>Medio</MenuItem>
              <MenuItem value='hard'>Difícil</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Box component="div" gap={2} display="flex">
          <Button size="small" variant="contained" type="submit">Guardar</Button>
          <Button size="small" variant="outlined" onClick={cleanField}>Limpiar</Button>
        </Box>
      </Box>
      <Snackbar
        open={notification.value}
        autoHideDuration={3000}
        onClose={notification.handleClose}
        action={notification.action}
      >
        <Alert
          onClose={notification.handleClose}
          severity="success"
          sx={{width:"100%"}}
        >
          Se ha creado una nueva tarjeta
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default CardForm