import { Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'

function FlashCardBack({text}) {
  return (
    <Stack>
      <Typography 
        variant="body1" 
        sx={{
          wordWrap: 'break-word'
        }}>
        {text}
      </Typography>
    </Stack>
  )
}

FlashCardBack.propTypes = {
  text: PropTypes.string
}

export default FlashCardBack
