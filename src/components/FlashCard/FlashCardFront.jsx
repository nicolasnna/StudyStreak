import { Box, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import FlashCardButtons from './FlashCardButtons'

const FlashCardFront = ({
  text, 
  difficulty, 
  categories, 
  manageMode, 
  handleDialog, 
  ChangeFlipped,
  handleDialogUpdate
}) => {
  const dictDifficulty = {easy: 'Fácil', medium: 'Intermedio', hard:'Difícil'}

  return (
    <Box 
      className="flash-card__front">
      <FlashCardButtons
        manageMode={manageMode}
        handleDialog={handleDialog}
        ChangeFlipped={ChangeFlipped}
        handleDialogUpdate={handleDialogUpdate}
      >
        <div className='flash-card__content'>
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
        </div>
      </FlashCardButtons>
    </Box>
  )
}

FlashCardFront.propTypes = {
  text: PropTypes.string,
  difficulty: PropTypes.string,
  categories: PropTypes.string,
  manageMode: PropTypes.bool,
  handleDialog: PropTypes.func,
  handleDialogUpdate: PropTypes.func,
  ChangeFlipped: PropTypes.func,
}

export default FlashCardFront
