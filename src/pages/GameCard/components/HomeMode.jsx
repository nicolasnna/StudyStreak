import React from "react"
import PropTypes from "prop-types"
import { Box } from "@mui/material"
import CardLink from "@pages/Home/components/CardLink"
import { CardLinkGameMode } from "@utils/constants"

const HomeMode = (props) => {
  return (
    <Box className="home-mode-game">
      {CardLinkGameMode.map((c) => (
        <CardLink
          key={c.key}
          title={c.title}
          contentText={c.contentText}
          urlLink={c.urlLink}
        />
      ))}
    </Box>
  )
}

HomeMode.propTypes = {}

export default HomeMode
