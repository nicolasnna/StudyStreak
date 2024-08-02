import { Box, CircularProgress, IconButton, Stack, Typography } from "@mui/material"
import { useState } from "react"
import FlashCard from "../../../components/FlashCard"
import { useDispatch, useSelector } from "react-redux"
import { FontSize } from "../../../utils/constants"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PropTypes from 'prop-types'
import { infoNotification, successNotification } from "../../../reducer/notificationReducer"
import { changeFrequencyById } from "../../../reducer/cardReducer"

const ModeBasicGame = ({ handleNotification = () => {}}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardList = useSelector(state => state.card)
  const dispatch = useDispatch()

  if (!cardList || cardList.length === 0) {
    return (
      <Box display="flex" flexDirection={"column"} alignItems={"center"} justifyContent={"center"} padding={3}>
        <Typography variant="h3" fontSize={FontSize.SUBTITLE} marginBottom={2}>Modo básico</Typography>
        <CircularProgress />
        <Typography variant="body1">Cargando tarjetas...</Typography>
      </Box>
    )
  }

  const colorUpArrow = cardList[currentIndex].revision_frequency === 1 ? "green" : "grey"
  const colorDownArrow = cardList[currentIndex].revision_frequency === -1 ? "red" : "grey"

  const changeFrequency = (value) => {
    switch (value){
      case 1:
        dispatch(changeFrequencyById(cardList[currentIndex].id, 1))
        dispatch(successNotification("Se ha incrementado la frecuencia de aparición de la tarjeta"))
        handleNotification()
        break
      case 0:
        dispatch(changeFrequencyById(cardList[currentIndex].id, 0))
        dispatch(infoNotification("Volviendo a la frecuencia normal"))
        handleNotification()
        break
      case -1:
        dispatch(changeFrequencyById(cardList[currentIndex].id, -1))
        dispatch(successNotification("Se ha disminuido la frecuencia de aparición de la tarjeta"))
        handleNotification()
        break
      default:
        console.error("Error to specify change Frequency in ModeBasicGame.jsx")
    }    
  }

  const ClickUpArrow = (e) => {
    e.preventDefault()
    if (cardList[currentIndex].revision_frequency !== 1) {    
      changeFrequency(1)
    } else {
      changeFrequency(0)
    }
  }
  const ClickDownArrow = (e) => {
    e.preventDefault()
    if (cardList[currentIndex].revision_frequency !== -1) {
      changeFrequency(-1)
    } else {
      changeFrequency(0)
    }
  }
  
  return (
    <Box display="flex" flexDirection={"column"} alignItems={"center"} justifyContent={"center"} padding={3} gap={3}>
      <Typography variant="h3" fontSize={FontSize.SUBTITLE}>Modo revisión básica</Typography>
      <Typography 
        variant="body1" 
        textAlign={'center'} 
        fontSize={FontSize.NORMAL}
      >
        Pulsa en la tarjeta para ver la respuesta. <br/>Marca una de las flechas si quieres cambiar la frecuencia de aparición.
      </Typography>
      <Stack 
        flexDirection={'row'} 
        gap={5} 
        alignItems={"center"}
        justifyContent={"center"}>
        <Box>
          <IconButton onClick={ClickDownArrow} aria-label="decrement-frequency">
            <ArrowDownwardIcon 
              sx={{ 
                width: '3em', 
                height: '3em', 
                color: colorDownArrow}}
            />
          </IconButton> 
        </Box>
        <FlashCard cardContent={cardList[currentIndex]} />
        <Box>
          <IconButton onClick={ClickUpArrow} aria-label="increment-frequency">
            <ArrowUpwardIcon 
              sx={{ 
                width: '3em', 
                height: '3em', 
                color: colorUpArrow}}
            />
          </IconButton> 
        </Box>
      </Stack>
    </Box>
  )
}

ModeBasicGame.propTypes = {
  handleNotification: PropTypes.func
}

export default ModeBasicGame