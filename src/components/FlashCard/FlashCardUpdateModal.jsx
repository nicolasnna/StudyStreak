import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import useField from '../../hooks/useField'
import { modifyCardById } from '../../reducer/cardReducer'
import { successNotification } from '../../reducer/notificationReducer'
import ModalDialog from '../ModalDialog'

const FlashCardUpdateModal = ({card, open, handleClose}) => {
  const categories = useSelector(state => state.category)
  const questionField = useField(card.question)
  const answerField = useField(card.answer)
  const difficultField = useField(card.difficulty || '')
  const tagField = useField(card.tags || '')
  const commentField = useField('')
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault()
    const newContent = {
      id: card.id,
      question: questionField.value,
      answer: answerField.value,
      tags: tagField.value,
      difficulty: difficultField.value,
      comments: commentField.value
    }
    dispatch(modifyCardById(card,newContent))
    dispatch(successNotification("Se ha modificado la tarjeta correctamente"))
    handleClose()
  }
  return (
    <ModalDialog
        title="Rellene los campos que desea modificar"
        handleOpen={open}
        handleClose={handleClose}
        handleAcept={handleUpdate}
      >
        <Stack gap={1} sx={{ width: '100%', height: '100%'}}>
            <TextField
              id="question-text"
              label="Pregunta"
              size="small"
              type="sentence"
              name="question"
              multiline
              fullWidth
              maxRows={2}
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
              maxRows={3}
              multiline
              fullWidth
              margin="dense"
              value={answerField.value}
              onChange={answerField.changeValue}
              inputProps={{ maxLength: 200}}
            />
          <Stack flexDirection={'row'} gap={2} width={"100%"}>
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
            <FormControl sx={{width:'60%'}} size="small">
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
  )
}

FlashCardUpdateModal.propTypes = {
  card: PropTypes.object,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
}

export default FlashCardUpdateModal