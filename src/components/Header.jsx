import { Box, Stack, Typography } from "@mui/material"
import PropTypes from "prop-types";
import { FontSize, PaddingSize } from "../utils/constants";

const Header = ({Title = "", SubTitle = ""}) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      padding={PaddingSize.NORMAL}
      gap={1}
    >
      <Typography variant="h1" fontSize={FontSize.TITLE} align="center">
        {Title}
      </Typography>

      {SubTitle && <Stack alignItems={"center"}>
        <Typography fontSize={FontSize.HIGH}>
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