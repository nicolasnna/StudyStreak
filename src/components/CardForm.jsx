import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import useField from "../hooks/useField"
import { useDispatch } from "react-redux"
import { createCard } from "../redux/cardReducer"

const fieldStyle = {
  width: "300px",
}

const CardForm = () => {
  const frontField = useField()
  const backField = useField()
  const dispatch = useDispatch()

  const cleanField = () => {
    frontField.clean()
    backField.clean()
  }

  const createNewCard = (event) => {
    event.preventDefault()
    const card = {
      front: frontField.value,
      back: backField.value
    }
    dispatch(createCard(card))
  }

  return (
    <Box 
      component={Paper}
      sx={{
        display:"flex",
        flexDirection:"column",
        width: "max-content"
      }}
      >
      <Typography mt={2} variant="h2" fontSize={26} align="center">Crear nueva FlashCard</Typography>
      <Box 
        component="form" 
        flexDirection={"column"} 
        display="flex" 
        gap={1}
        padding={2}
        onSubmit={createNewCard}
        >
        <TextField
          id="front-text"
          label="Texto frontal"
          size="small"
          type="words"
          multiline
          sx={fieldStyle}
          maxRows={2}
          value={frontField.value}
          onChange={frontField.changeValue}
        />
        <TextField
          id="back-text"
          label="Texto posterior"
          size="small"
          type="text"
          maxRows={3}
          multiline
          sx={fieldStyle}
          value={backField.value}
          onChange={backField.changeValue}
        />
        <Box component="div" gap={2} display="flex">
          <Button size="small" variant="contained" type="submit">Guardar</Button>
          <Button size="small" variant="outlined" onClick={cleanField}>Limpiar</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CardForm