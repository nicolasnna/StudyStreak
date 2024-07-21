import { Card, CardContent, Typography } from "@mui/material"
import PropTypes from 'prop-types'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteCardById } from "../redux/cardReducer"

const cardStyle = {
  width: "max-content",
  maxWidth: "250px",
  minHeight: "150px",
  height: "max-content",
  padding: 1,
}

const FlashCard = ({cardContent}) => {
  const [flipped, setFlipped] = useState(false)
  const dispatch = useDispatch()

  const frontElement = flipped ? 'none' : 'flex'
  const backElement = flipped ? 'flex' : 'none'

  const ChangeFlipped = () => {
    setFlipped(!flipped)
  }

  const deleteFlashCard = () => {
    dispatch(deleteCardById(cardContent.id))
  }

  return ( 
    <Card sx={cardStyle}>
      <CardContent sx={{display: frontElement, flexDirection: 'column'}}>
        <button onClick={deleteFlashCard}>Delete</button>
        <Typography variant="body1" fontSize={16}>{cardContent.front}</Typography>
        <button onClick={ChangeFlipped}>.</button>
      </CardContent>
      <CardContent sx={{display: backElement, flexDirection: 'column'}}>
        <Typography variant="body1" fontSize={14}>{cardContent.front}</Typography>
        <button onClick={ChangeFlipped}>.</button>
      </CardContent>
      
    </Card>
  )
}

FlashCard.propTypes = {
  cardContent: PropTypes.object,
}

export default FlashCard