import React from "react"
import PropTypes from "prop-types"
import { Box, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import LaunchIcon from "@mui/icons-material/Launch"

const CardLink = ({ title = "", contentText = "", urlLink = "" }) => {
  return (
    <Box className="card-link">
      <Typography className="card-link__title">{title}</Typography>
      <Typography className="card-link__content">{contentText}</Typography>
      <Box alignSelf={"end"} justifySelf={"end"}>
        <Link to={urlLink}>
          <Button
            sx={{ textTransform: "none", width: "5rem" }}
            className="button--secondary--active"
            endIcon={<LaunchIcon />}
          >
            Ir
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

CardLink.propTypes = {
  title: PropTypes.string,
  contentText: PropTypes.string,
  urlLink: PropTypes.string,
}

export default CardLink
