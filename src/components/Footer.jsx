import React from "react"
import PropTypes from "prop-types"
import { Box, Typography } from "@mui/material"
import GitHubIcon from "@mui/icons-material/GitHub"

const Footer = (props) => {
  return (
    <Box className="footer">
      <Typography>
        Desarrollado por{" "}
        <a
          className="footer__link"
          rel="noopener"
          target="_blank"
          href="https://github.com/nicolasnna"
        >
          Nicolás Norambuena
        </a>
      </Typography>
      <Box className="footer__project">
        <Typography>Study Streak</Typography>
        <a
          className="footer__link"
          rel="noopener"
          target="_blank"
          href="https://github.com/nicolasnna/study-streak"
        >
          <GitHubIcon />
        </a>
      </Box>
    </Box>
  )
}

Footer.propTypes = {}

export default Footer
