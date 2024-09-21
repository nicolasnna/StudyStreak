import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import {
  pushAuxTime,
  reorderGameMode,
  resetBot,
  selectOptionMultipleMode,
  setBotLevel,
  setCorrectBotAnswer,
  setCurrentIndex,
  setSelectCorrectOption,
  setStartGame,
} from "@reducer/gameReducer"
import {
  errorNotification,
  successNotification,
} from "@reducer/notificationReducer"
import { calculateBotAnswer } from "@utils/commonFunction"
import { ColorOption } from "@utils/constants"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import VisualizerCard from "./VisualizerCard"
import WaitCard from "./WaitCard"
import FlashCard from "@components/FlashCard/FlashCard"
import { addAnswerHistory, addResultGame } from "@reducer/stadisticReducer"

const buttonsDifficulty = [
  { difficult: "Fácil", level: 0 },
  { difficult: "Medio", level: 1 },
  { difficult: "Difícil", level: 2 },
]

const CompetitionBotMode = () => {
  const [selectingOption, setSelectingOption] = useState(false)
  const stateGameMode = useSelector((state) => state.game.vsbot)
  const startGame = stateGameMode.start
  const ordererCardList = stateGameMode.listCardSort
  const currentIndex = stateGameMode.currentIndex
  const optionsCard = stateGameMode.optionList
  const stateOptions = stateGameMode.stateOption
  const correctIsSelected = stateGameMode.correctSelectList
  const botLevel = stateGameMode.botLevel
  const [showResult, setShowResult] = useState(
    currentIndex === ordererCardList.length - 1
  )
  const totalCorrectBot = stateGameMode.correctBotAnswer
  const cardList = useSelector((state) => state.card)
  const dispatch = useDispatch()

  const disableDifficult = stateGameMode.auxTime.length !== 0

  if (!cardList || cardList.length < 3) {
    return (
      <WaitCard
        Title={"Modo competencia contra bots"}
        Body2="Se requiere un mínimo de 3 tarjetas para este modo."
        Body3="Si no ha añadido ninguna tarjeta, dirijase a la sección de 'Gestionar tarjetas'"
      />
    )
  }

  const handleStart = () => {
    dispatch(setStartGame({ mode: "vsbot" }))
  }

  const handleSelectOption = (e) => {
    const selectId = e.currentTarget.getAttribute("option-value")
    const selectIndex = parseInt(e.currentTarget.getAttribute("index-value"))
    let copyOptions = [...stateOptions[currentIndex]]
    const isCorrect = selectId === ordererCardList[currentIndex].id
    const mode = "vsbot"
    const notification = isCorrect ? successNotification : errorNotification
    const message = isCorrect
      ? "Respuesta correcta. Cambiando tarjeta..."
      : "Respuesta incorrecta. Cambiando tarjeta..."

    copyOptions[selectIndex] = isCorrect
      ? ColorOption.CORRECT
      : ColorOption.INCORRECT
    dispatch(notification(message))
    dispatch(selectOptionMultipleMode(currentIndex, copyOptions, mode))

    if (isCorrect) {
      const newCorrectList = correctIsSelected.map((state, index) =>
        index === currentIndex ? true : state
      )
      dispatch(
        setSelectCorrectOption({
          mode,
          selectCorrectList: newCorrectList,
        })
      )
    }
    setSelectingOption(true)

    const correctAdd = calculateBotAnswer(botLevel)
    dispatch(
      setCorrectBotAnswer({
        mode,
        correctAnswer: totalCorrectBot + correctAdd,
      })
    )

    const currentTime = new Date().getTime()
    const lastTime =
      currentIndex === 0
        ? stateGameMode.startTime
        : stateGameMode.auxTime[currentIndex - 1]

    dispatch(
      addAnswerHistory(
        mode,
        isCorrect,
        (currentTime - lastTime) / 1000,
        ordererCardList[currentIndex].id
      )
    )

    setTimeout(() => {
      if (currentIndex < ordererCardList.length - 1) {
        dispatch(setCurrentIndex({ mode, index: currentIndex + 1 }))
        dispatch(pushAuxTime({ mode: mode }))
      } else {
        setShowResult(true)
        dispatch(addResultGame(mode))
      }
      setSelectingOption(false)
    }, 1000)
  }

  const chargeNewGame = () => {
    dispatch(reorderGameMode(cardList, "vsbot"))
    setShowResult(false)
    dispatch(successNotification("Se ha iniciado un nuevo juego"))
    dispatch(resetBot("vsbot"))
    dispatch(setStartGame({ mode: "vsbot" }))
  }

  const changeLevelBot = (newLevel) => {
    dispatch(setBotLevel({ mode: "vsbot", level: newLevel }))
    dispatch(setStartGame({ mode: "vsbot" }))
  }

  const result = () => {
    if (correctIsSelected.filter((c) => c === true).length > totalCorrectBot) {
      return "Has Ganado"
    } else if (
      correctIsSelected.filter((c) => c === true).length < totalCorrectBot
    ) {
      return "Has Perdido"
    } else {
      return "Has Empatado"
    }
  }

  return (
    <Box className="game-mode">
      <Typography className="game-mode__title">
        {showResult ? "Resultados del juego" : "Modo competencia contra bot"}
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
      {ordererCardList.length >= 1 && !showResult && startGame && (
        <Box className="game-mode__content">
          <Box className="game-mode__content__difficulty">
            <Typography className="game-mode__text">
              Selecciona el nivel de dificultad:
            </Typography>
            <Box className="game-mode__content__difficulty__buttons">
              {buttonsDifficulty.map((b) => (
                <Button
                  key={`difficult button ${b.level}`}
                  onClick={() => changeLevelBot(b.level)}
                  className={
                    botLevel === b.level
                      ? "button--primary--active"
                      : "button--primary"
                  }
                  disabled={botLevel === b.level ? false : disableDifficult}
                >
                  <strong>{b.difficult}</strong>
                </Button>
              ))}
            </Box>
          </Box>
          <Box>
            <Typography className="game-mode__text">
              Estado del bot: <strong>{totalCorrectBot}</strong> correctas de
              <strong> {ordererCardList.length}</strong>
            </Typography>
          </Box>
          <Typography className="game-mode__text">
            Observa la tarjeta y selecciona la opción acorde con el contenido.
            <br />
            Selecciona una alternativa para pasar a la siguiente tarjeta.
          </Typography>
          <VisualizerCard
            cardContent={
              cardList.filter(
                (c) => c.id === ordererCardList[currentIndex].id
              )[0]
            }
            disableFlip={true}
            mode="vsbot"
          />
          <Box>
            <Typography className="card-control__enumeration-card">
              {currentIndex + 1} / {ordererCardList.length}
            </Typography>
          </Box>
          <Typography className="game-mode__subtitle">
            <strong>
              {botLevel !== -1
                ? "Elige la opción correcta"
                : "Selecciona el nivel de dificultad del bot para empezar"}
            </strong>
          </Typography>

          {botLevel !== -1 && (
            <Box className="game-mode__selection-option">
              {optionsCard[currentIndex].map((c, index) => (
                <Card
                  key={`option ${index}`}
                  option-value={c.id}
                  index-value={index}
                  onClick={selectingOption ? () => {} : handleSelectOption}
                  sx={{
                    backgroundColor: stateOptions[currentIndex][index],
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
          )}
        </Box>
      )}
      {showResult && (
        <Box>
          <Box className="header" marginBottom={"1em"}>
            <Typography className="game-mode__text">
              Resultado del bot: <strong>{totalCorrectBot}</strong> correctas de
              <strong> {ordererCardList.length}</strong>
            </Typography>
            <Typography className="game-mode__text">
              Tu resultado:{" "}
              <strong>
                {correctIsSelected.filter((c) => c === true).length}
              </strong>{" "}
              correctas de
              <strong> {ordererCardList.length}</strong>
            </Typography>
            <Typography variant="h1">{result()}</Typography>
            <Box alignItems="center" justifyContent="center" display="flex">
              <Button className="button--primary" onClick={chargeNewGame}>
                <Typography>Empezar otra ronda</Typography>
              </Button>
            </Box>
          </Box>
          <Box>
            <Typography className="game-mode__title">Feedback</Typography>
            {ordererCardList.map((card, index) => (
              <Box
                className={
                  correctIsSelected[index]
                    ? "game-mode__feedback__card--correct"
                    : "game-mode__feedback__card--incorrect"
                }
                key={`card feedback ${index}`}
              >
                <Typography className="game-mode__text">
                  {index + 1}.{" "}
                  {correctIsSelected[index]
                    ? "Respondida correctamente"
                    : "Respondida incorrectamente"}
                </Typography>
                <Box className="game-mode__feedback__card__content">
                  <FlashCard
                    cardContent={card}
                    disableFlip={true}
                    initialFlipped={false}
                  />
                  <FlashCard
                    cardContent={card}
                    disableFlip={true}
                    initialFlipped={true}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}

CompetitionBotMode.propTypes = {}

export default CompetitionBotMode
