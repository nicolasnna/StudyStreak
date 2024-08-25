import { Box, Typography } from "@mui/material"
import PropTypes from "prop-types";

const Header = ({Title = "", SubTitle = ""}) => {
  return (
    <Box
      className="header"
    >
      <Typography variant="h1"  >
        {Title}
      </Typography>

      {SubTitle && 
      <Typography variant="h2">
        {SubTitle}
      </Typography>
      }
    </Box>
  )
} 

Header.propTypes = {
  Title: PropTypes.string,
  SubTitle: PropTypes.string
}

export default Header