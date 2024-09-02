import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const navbarOption = [
  { name: "Inicio", route: "/" },
  { name: "Gestionar tarjetas", route: "/gestionar-tarjetas" },
  { name: "Modos de juego", route: "/modos-de-juego" },
]

const Navbar = () => {
  return (
    <Box className="navbar">
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
