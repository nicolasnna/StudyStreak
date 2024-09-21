import PropTypes from "prop-types"
import { Box, IconButton, Stack, Tooltip } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import FlipIcon from "@mui/icons-material/Flip"
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt"

const FlashCardButtons = ({
  children,
  manageMode,
  handleDialog,
  ChangeFlipped,
  handleDialogUpdate,
}) => {
  return (
    <>
      {manageMode && (
        <Stack
          flexDirection={"row"}
          justifyContent="end"
          className="flash-card__list-icons"
        >
          <Tooltip title="Eliminar">
            <IconButton onClick={handleDialog} aria-label="delete-button">
              <DeleteIcon className="flash-card__icon" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Voltear">
            <IconButton onClick={ChangeFlipped} aria-label="flip-button">
              <FlipIcon className="flash-card__icon" />
            </IconButton>
          </Tooltip>
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
          <Tooltip title="Actualizar información">
            <IconButton onClick={handleDialogUpdate} aria-label="update-button">
              <SystemUpdateAltIcon className="flash-card__icon" />
            </IconButton>
          </Tooltip>
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
