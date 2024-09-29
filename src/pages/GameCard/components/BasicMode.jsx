import { Box, Button, Typography } from "@mui/material"
import {
  reorderGameMode,
  setCurrentIndex,
  setStartGame,
} from "@reducer/gameReducer"
import { useDispatch, useSelector } from "react-redux"
import CardControl from "./CardControl"
import VisualizerCard from "./VisualizerCard"
import WaitCard from "./WaitCard"
import { sizeScreen } from "@utils/constants"
import useWindowSize from "@hooks/useWindowSize"

const BasicMode = () => {
  const stateGameMode = useSelector((state) => state.game.basic)
  const ordererCardList = stateGameMode.listCardSort
  const currentIndex = stateGameMode.currentIndex
  const startGame = stateGameMode.start
  const cardList = useSelector((state) => state.card)
  const dispatch = useDispatch()
  const { width } = useWindowSize()

  if (width < sizeScreen.MOBILE) {
    return (
      <Box className="game-mode__alert-sizescreen">
        <Typography>
          Para jugar en el modo básico, cambia la pantalla a orientación
          horizontal o utiliza el modo escritorio.
        </Typography>
      </Box>
    )
  }

  if (!cardList || cardList.length < 3) {
    return (
      <WaitCard
        Title="Modo revisión básica"
        Body2="Se requiere un mínimo de 3 tarjetas para este modo."
        Body3="Si no ha añadido ninguna tarjeta, dirijase a la sección de 'Gestionar tarjetas'"
      />
    )
  }

  const disableNext = currentIndex === ordererCardList.length - 1
  const disablePrev = currentIndex === 0

  const handleStart = () => {
    dispatch(setStartGame({ mode: "basic" }))
  }
  const handleShuffle = () => {
    dispatch(reorderGameMode(cardList, "basic"))
  }

  const handleNext = () => {
    if (!disableNext) {
      dispatch(setCurrentIndex({ mode: "basic", index: currentIndex + 1 }))
    }
  }
  const handlePrev = () => {
    if (!disablePrev) {
      dispatch(setCurrentIndex({ mode: "basic", index: currentIndex - 1 }))
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
