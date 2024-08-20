import { Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const FlashCardFront = ({text, difficulty, categories}) => {
  const dictDifficulty = {easy: 'Fácil', medium: 'Intermedio', hard:'Difícil'}

  return (
    <Stack 
      height={"100%"}>
      <Stack height={'80%'}>
        <Typography 
          variant="body1" 
          sx={{
            wordWrap: 'break-word'
          }}>
          {text}
        </Typography>
      </Stack>
      <Stack flexDirection={"row"} gap={3} height={'20%'}>
        <Typography variant='body2'><strong className='accent--strong'>{dictDifficulty[difficulty]}</strong></Typography>
        <Typography variant='body2'>{categories}</Typography>
      </Stack>
    </Stack>
  )
}

FlashCardFront.propTypes = {
  text: PropTypes.string,
  difficulty: PropTypes.string,
  categories: PropTypes.string,
}

export default FlashCardFront
