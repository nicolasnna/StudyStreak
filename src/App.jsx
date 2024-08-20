import { Container } from "@mui/material"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { setCards } from "@reducer/cardReducer"
import { getCardLocal, getCategoryLocal } from "@utils/localStorage"
import { setCategories } from "@reducer/categoryReducer"
import { Route, Routes } from "react-router-dom"
import Navbar from "@components/Navbar"
import ManageCards from "@pages/ManageCards/ManageCards"
import GameCard from "@pages/GameCard/GameCard"
import Notification from "@components/Notification"

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(setCards(getCardLocal()))
    dispatch(setCategories(getCategoryLocal()))
  }, [dispatch])
  
  return (
    <div className="content">
      <Navbar/>
        <Container sx={{marginTop: '5em'}} >
          <Notification/>
          <Routes>
            <Route path="/gestionar-tarjetas" element={<ManageCards/>}/>
            <Route path="/modos-de-juego/*" element={<GameCard/>}/>
          </Routes>
        </Container>
    </div>
    )
}
                                                                                                                                                                
export default App
