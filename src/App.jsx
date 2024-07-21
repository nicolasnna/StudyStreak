import { Box, Container, Typography } from "@mui/material"
import FlashCard from "./components/FlashCard"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import CardForm from "./components/CardForm"
import { setCards } from "./redux/cardReducer"

function App() {
  const cards = useSelector(state => state.card)
  const dispatch = useDispatch()

  useEffect(() => {
    const cardsLocal = localStorage.getItem("flashCards")
    if (cardsLocal) {
      const saved = JSON.parse(cardsLocal)
      const savedValidated = Array.isArray(saved) ? saved : [saved]
      dispatch(setCards(savedValidated))
    }
  }, [dispatch])

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        >
        <Typography variant="h1" fontSize={46} align="center">Mejora tu experiencia de aprendizaje</Typography>
        <CardForm/>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          gap={2}
          >
          {cards.map((c) => 
            <FlashCard key={c.id} frontText={c.front} backText={c.back}/>
          )}
        </Box>
      </Box>
    </Container>
  )
}
                                                                                                                                                                
export default App
