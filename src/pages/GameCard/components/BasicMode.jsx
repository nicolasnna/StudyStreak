import { Box, Button, Typography } from "@mui/material"
import { changeFrequencyById } from "@reducer/cardReducer"
import {
  reorderBasicMode,
  setBasicIndex,
  startBasicGame,
} from "@reducer/gameReducer"
import {
  infoNotification,
  successNotification,
} from "@reducer/notificationReducer"
import { setCardLocal } from "@utils/localStorage"
import { useDispatch, useSelector } from "react-redux"
import CardControl from "./CardControl"
import VisualizerCard from "./VisualizerCard"
import WaitCard from "./WaitCard"

const BasicMode = () => {
  const ordererCardList = useSelector((state) => state.game.basic.listCardSort)
  const currentIndex = useSelector((state) => state.game.basic.currentIndex)
  const startGame = useSelector((state) => state.game.basic.start)
  const cardList = useSelector((state) => state.card)
  const dispatch = useDispatch()

  if (!cardList || cardList.length === 0) {
    return <WaitCard Title="Modo revisión básica" />
  }

  // Define color of arrows
  let colorUpArrow = "grey"
  let colorDownArrow = "grey"
  if (ordererCardList[currentIndex]) {
    colorUpArrow =
      cardList.filter((c) => c.id === ordererCardList[currentIndex].id)[0]
        .revision_frequency === 1
        ? "green"
        : "grey"
    colorDownArrow =
      cardList.filter((c) => c.id === ordererCardList[currentIndex].id)[0]
        .revision_frequency === -1
        ? "red"
        : "grey"
  }

  const disableNext = currentIndex === ordererCardList.length - 1
  const disablePrev = currentIndex === 0

  const handleStart = () => {
    dispatch(startBasicGame())
  }
  const handleShuffle = () => {
    dispatch(reorderBasicMode(cardList))
  }

  const changeFrequency = (value) => {
    switch (value) {
      case 1:
        dispatch(changeFrequencyById(ordererCardList[currentIndex].id, 1))
        dispatch(
          successNotification(
            "Se ha incrementado la frecuencia de aparición de la tarjeta"
          )
        )
        break
      case 0:
        dispatch(changeFrequencyById(ordererCardList[currentIndex].id, 0))
        dispatch(infoNotification("Volviendo a la frecuencia normal"))
        break
      case -1:
        dispatch(changeFrequencyById(ordererCardList[currentIndex].id, -1))
        dispatch(
          successNotification(
            "Se ha disminuido la frecuencia de aparición de la tarjeta"
          )
        )
        break
      default:
        console.error("Error to specify change Frequency in ModeBasicGame.jsx")
    }
    setCardLocal(cardList)
  }

  const handleNext = () => {
    if (!disableNext) {
      dispatch(setBasicIndex(currentIndex + 1))
    }
  }
  const handlePrev = () => {
    if (!disablePrev) {
      dispatch(setBasicIndex(currentIndex - 1))
    }
  }

  return (
    <Box className="game-mode">
      <Typography className="game-mode__title">Modo revisión básica</Typography>
      {!startGame && (
        <Button className="button--primary" onClick={handleStart}>
          <Typography variant="h3" padding={1}>
            Empezar
          </Typography>
        </Button>
      )}

      {ordererCardList.length === 0 && startGame && (
        <WaitCard Body1="Barajando tarjetas..." Body2="" />
      )}

      {ordererCardList.length >= 1 && startGame && (
        <Box className="game-mode__content">
          <Typography className="game-mode__text">
            Pulsa en la tarjeta para ver la respuesta. <br />
            Usa las flechas para ajustar la frecuencia de aparición de la
            tarjeta.
          </Typography>
          <VisualizerCard
            colorDownArrow={colorDownArrow}
            colorUpArrow={colorUpArrow}
            changeFrequency={changeFrequency}
            cardContent={
              cardList.filter(
                (c) => c.id === ordererCardList[currentIndex].id
              )[0]
            }
          />
          <CardControl
            currentIndex={currentIndex}
            maxIndex={ordererCardList.length - 1}
            handleNext={handleNext}
            handlePrev={handlePrev}
            handleShuffle={handleShuffle}
            disableNext={disableNext}
            disablePrev={disablePrev}
          />
        </Box>
      )}
    </Box>
  )
}

BasicMode.propTypes = {}

export default BasicMode
