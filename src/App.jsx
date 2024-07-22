import { Box, Container, Typography } from "@mui/material"
import FlashCard from "./components/FlashCard"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import CardForm from "./components/CardForm"
import { setCards } from "./redux/cardReducer"
import { getCardLocal, setCardLocal } from "./utils/localStorage"

function App() {
  const cards = useSelector(state => state.card)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCards(getCardLocal()))
  }, [dispatch])

  const handleOnDrop = (e) => {
    const cardDrag = e.dataTransfer.getData('flashCardSelect')
    const cardDrop = cards.find(c => c.id === e.target.id)
    const cardInfoDrag = cards.find(c => c.id === cardDrag)
    const newCardList = cards.filter(c => c.id !== cardDrag)
    newCardList.splice(cards.indexOf(cardDrop), 0, cardInfoDrag)
    dispatch(setCards(newCardList))
    setCardLocal(newCardList)
  }

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
            <FlashCard key={c.id} handleOnDrop={handleOnDrop} cardContent={c}/>
          )}
        </Box>
      </Box>
    </Container>
  )
}
                                                                                                                                                                
export default App
