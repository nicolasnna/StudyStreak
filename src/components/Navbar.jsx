import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const navbarStyle = {
  flexDirection: 'row',
  border: "1px solid",
  marginTop: 0,
  gap: 2,
  alignItems: "center",
  justifyContent: "center",
};

const optionStyle = {
  padding: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "&:hover": {
    opacity: 0.6,
    backgroundColor: "red",
  },
};

const navbarOption = [
  { name: "Home", route: "/" },
  { name: "Gestionar tarjetas", route: "/gestionar-tarjetas" },
  { name: "Modos de juego", route: "/modos-de-juego" }
];

const Navbar = () => {

  return (
    <Stack position={"static"} sx={navbarStyle}>
      {navbarOption.map(o => (
        <Link style={{textDecoration: 'none'}} key={o.name} to={o.route}> 
          <Box sx={optionStyle}>
            <Typography variant="h2">{o.name}</Typography>
          </Box>
        </Link>
      ))}
    </Stack>
  );
};

export default Navbar;
