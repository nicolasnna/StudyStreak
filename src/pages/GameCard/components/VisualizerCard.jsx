import { Box, IconButton, Stack } from "@mui/material";
import PropTypes from 'prop-types'
import FlashCard from "../../../components/FlashCard";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const VisualizerCard = ({
  colorDownArrow = 'grey',
  colorUpArrow = 'grey',
  disableFlip = false,
  changeFrequency,
  cardContent,
}) => {

  const ClickUpArrow = (e) => {
    e.preventDefault()
    if (cardContent.revision_frequency !== 1) {    
      changeFrequency(1)
    } else {
      changeFrequency(0)
    }
  }
  const ClickDownArrow = (e) => {
    e.preventDefault()
    if (cardContent.revision_frequency !== -1) {
      changeFrequency(-1)
    } else {
      changeFrequency(0)
    }
  }

  return (
    <Stack
      flexDirection={"row"}
      gap={5}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box>
        <IconButton onClick={ClickDownArrow} aria-label="decrement-frequency">
          <ArrowDownwardIcon
            sx={{
              width: "3em",
              height: "3em",
              color: colorDownArrow,
            }}
          />
        </IconButton>
      </Box>
      <FlashCard cardContent={cardContent} disableFlip={disableFlip}/>
      <Box>
        <IconButton onClick={ClickUpArrow} aria-label="increment-frequency">
          <ArrowUpwardIcon
            sx={{
              width: "3em",
              height: "3em",
              color: colorUpArrow,
            }}
          />
        </IconButton>
      </Box>
    </Stack>
  );
};

VisualizerCard.propTypes = {
  colorDownArrow: PropTypes.string,
  colorUpArrow: PropTypes.string,
  cardContent: PropTypes.object,
  disableFlip: PropTypes.bool,
  changeFrequency: PropTypes.func
}

export default VisualizerCard;
