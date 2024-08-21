import PropTypes from 'prop-types'
import { Box, IconButton, Stack } from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete";
import FlipIcon from "@mui/icons-material/Flip";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

const FlashCardButtons = ({
  children, 
  manageMode, 
  handleDialog,
  ChangeFlipped, 
  handleDialogUpdate 
}) => {
  return (
    <>
      {manageMode && (
        <Stack
          flexDirection={"row"}
          justifyContent="end"
          className="flash-card__list-icons"
        >
          <IconButton onClick={handleDialog} aria-label="delete-button">
            <DeleteIcon className="flash-card__icon"/>
          </IconButton>
          <IconButton onClick={ChangeFlipped} aria-label="flip-button">
            <FlipIcon  className="flash-card__icon"/>
          </IconButton>
        </Stack>
      )}
      {children}
      {manageMode && (
          <Box
            display="flex"
            flexDirection={"row"}
            justifyContent="start"
            className="flash-card__list-icons"
          >
            <IconButton onClick={handleDialogUpdate} aria-label="update-button">
              <SystemUpdateAltIcon  className="flash-card__icon"/>
            </IconButton>
          </Box>
        )}
    </>
  )
}

FlashCardButtons.propTypes = {
  children: PropTypes.object,
  manageMode: PropTypes.bool,
  handleDialog: PropTypes.func,
  ChangeFlipped: PropTypes.func,
  handleDialogUpdate: PropTypes.func,
}

export default FlashCardButtons