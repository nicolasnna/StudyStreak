import { Card, CardContent, Typography } from "@mui/material"
import PropTypes from 'prop-types'
import { useState } from "react"

const cardStyle = {
  width: "max-content",
  maxWidth: "250px",
  minHeight: "150px",
  height: "max-content",
  padding: 1,
}


const FlashCard = ({frontText, backText}) => {
  const [flipped, setFlipped] = useState(false)

  const frontElement = flipped ? 'none' : ''
  const backElement = flipped ? '' : 'none'

  const ChangeFlipped = () => {
    setFlipped(!flipped)
  }

  return ( 
    <Card sx={cardStyle}>
      <CardContent sx={{display: frontElement}}>
        <Typography variant="body1" fontSize={16}>{frontText}</Typography>
      </CardContent>
      <CardContent sx={{display: backElement}}>
        <Typography variant="body1" fontSize={14}>{backText}</Typography>
      </CardContent>
      <button onClick={ChangeFlipped}>.</button>
    </Card>
  )
}

FlashCard.propTypes = {
  frontText: PropTypes.string,
  backText: PropTypes.string
}

export default FlashCard