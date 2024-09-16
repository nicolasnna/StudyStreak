import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const navbarOption = [
  { name: "Inicio", route: "/" },
  { name: "Gestionar tarjetas", route: "/gestionar-tarjetas" },
  { name: "Modos de juego", route: "/modos-de-juego" },
  { name: "Estadísticas", route: "/estadisticas" },
]

const Navbar = () => {
  return (
    <Box className="navbar">
      <img
        className="navbar__icon"
        src="/logo full without bg.png"
        alt="logo web"
      />
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
