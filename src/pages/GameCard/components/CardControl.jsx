import { Button, Stack, Typography } from "@mui/material"
import { FontSize } from "../../../utils/constants"
import PropTypes from 'prop-types'

const CardControl = ({
  currentIndex,
  maxIndex,
  handlePrev,
  handleNext,
  handleShuffle,
  disablePrev = false,
  disableNext = false
}) => {
  return (
    <Stack display={"flex" } gap={1}>
      <Stack flexDirection={'row'} alignItems={"center"} justifyContent={"center"}>
          <Typography variant="body1" fontSize={FontSize.NORMAL}>
            {currentIndex+1} / {maxIndex+1}
          </Typography>
        </Stack>
        <Stack flexDirection={'row'} gap={4}>
          <Button 
            disabled={disablePrev} 
            variant="contained" 
            onClick={handlePrev}
          >
            <Typography fontSize={FontSize.NORMAL}>
            Anterior
            </Typography>
          </Button>
          <Button
            variant="outlined"
            onClick={handleShuffle}
          >
            <Typography fontSize={FontSize.NORMAL}>
            Volver a barajar
            </Typography>
          </Button> 
          <Button 
            disabled={disableNext} 
            variant="contained"
            onClick={handleNext}
          >
            <Typography fontSize={FontSize.NORMAL}>
            Siguiente
            </Typography>
          </Button>
        </Stack>
    </Stack>
  )
}

CardControl.propTypes = {
  currentIndex: PropTypes.number,
  maxIndex: PropTypes.number,
  handleNext: PropTypes.func,
  handlePrev: PropTypes.func,
  handleShuffle: PropTypes.func,
  disablePrev: PropTypes.bool,
  disableNext: PropTypes.bool
}

export default CardControl