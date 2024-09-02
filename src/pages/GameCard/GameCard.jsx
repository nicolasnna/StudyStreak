import Header from "@components/Header"
import { Box, Button, Stack, Typography } from "@mui/material"
import { FontSize } from "@utils/constants"
import { Link, Route, Routes, useLocation } from "react-router-dom"
import BasicMode from "./components/BasicMode"
import MultipleSelectionMode from "./components/MultipleSelectionMode"
import CompetitionBotMode from "./components/CompetitionBotMode"

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
      </Routes>
    </Box>
  )
}

export default GameCard
