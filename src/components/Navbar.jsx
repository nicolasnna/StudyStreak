import useWindowSize from "@hooks/useWindowSize"
import { Box, Typography } from "@mui/material"
import { sizeScreen } from "@utils/constants"
import { Link } from "react-router-dom"
import StyleIcon from "@mui/icons-material/Style"
import HomeIcon from "@mui/icons-material/Home"
import GamesIcon from "@mui/icons-material/Games"
import QueryStatsIcon from "@mui/icons-material/QueryStats"

const navbarOption = [
  { name: "Inicio", route: "/", icon: <HomeIcon fontSize="large" /> },
  {
    name: "Gestionar tarjetas",
    route: "/gestionar-tarjetas",
    icon: <StyleIcon fontSize="large" />,
  },
  {
    name: "Modos de juego",
    route: "/modos-de-juego",
    icon: <GamesIcon fontSize="large" />,
  },
  {
    name: "Estadísticas",
    route: "/estadisticas",
    icon: <QueryStatsIcon fontSize="large" />,
  },
]

const Navbar = () => {
  const { width } = useWindowSize()

  const urlBaseLogo =
    import.meta.env.MODE === "production" ? "/study-streak" : ""

  if (width < sizeScreen.MOBILE) {
    return (
      <Box className="navbar">
        {navbarOption.map((o) => (
          <Link className="navbar__options" key={o.name} to={o.route}>
            <Box className="navbar__options__content">{o.icon}</Box>
          </Link>
        ))}
      </Box>
    )
  }
  return (
    <Box className="navbar">
      {width > 1080 && (
        <img
          className="navbar__icon"
          src={urlBaseLogo + "/logo full without bg.png"}
          alt="logo web"
        />
      )}
      {navbarOption.map((o) => (
        <Link className="navbar__options" key={o.name} to={o.route}>
          <Box className="navbar__options__content">
            <Typography variant="h2">{o.name}</Typography>
          </Box>
        </Link>
      ))}
    </Box>
  )
}

export default Navbar
