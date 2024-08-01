import { Box, Typography } from "@mui/material"
import { useState } from "react"
import FlashCard from "../../../components/FlashCard"
import { useSelector } from "react-redux"
import { FontSize } from "../../../utils/constants"

const ModeBasicGame = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardList = useSelector(state => state.card)


  return (
    <Box display="flex" flexDirection={"column"} alignItems={"center"} justifyContent={"center"} padding={3}>
      <Typography variant="h3" fontSize={FontSize.SUBTITLE} marginBottom={2}>Modo básico</Typography>
      <FlashCard cardContent={cardList[currentIndex]} />
    </Box>
  )
}

export default ModeBasicGame