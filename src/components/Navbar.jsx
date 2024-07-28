import { Box, Stack, Typography } from "@mui/material";
import { FontSize, PaddingSize } from "../utils/constants";
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
  padding: PaddingSize.SMALL,
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
  { name: "Tarjetas", route: "/cards" },
  { name: "Jugar", route: "/game" }
];

const Navbar = () => {

  return (
    <Stack position={"static"} sx={navbarStyle}>
      {navbarOption.map(o => (
        <Link style={{textDecoration: 'none'}} key={o.name} to={o.route}> 
          <Box sx={optionStyle}>
            <Typography fontSize={FontSize.HIGH}>{o.name}</Typography>
          </Box>
        </Link>
      ))}
    </Stack>
  );
};

export default Navbar;
