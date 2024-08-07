import { Box, Button, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeFrequencyById } from "../../../reducer/cardReducer"
import { infoNotification, successNotification } from "../../../reducer/notificationReducer"
import { sortCards } from "../../../utils/commonFunction"
import { setCardLocal } from "../../../utils/localStorage"
import CardControl from "./CardControl"
import VisualizerCard from "./VisualizerCard"
import WaitCard from "./WaitCard"

const BasicMode = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expandedCards, setExpandedCards] = useState([])
  const [startGame, setStartGame] = useState(false)
  const cardList = useSelector(state => state.card)
  const dispatch = useDispatch()

  if (!cardList || cardList.length === 0 ) {
    return (<WaitCard Title="Modo revisión básica" />)
  }

  // Define color of arrows
  let colorUpArrow = "grey"
  let colorDownArrow = "grey"
  if (expandedCards[currentIndex]){
    colorUpArrow = cardList.filter(c => c.id === expandedCards[currentIndex].id)[0].revision_frequency === 1 ? "green" : "grey"
    colorDownArrow = cardList.filter(c => c.id === expandedCards[currentIndex].id)[0].revision_frequency === -1 ? "red" : "grey"
  }

  const disableNext = currentIndex < expandedCards.length-1 ? false : true
  const disablePrev = currentIndex > 0 ? false : true

  const handleStart = () => {

    const aleatory = sortCards(cardList)
    setExpandedCards(aleatory)
    setStartGame(true)
  }
  const handleShuffle = () => {
    const aleatory = sortCards(cardList)
    setExpandedCards(aleatory)
    setCurrentIndex(0)
  }

  const changeFrequency = (value) => {
    switch (value){
      case 1:
        dispatch(changeFrequencyById(expandedCards[currentIndex].id, 1))
        dispatch(successNotification("Se ha incrementado la frecuencia de aparición de la tarjeta"))
        break
      case 0:
        dispatch(changeFrequencyById(expandedCards[currentIndex].id, 0))
        dispatch(infoNotification("Volviendo a la frecuencia normal"))
        break
      case -1:
        dispatch(changeFrequencyById(expandedCards[currentIndex].id, -1))
        dispatch(successNotification("Se ha disminuido la frecuencia de aparición de la tarjeta"))
        break
      default:
        console.error("Error to specify change Frequency in ModeBasicGame.jsx")
    }
    setCardLocal(cardList)
  }
  
  const handleNext = () => {
    if (!disableNext) {
      setCurrentIndex(currentIndex+1)
    }
  }
  const handlePrev = () => {
    if (!disablePrev) {
      setCurrentIndex(currentIndex-1)
    }
  }

  return (
    <Box display="flex" flexDirection={"column"} alignItems={"center"} justifyContent={"center"} padding={3} gap={3}>
      <Typography variant="h2">Modo revisión básica</Typography>
      {!startGame && <Button variant="contained" onClick={handleStart}>
        <Typography variant="h3" padding={1}>Empezar</Typography>
      </Button>}

      {(!expandedCards[currentIndex] && startGame) && <WaitCard Body1="Barajando tarjetas..." Body2=""/>}

      {startGame && <Stack flexDirection={"column"} alignItems={"center"} justifyContent={"center"} gap={2}>
        <Typography 
          variant="body1" 
          textAlign={'center'}
        >
          Pulsa en la tarjeta para ver la respuesta. <br/>Usa las flechas para ajustar la frecuencia de aparición de la tarjeta.
        </Typography>
        <VisualizerCard 
          colorDownArrow={colorDownArrow}
          colorUpArrow={colorUpArrow}
          changeFrequency={changeFrequency}
          cardContent={cardList.filter(c => c.id === expandedCards[currentIndex].id)[0]}
        />
        <CardControl 
          currentIndex={currentIndex}
          maxIndex={expandedCards.length}
          handleNext={handleNext}
          handlePrev={handlePrev}
          handleShuffle={handleShuffle}
          disableNext={disableNext}
          disablePrev={disablePrev}
        />
      </Stack>}
    </Box>
  )
}

BasicMode.propTypes = {
}

export default BasicMode