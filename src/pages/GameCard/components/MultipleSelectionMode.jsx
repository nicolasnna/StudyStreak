import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import {
  reorderGameMode,
  selectOptionMultipleMode,
  setCurrentIndex,
  setSelectCorrectOption,
  setStartGame,
} from "@reducer/gameReducer"
import {
  errorNotification,
  successNotification,
} from "@reducer/notificationReducer"
import { ColorOption } from "@utils/constants"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import CardControl from "./CardControl"
import VisualizerCard from "./VisualizerCard"
import WaitCard from "./WaitCard"

const MultipleSelectionMode = ({ inverse = false }) => {
  const stateGameMode = useSelector((state) =>
    inverse ? state.game.multipleInverse : state.game.multiple
  )
  const startGame = stateGameMode.start
  const correctIsSelected = stateGameMode.correctSelectList
  const currentIndex = stateGameMode.currentIndex
  const ordererCardList = stateGameMode.listCardSort
  const optionsCard = stateGameMode.optionList
  const stateOptions = stateGameMode.stateOption

  const cardList = useSelector((state) => state.card)
  const dispatch = useDispatch()
  const modeLabel = inverse ? "multipleInverse" : "multiple"

  if (!cardList || cardList.length < 3) {
    return (
      <WaitCard
        Title={
          inverse
            ? "Modo selección múltiple inverso"
            : "Modo selección múltiple"
        }
        Body2="Se requiere un mínimo de 3 tarjetas para este modo."
        Body3="Si no ha añadido ninguna tarjeta, dirijase a la sección de 'Gestionar tarjetas'"
      />
    )
  }

  const handleStart = () => {
    dispatch(setStartGame({ mode: modeLabel }))
  }

  const handleSelectOption = (e) => {
    const selectId = e.currentTarget.getAttribute("option-value")
    const selectIndex = e.currentTarget.getAttribute("index-value")
    let copyOptions = [...stateOptions[currentIndex]]
    if (selectId === ordererCardList[currentIndex].id) {
      copyOptions[selectIndex] = ColorOption.CORRECT
      const newCorrectList = correctIsSelected.map((state, index) =>
        index === currentIndex ? true : state
      )
      dispatch(
        setSelectCorrectOption({
          mode: modeLabel,
          selectCorrectList: newCorrectList,
        })
      )
      dispatch(successNotification("Se ha marcado la alternativa correcta"))
    } else {
      copyOptions[selectIndex] = ColorOption.INCORRECT
      dispatch(errorNotification("Se ha marcado la alternativa incorrecta"))
    }
    dispatch(selectOptionMultipleMode(currentIndex, copyOptions, modeLabel))
  }

  const disableNext = !(
    currentIndex < ordererCardList.length - 1 && correctIsSelected[currentIndex]
  )

  const disablePrev = currentIndex === 0

  const handleNext = () => {
    if (!disableNext) {
      dispatch(setCurrentIndex({ mode: modeLabel, index: currentIndex + 1 }))
    }
  }
  const handlePrev = () => {
    if (!disablePrev) {
      dispatch(setCurrentIndex({ mode: modeLabel, index: currentIndex - 1 }))
    }
  }
  const handleShuffle = () => {
    dispatch(reorderGameMode(cardList, modeLabel))
  }

  return (
    <Box className="game-mode">
      <Typography className="game-mode__title">
        {inverse
          ? "Modo selección múltiple inverso"
          : "Modo selección múltiple"}
      </Typography>
      {!startGame && (
        <Button className="button--primary" onClick={handleStart}>
          <Typography variant="h3" padding={1}>
            Empezar
          </Typography>
        </Button>
      )}

      {!ordererCardList[currentIndex] && startGame && (
        <WaitCard Body1="Barajando tarjetas..." Body2="" />
      )}

      {ordererCardList.length >= 1 && startGame && (
        <Box className="game-mode__content">
          <Typography className="game-mode__text">
            Usa las flechas para ajustar la frecuencia de aparición de la
            tarjeta.
          </Typography>
          <VisualizerCard
            showFront={!inverse}
            cardContent={
              cardList.filter(
                (c) => c.id === ordererCardList[currentIndex].id
              )[0]
            }
            disableFlip={true}
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

          <Typography className="game-mode__subtitle">
            <strong>Elige la opción correcta</strong>
          </Typography>

          <Box className="game-mode__selection-option">
            {optionsCard[currentIndex].map((c, index) => (
              <Card
                key={`option ${index}`}
                option-value={c.id}
                index-value={index}
                onClick={handleSelectOption}
                sx={{
                  backgroundColor: stateOptions[currentIndex][index],
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                }}
              >
                <CardContent padding={1}>
                  <Typography className="game-mode__text">
                    {inverse ? c.question : c.answer}
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

MultipleSelectionMode.propTypes = {
  inverse: PropTypes.bool,
}

export default MultipleSelectionMode
