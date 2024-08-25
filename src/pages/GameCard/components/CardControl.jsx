import { Button, Stack, Typography } from "@mui/material"
import PropTypes from "prop-types"

const CardControl = ({
  currentIndex,
  maxIndex,
  handlePrev,
  handleNext,
  handleShuffle,
  disablePrev = false,
  disableNext = false,
}) => {
  return (
    <Stack display={"flex"} gap={1}>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography variant="body1">
          {currentIndex + 1} / {maxIndex + 1}
        </Typography>
      </Stack>
      <Stack flexDirection={"row"} gap={4}>
        <Button
          disabled={disablePrev}
          className="button--primary"
          onClick={handlePrev}
        >
          <Typography variant="body1">Anterior</Typography>
        </Button>
        <Button className="button--secondary" onClick={handleShuffle}>
          <Typography variant="body1">Volver a barajar</Typography>
        </Button>
        <Button
          disabled={disableNext}
          className="button--primary"
          onClick={handleNext}
        >
          <Typography variant="body1">Siguiente</Typography>
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
  disableNext: PropTypes.bool,
}

export default CardControl
