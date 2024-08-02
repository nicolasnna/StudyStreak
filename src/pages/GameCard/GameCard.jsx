import { Box } from "@mui/material";
import Header from "../../components/Header";
import ModeBasicGame from "./components/ModeBasicGame";
import useNotification from "../../hooks/useNotification";

const GameCard = () => {
  const notification = useNotification()

  return (
    <Box marginTop={'2em'}>
      <notification.component/>
      <Header Text={"Empieza con tu estudio"}/>
      <ModeBasicGame handleNotification={notification.handleOpen} />
    </Box>
  );
};

export default GameCard;
