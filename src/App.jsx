import Footer from "@components/Footer"
import Navbar from "@components/Navbar"
import Notification from "@components/Notification"
import { Container } from "@mui/material"
import GameCard from "@pages/GameCard/GameCard"
import Home from "@pages/Home/Home"
import ManageCards from "@pages/ManageCards/ManageCards"
import PageNotFound from "@pages/PageNotFound/PageNotFound"
import { setCards } from "@reducer/cardReducer"
import { setCategories } from "@reducer/categoryReducer"
import { getCardLocal, getCategoryLocal } from "@utils/localStorage"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Routes } from "react-router-dom"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCards(getCardLocal()))
    dispatch(setCategories(getCategoryLocal()))
  }, [dispatch])

  return (
    <div className="content">
      <Navbar />
      <Container sx={{ marginTop: "5em", width: "100%" }}>
        <Notification />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gestionar-tarjetas" element={<ManageCards />} />
          <Route path="/modos-de-juego/*" element={<GameCard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  )
}

export default App
