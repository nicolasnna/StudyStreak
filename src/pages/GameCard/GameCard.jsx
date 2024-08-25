import Header from "@components/Header"
import { Box, Button, Stack, Typography } from "@mui/material"
import { FontSize } from "@utils/constants"
import { Link, Route, Routes, useLocation } from "react-router-dom"
import BasicMode from "./components/BasicMode"
import MultipleSelectionMode from "./components/MultipleSelectionMode"

const buttonRoutes = [
  { key: 1, label: "Revisión básica", link: "/modos-de-juego/basico" },
  {
    key: 2,
    label: "Selección múltiple",
    link: "/modos-de-juego/seleccion-multiple",
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
        <Route path="/basico" element={<BasicMode />} />
        <Route path="/seleccion-multiple" element={<MultipleSelectionMode />} />
      </Routes>
    </Box>
  )
}

export default GameCard
