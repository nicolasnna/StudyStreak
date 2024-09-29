import { Box, IconButton, Stack } from "@mui/material"
import PropTypes from "prop-types"
import FlashCard from "@components/FlashCard/FlashCard"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import { changeFrequency } from "@reducer/cardReducer"
import { useDispatch, useSelector } from "react-redux"
import { addFrequencyHistory } from "@reducer/stadisticReducer"

const VisualizerCard = ({
  disableFlip = false,
  showFront = true,
  cardContent,
  mode = "none",
  classExtra = "",
}) => {
  const cardList = useSelector((state) => state.card)
  const dispatch = useDispatch()

  const ClickUpArrow = (e) => {
    e.preventDefault()
    const newValue = cardContent.revision_frequency !== 1 ? 1 : 0
    dispatch(changeFrequency(newValue, cardContent.id, cardList))
    mode !== "none" &&
      dispatch(addFrequencyHistory(mode, newValue, cardContent.id))
  }

  const ClickDownArrow = (e) => {
    e.preventDefault()
    const newValue = cardContent.revision_frequency === -1 ? 0 : -1
    dispatch(changeFrequency(newValue, cardContent.id, cardList))
    mode !== "none" &&
      dispatch(addFrequencyHistory(mode, newValue, cardContent.id))
  }

  const UpArrow =
    cardList.filter((c) => c.id === cardContent.id)[0].revision_frequency === 1
      ? "green"
      : "grey"
  const DownArrow =
    cardList.filter((c) => c.id === cardContent.id)[0].revision_frequency === -1
      ? "red"
      : "grey"

  return (
    <Stack
      flexDirection={"row"}
      gap={5}
      alignItems={"center"}
      justifyContent={"center"}
      className={classExtra}
    >
      <Box>
        <IconButton onClick={ClickDownArrow} aria-label="decrement-frequency">
          <ArrowDownwardIcon
            sx={{
              width: "3em",
              height: "3em",
              color: DownArrow,
            }}
          />
        </IconButton>
      </Box>
      <FlashCard
        cardContent={cardContent}
        disableFlip={disableFlip}
        initialFlipped={!showFront}
      />
      <Box>
        <IconButton onClick={ClickUpArrow} aria-label="increment-frequency">
          <ArrowUpwardIcon
            sx={{
              width: "3em",
              height: "3em",
              color: UpArrow,
            }}
          />
        </IconButton>
      </Box>
    </Stack>
  )
}

VisualizerCard.propTypes = {
  colorDownArrow: PropTypes.string,
  colorUpArrow: PropTypes.string,
  cardContent: PropTypes.object,
  disableFlip: PropTypes.bool,
  changeFrequency: PropTypes.func,
  showFront: PropTypes.bool,
  mode: PropTypes.string,
  classExtra: PropTypes.string,
}

export default VisualizerCard
