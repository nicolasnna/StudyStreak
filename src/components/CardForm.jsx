import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material"
import useField from "../hooks/useField"
import { useDispatch, useSelector } from "react-redux"
import { createCard } from "../reducer/cardReducer"
import { FontSize, PaddingSize } from "../utils/constants"
import { useState } from "react"
import { createCategory } from "../reducer/categoryReducer"
import { setCategoryLocal } from "../utils/localStorage"
import PropTypes from "prop-types";
import { successNotification } from "../reducer/notificationReducer"
import ModalDialog from "./ModalDialog"

const fieldStyle = {
  width: "400px",
}

const CardForm = ({ handleNotification }) => {
  const questionField = useField('')
  const answerField = useField('')
  const difficultField = useField('')
  const tagField = useField('')
  const dispatch = useDispatch()
  const categories = useSelector(state => state.category)
  const [openDialog, setOpenDialog ] = useState(false)

  const cleanField = () => {
    questionField.clean()
    answerField.clean()
    difficultField.clean()
    tagField.clean()
  }

  const createNewCard = (event) => {
    event.preventDefault()
    const card = {
      question: questionField.value,
      answer: answerField.value,
      difficulty: difficultField.value,
      tags: tagField.value || []
    }
    dispatch(createCard(card))
    cleanField()
    dispatch(successNotification("Se ha creado la tarjeta correctamente"))
    handleNotification()
  }

  const handleSubmitDialog = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formJson = Object.fromEntries(formData.entries())
    const newCategory = formJson.category
    const listCategory = [...categories, newCategory]
    setCategoryLocal(listCategory)
    dispatch(createCategory(newCategory))
    closeDialog()
    dispatch(successNotification(`Se ha creado la categoria "${newCategory}"`))
    handleNotification()
  } 

  const closeDialog = () => {setOpenDialog(false)}

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
      <Typography variant="h2" fontSize={FontSize.BIG} align="center">Crear una nueva tarjeta</Typography>
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
          <FormControl fullWidth size="small" >
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
          <Button variant="contained" onClick={() => setOpenDialog(true)}>
            <Typography fontSize={FontSize.SMALL}>Crear Categoría</Typography>
          </Button>
        </Stack>
        <Box component="div" gap={2} display="flex">
          <Button variant="contained" type="submit">
            <Typography fontSize={FontSize.NORMAL}>Guardar</Typography>
          </Button>
          <Button variant="outlined" onClick={cleanField}>
            <Typography fontSize={FontSize.NORMAL}>Limpiar</Typography>
          </Button>
        </Box>
      </Box>

      <ModalDialog
        handleOpen={openDialog}
        handleClose={closeDialog}
        component="form"
        handleSubmit={handleSubmitDialog}
        title="Crear Categoría"
      >
        <TextField
          required
          id="category"
          name="category"
          label="Categoría"
          type="text"
          margin="dense"
          size="small"
        />
      </ModalDialog>

    </Box>
  )
}

CardForm.propTypes = {
  handleNotification: PropTypes.func
}

export default CardForm