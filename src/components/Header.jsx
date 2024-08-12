import { Box, Stack, Typography } from "@mui/material"
import PropTypes from "prop-types";

const Header = ({Title = "", SubTitle = ""}) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      padding={1}
      gap={1}
      marginBottom={5}
    >
      <Typography variant="h1" align="center" >
        {Title}
      </Typography>

      {SubTitle && <Stack alignItems={"center"}>
        <Typography variant="h2">
          {SubTitle}
        </Typography>
      </Stack>}
    </Box>
  )
} 

Header.propTypes = {
  Title: PropTypes.string,
  SubTitle: PropTypes.string
}

export default Header