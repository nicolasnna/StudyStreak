import { Box, Button, Stack, Typography } from "@mui/material";
import Header from "../../components/Header";
import BasicMode from "./components/BasicMode";
import { Link, Route, Routes } from "react-router-dom";
import { FontSize } from "../../utils/constants";
import MultipleSelectionMode from "./components/MultipleSelectionMode";

const buttonRoutes = [
  {key: 1, label: "Revisión básica", link: "/modos-de-juego/basico"},
  {key: 2, label: "Selección múltiple", link: "/modos-de-juego/seleccion-multiple"}
]

const GameCard = () => {
  return (
    <Box marginTop={'1em'}>
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
        {buttonRoutes.map(b => 
          <Link key={b.key} to={b.link}>
            <Button variant="contained" sx={{textTransform: 'none'}}>
              <Typography fontSize={FontSize.HIGH}>{b.label}</Typography>  
            </Button>
          </Link>
        )}
      </Stack>
      
      <Routes>
        <Route 
          path="/basico" 
          element={<BasicMode />}
        />
        <Route 
          path="/seleccion-multiple" 
          element={<MultipleSelectionMode />}
        />
      </Routes>
    </Box>
  );
};

export default GameCard;
