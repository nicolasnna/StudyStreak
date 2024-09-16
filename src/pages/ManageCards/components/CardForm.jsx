import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import PropTypes from "prop-types"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useField from "@hooks/useField"
import { createCard } from "@reducer/cardReducer"
import { createCategory } from "@reducer/categoryReducer"
import { successNotification } from "@reducer/notificationReducer"
import { setCategoryLocal } from "@utils/localStorage"
import ModalDialog from "@components/ModalDialog"

const CardForm = () => {
  const questionField = useField("")
  const answerField = useField("")
  const difficultField = useField("")
  const tagField = useField("")
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category)
  const [openDialog, setOpenDialog] = useState(false)

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
      tags: [tagField.value] || [],
    }
    dispatch(createCard(card))
    cleanField()
    dispatch(successNotification("Se ha creado la tarjeta correctamente"))
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
  }

  const closeDialog = () => {
    setOpenDialog(false)
  }

  return (
    <Box className="cardform">
      <Box width={"100%"} height={"100%"}>
        <Typography variant="h2" align="center">
          Crear una nueva tarjeta
        </Typography>
      </Box>
      <Box
        component="form"
        flexDirection={"column"}
        display="flex"
        gap={1}
        width={"100%"}
        height={"100%"}
        onSubmit={createNewCard}
      >
        <TextField
          required
          id="question-text"
          label="Pregunta"
          size="small"
          type="sentence"
          multiline
          maxRows={2}
          className="cardform__textfield"
          value={questionField.value}
          onChange={questionField.changeValue}
          inputProps={{ maxLength: 60, style: { color: "#551aa2" } }}
        />
        <TextField
          id="answer-text"
          label="Respuesta"
          size="small"
          type="words"
          className="cardform__textfield"
          maxRows={3}
          multiline
          value={answerField.value}
          onChange={answerField.changeValue}
          inputProps={{ maxLength: 200, style: { color: "#551aa2" } }}
        />
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
        >
          <FormControl fullWidth size="small" required>
            <InputLabel
              className="cardform__input-label"
              id="selector-difficult-label"
            >
              Dificultad
            </InputLabel>
            <Select
              labelId="selector-difficult-label"
              id="selector-difficult"
              label="Dificultad"
              value={difficultField.value}
              className="cardform__selection"
              onChange={difficultField.changeValue}
            >
              <MenuItem className="cardform__selection__item" value="easy">
                Fácil
              </MenuItem>
              <MenuItem className="cardform__selection__item" value="medium">
                Medio
              </MenuItem>
              <MenuItem className="cardform__selection__item" value="hard">
                Difícil
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel
              className="cardform__input-label"
              id="selector-tag-label"
            >
              Categoría
            </InputLabel>
            <Select
              labelId="selector-tag-label"
              id="selector-tag"
              label="Categoría"
              className="cardform__selection"
              value={tagField.value}
              onChange={tagField.changeValue}
            >
              {categories.map((c) => (
                <MenuItem
                  className="cardform__selection__item"
                  key={c}
                  value={c}
                >
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            className="button--primary cardform__button--category"
            onClick={() => setOpenDialog(true)}
          >
            <Typography variant="body2">Crear Categoría</Typography>
          </Button>
        </Stack>
        <Box component="div" gap={2} display="flex">
          <Button className="button--primary cardform__button" type="submit">
            <Typography variant="body1">
              <strong>Guardar</strong>
            </Typography>
          </Button>
          <Button
            className="button--secondary cardform__button"
            onClick={cleanField}
          >
            <Typography variant="body1">
              <strong>Limpiar</strong>
            </Typography>
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
          className="cardform__textfield"
          inputProps={{ style: { color: "#551aa2" } }}
        />
      </ModalDialog>
    </Box>
  )
}

CardForm.propTypes = {
  handleNotification: PropTypes.func,
}

export default CardForm
