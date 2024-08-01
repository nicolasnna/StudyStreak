import { Box } from "@mui/material";
import Header from "../../components/Header";
import ModeBasicGame from "./components/ModeBasicGame";

const GameCard = () => {
  return (
    <Box marginTop={'2em'}>
      <Header Text={"Empieza con tu estudio"}/>
      <ModeBasicGame/>
    </Box>
  );
};

export default GameCard;
