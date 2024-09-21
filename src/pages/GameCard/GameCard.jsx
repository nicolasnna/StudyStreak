import Header from "@components/Header"
import { Box, Button, Stack, Typography } from "@mui/material"
import { reorderGameMode } from "@reducer/gameReducer"
import { FontSize } from "@utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Route, Routes, useLocation } from "react-router-dom"
import BasicMode from "./components/BasicMode"
import CompetitionBotMode from "./components/CompetitionBotMode"
import MultipleSelectionMode from "./components/MultipleSelectionMode"
import HomeMode from "./components/HomeMode"
import PageNotFound from "@pages/PageNotFound/PageNotFound"

const buttonRoutes = [
  { key: "basica", label: "Revisión básica", link: "/modos-de-juego/basico" },
  {
    key: "multiple",
    label: "Selección múltiple",
    link: "/modos-de-juego/seleccion-multiple",
  },
  {
    key: "multiple inverso",
    label: "Selección múltiple inverso",
    link: "/modos-de-juego/seleccion-multiple-inverso",
  },
  {
    key: "competencia",
    label: "Competencia Bot",
    link: "/modos-de-juego/competencia-vs-bot",
  },
]

const GameCard = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const cardList = useSelector((state) => state.card)
  const gameModeCards = useSelector((state) => state.game)

  useEffect(() => {
    if (gameModeCards.basic.listCardSort.length === 0 && cardList.length >= 3) {
      dispatch(reorderGameMode(cardList, "basic"))
    }
    if (
      gameModeCards.multiple.listCardSort.length === 0 &&
      cardList.length >= 3
    ) {
      dispatch(reorderGameMode(cardList, "multiple"))
    }
    if (
      gameModeCards.multipleInverse.listCardSort.length === 0 &&
      cardList.length >= 3
    ) {
      dispatch(reorderGameMode(cardList, "multipleInverse"))
    }
    if (gameModeCards.vsbot.listCardSort.length === 0 && cardList.length >= 3) {
      dispatch(reorderGameMode(cardList, "vsbot"))
    }
  }, [gameModeCards, dispatch, cardList])

  return (
    <Box marginTop={"1em"}>
      <Header
        Title={"Explora tu conocimiento"}
        SubTitle="Selecciona un modo de juego para desafiar tus habilidades."
      />
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
      >
        {buttonRoutes.map((b) => (
          <Link key={b.key} to={b.link}>
            <Button
              className={
                location.pathname === b.link
                  ? "button--primary--active"
                  : "button--primary"
              }
              sx={{ textTransform: "none" }}
            >
              <Typography fontSize={FontSize.HIGH}>{b.label}</Typography>
            </Button>
          </Link>
        ))}
      </Stack>

      <Routes>
        <Route path={"/"} element={<HomeMode />} />
        <Route path={"/basico"} element={<BasicMode />} />
        <Route
          path={"/seleccion-multiple"}
          element={<MultipleSelectionMode key="multiple" />}
        />
        <Route
          path={"/seleccion-multiple-inverso"}
          element={
            <MultipleSelectionMode key="multiple-inverse" inverse={true} />
          }
        />
        <Route path="/competencia-vs-bot" element={<CompetitionBotMode />} />
        <Route
          path="*"
          element={
            <PageNotFound
              labelError="Modo de juego no encontrado"
              subtitle="Selecciona uno de los modos de juegos disponibles"
            />
          }
        />
      </Routes>
    </Box>
  )
}

export default GameCard
