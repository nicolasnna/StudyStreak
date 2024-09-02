import FlashCard from "@components/FlashCard/FlashCard"
import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import { createOption, sortCards } from "@utils/commonFunction"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CardControl from "./CardControl"
import WaitCard from "./WaitCard"

const colorOptionDeault = "#d2dee470"

const CompetitionBotMode = () => {
  const [startGame, setStartGame] = useState(false)
  const [expandedCards, setExpandedCards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctIsSelected, setCorrectIsSelected] = useState(false)
  const [optionCard, setOptionCard] = useState([])
  const [colorOption, setColorOption] = useState([
    colorOptionDeault,
    colorOptionDeault,
    colorOptionDeault,
  ])
  const cardList = useSelector((state) => state.card)
  const dispatch = useDispatch()

  if (!cardList || cardList.length < 3) {
    return (
      <WaitCard
        Title={"Modo competencia contra bots"}
        Body2="Se requiere un mínimo de 3 tarjetas para este modo. Si no ha añadido ninguna tarjeta, dirijase a la sección de 'Gestionar tarjetas'"
      />
    )
  }

  const handleStart = () => {
    const aleatory = sortCards(cardList)
    const optionList = createOption(aleatory[currentIndex], cardList)
    setExpandedCards(aleatory)
    setOptionCard(optionList)
    setStartGame(true)
  }

  const handleSelectOption = (e) => {
    const selectId = e.currentTarget.getAttribute("option-value")
  }

  const disableNext =
    currentIndex < expandedCards.length - 1 && correctIsSelected ? false : true
  const disablePrev = currentIndex > 0 ? false : true

  const handleNext = () => {
    if (!disableNext) {
      setCurrentIndex(currentIndex + 1)
      setCorrectIsSelected(false)
      setOptionCard(createOption(expandedCards[currentIndex + 1], cardList))
      setColorOption([colorOptionDeault, colorOptionDeault, colorOptionDeault])
    }
  }
  const handlePrev = () => {
    if (!disablePrev) {
      setCurrentIndex(currentIndex - 1)
      setOptionCard(createOption(expandedCards[currentIndex - 1], cardList))
      setColorOption([colorOptionDeault, colorOptionDeault, colorOptionDeault])
    }
  }
  const handleShuffle = () => {
    const aleatory = sortCards(cardList)
    setExpandedCards(aleatory)
    setCurrentIndex(0)
    setOptionCard(createOption(expandedCards[0], cardList))
    setColorOption([colorOptionDeault, colorOptionDeault, colorOptionDeault])
  }

  return (
    <Box className="game-mode">
      <Typography className="game-mode__title">
        Modo competencia contra bot
      </Typography>
      {!startGame && (
        <Button className="button--primary" onClick={handleStart}>
          <Typography variant="h3" padding={1}>
            Empezar
          </Typography>
        </Button>
      )}
      {!expandedCards[currentIndex] && startGame && (
        <WaitCard Body1="Barajando tarjetas..." Body2="" />
      )}
      {startGame && (
        <Box className="game-mode__content">
          <Box className="">
            <Typography className="game-mode__text">
              Estado del bot: <strong>0</strong> respondidas de
              <strong> 14</strong>
            </Typography>
          </Box>
          <Typography className="game-mode__text">
            Observa la tarjeta y selecciona la opción acorde con el contenido.
            <br />
            Selecciona una alternativa antes de pasar a la siguiente tarjeta.
          </Typography>
          <FlashCard
            cardContent={
              cardList.filter((c) => c.id === expandedCards[currentIndex].id)[0]
            }
            disableFlip={true}
            manageMode={false}
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

          <Typography className="game-mode__subtitle">
            <strong>Elige la opción correcta</strong>
          </Typography>

          <Box className="game-mode__selection-option">
            {optionCard.map((c, index) => (
              <Card
                key={`option ${index}`}
                option-value={c.id}
                index-value={index}
                onClick={handleSelectOption}
                sx={{
                  backgroundColor: colorOptionDeault,
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                }}
              >
                <CardContent padding={1}>
                  <Typography className="game-mode__text">
                    {c.answer}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}

CompetitionBotMode.propTypes = {}

export default CompetitionBotMode
