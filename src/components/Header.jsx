import { Box, Typography } from "@mui/material"
import PropTypes from "prop-types";
import { FontSize, PaddingSize } from "../utils/constants";

const Header = ({Text}) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      padding={PaddingSize.NORMAL}
    >
      <Typography variant="h1" fontSize={FontSize.TITLE} align="center">{Text}</Typography>
    </Box>
  )
} 

Header.propTypes = {
  Text: PropTypes.string
}

export default Header