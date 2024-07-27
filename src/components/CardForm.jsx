import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material"
import useField from "../hooks/useField"
import { useDispatch, useSelector } from "react-redux"
import { createCard } from "../reducer/cardReducer"
import useNotification from "../hooks/useNotification"
import { FontSize, PaddingSize } from "../utils/constants"
import { useState } from "react"
import { createCategory } from "../reducer/categoryReducer"

const fieldStyle = {
  width: "400px",
}

const CardForm = () => {
  const questionField = useField('')
  const answerField = useField('')
  const difficultField = useField('')
  const tagField = useField('')
  const notifyCreateCard = useNotification()
  const notifyCreateCategory = useNotification()
  const dispatch = useDispatch()
  const categories = useSelector(state => state.category)
  const [openDialog, setOpenDialog ] = useState(false)
  const [newCategory, setNewCategory ] = useState('')

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
      answer: answerField.value
    }
    dispatch(createCard(card))
    cleanField()
    notifyCreateCard.handleOpen()
  }

  const handleSubmitDialog = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formJson = Object.fromEntries(formData.entries())
    const categoryText = formJson.category
    setNewCategory(categoryText)
    dispatch(createCategory(categoryText))
    closeDialog()
    notifyCreateCategory.handleOpen()
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
      <notifyCreateCard.component severity="success" label="Se ha creado la tarjeta correctamente"/>
      <notifyCreateCategory.component severity="success" label={`Se ha creado la categoria "${newCategory}"`}/>
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

      <Dialog
        open={openDialog}
        onClose={closeDialog}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmitDialog
        }}
      >
        <DialogTitle>Crear Categoría</DialogTitle>
        <DialogContent>
          <TextField
            required
            id="category"
            name="category"
            label="Categoría"
            type="text"
            margin="dense"
            size="small"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} variant="outlined">Cancelar</Button>
          <Button type="submit" variant="contained">Guardar</Button>
      </DialogActions>
      </Dialog>

    </Box>
  )
}

export default CardForm