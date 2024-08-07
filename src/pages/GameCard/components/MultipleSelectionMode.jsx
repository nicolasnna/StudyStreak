import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WaitCard from './WaitCard'
import { FisherYates, sortCards } from '../../../utils/commonFunction'
import VisualizerCard from './VisualizerCard'
import { setCardLocal } from '../../../utils/localStorage'
import { changeFrequencyById } from '../../../reducer/cardReducer'
import { errorNotification, infoNotification, successNotification } from '../../../reducer/notificationReducer'
import CardControl from './CardControl'

const MultipleSelectionMode = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expandedCards, setExpandedCards] = useState([])
  const [startGame, setStartGame] = useState(false)
  const [correctIsSelected, setCorrectIsSelected] = useState(false)
  const [optionCard, setOptionCard] = useState([])
  const [colorOption, setColorOption] = useState(['white', 'white', 'white'])
  const cardList = useSelector(state => state.card)
  const dispatch = useDispatch()

  if (!cardList || cardList.length < 3) {
    return (<WaitCard Title="Modo selección múltiple" Body2="Se requiere un mínimo de 3 tarjetas para este modo. Si no ha añadido ninguna tarjeta, dirijase a la sección de 'Gestionar tarjetas'"/>)
  }

  // Define color of arrows
  let colorUpArrow = "grey"
  let colorDownArrow = "grey"
  if (expandedCards[currentIndex]){
    colorUpArrow = cardList.filter(c => c.id === expandedCards[currentIndex].id)[0].revision_frequency === 1 ? "green" : "grey"
    colorDownArrow = cardList.filter(c => c.id === expandedCards[currentIndex].id)[0].revision_frequency === -1 ? "red" : "grey"
  }

  const createOption = (actualCard, cards) => {
    let indexA = Math.floor(Math.random() * (cards.length))
    while (cards[indexA].id === actualCard.id) {
      indexA = Math.floor(Math.random() * (cards.length))
    }
    let indexB = Math.floor(Math.random() * (cards.length))
    while (cards[indexB].id === actualCard.id || indexA === indexB) {
      indexB = Math.floor(Math.random() * (cards.length))
      console.log(indexB)
    }
    const optionArray = FisherYates([cards[indexA], actualCard, cards[indexB]])
    return optionArray
  }

  const handleStart = () => {
    const aleatory = sortCards(cardList)
    const optionList = createOption(aleatory[currentIndex], cardList)
    setExpandedCards(aleatory)
    setOptionCard(optionList)
    setStartGame(true)
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
        console.error("Error to specify change Frequency in MultipleSelectionMode.jsx")
    }
    setCardLocal(cardList)
  }

  const handleSelectOption = (e) => {
    const selectId = e.currentTarget.getAttribute("option-value")
    const selectIndex = e.currentTarget.getAttribute("index-value")
    let arrayColor = [...colorOption]
    if (selectId === expandedCards[currentIndex].id) {
      arrayColor[selectIndex] = "rgb(0,220,0,0.5)"
      setCorrectIsSelected(true)
      dispatch(successNotification("Se ha marcado la alternativa correcta"))
    } else {
      arrayColor[selectIndex] = "rgb(220,0,0,0.5)"
      dispatch(errorNotification("Se ha marcado la alternativa incorrecta"))
    }
    setColorOption(arrayColor)
  } 

  const disableNext = (currentIndex < expandedCards.length-1) && correctIsSelected ? false : true
  const disablePrev = currentIndex > 0 ? false : true

  const handleNext = () => {
    if (!disableNext) {
      setCurrentIndex(currentIndex+1)
      setCorrectIsSelected(false)
      setOptionCard(createOption(expandedCards[currentIndex+1], cardList))
      setColorOption(['white','white','white'])
  }}
  const handlePrev = () => {
    if (!disablePrev) {
      setCurrentIndex(currentIndex-1)
      setOptionCard(createOption(expandedCards[currentIndex-1], cardList))
      setColorOption(['white','white','white'])
  }}
  const handleShuffle = () => {
    const aleatory = sortCards(cardList)
    setExpandedCards(aleatory)
    setCurrentIndex(0)
    setOptionCard(createOption(expandedCards[0], cardList))
    setColorOption(['white','white','white'])
  }

  return (
    <Box 
      display="flex" 
      flexDirection={"column"} 
      alignItems={"center"} 
      justifyContent={"center"} 
      padding={3} 
      gap={3}
    >
      <Typography variant="h2" >Modo selección multiple</Typography>
      {!startGame && <Button variant="contained" onClick={handleStart}>
        <Typography variant="h3" padding={1}>Empezar</Typography>
      </Button>}

      {(!expandedCards[currentIndex] && startGame) && <WaitCard Body1="Barajando tarjetas..." Body2=""/>}

      {startGame && <Stack flexDirection={"column"} alignItems={"center"} justifyContent={"center"} gap={2}>
        <Typography 
          variant="body1" 
          textAlign={'center'} 
        >
          Usa las flechas para ajustar la frecuencia de aparición de la tarjeta.
        </Typography>
        <VisualizerCard
          colorDownArrow={colorDownArrow}
          colorUpArrow={colorUpArrow}
          changeFrequency={changeFrequency}
          cardContent={cardList.filter(c => c.id === expandedCards[currentIndex].id)[0]}
          disableFlip={true}
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

        <Box>
          <Typography 
            variant="h3" 
            textAlign={'center'} 
          >
            <strong>Elige la opción correcta</strong>
          </Typography>
        </Box>
        <Stack
          flexDirection={'row'}
          alignItems={'start'}
          justifyContent={'center'}
          gap={2}
        >
          {optionCard.map((c,index) => <Card 
            key={`option ${index}`} 
            option-value={c.id}
            index-value={index}
            onClick={handleSelectOption}
            sx={{
              backgroundColor: colorOption[index],
              cursor: 'pointer'
            }}
            > 
            <CardContent 
              padding={1}
            >
              <Typography variant="body1">
                {c.answer}
              </Typography>
            </CardContent>
          </Card>)}
        </Stack>
      </Stack>}
    </Box>
  )
}

MultipleSelectionMode.propTypes = {
  handleNotification: PropTypes.func
}

export default MultipleSelectionMode