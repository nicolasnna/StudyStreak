import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import FlashCardButtons from './FlashCardButtons'

function FlashCardBack({
  text,
  manageMode, 
  handleDialog, 
  ChangeFlipped,
  handleDialogUpdate
}) {
  return (
    <Box 
      className="flash-card__back"
    >
      <FlashCardButtons
        manageMode={manageMode}
        handleDialog={handleDialog}
        ChangeFlipped={ChangeFlipped}
        handleDialogUpdate={handleDialogUpdate}
      >
        <div className='flash-card__content'>
          <Typography 
            variant="body1" 
            sx={{
              wordWrap: 'break-word'
            }}>
            {text}
          </Typography>
        </div>
      </FlashCardButtons>
    </Box>
  )
}

FlashCardBack.propTypes = {
  text: PropTypes.string,
  manageMode: PropTypes.bool,
  handleDialog: PropTypes.func,
  handleDialogUpdate: PropTypes.func,
  ChangeFlipped: PropTypes.func,
}

export default FlashCardBack
