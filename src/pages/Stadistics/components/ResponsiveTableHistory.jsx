import React from "react"
import PropTypes from "prop-types"
import TableHistory from "./TableHistory"
import useWindowSize from "@hooks/useWindowSize"
import { Box } from "@mui/material"

const ResponsiveTableHistory = (props) => {
  const { width } = useWindowSize()

  if (width < 768) {
    return (
      <div>
        La visualización de esta tabla no está disponible en pantallas pequeñas.
      </div>
    )
  }

  return <TableHistory />
}

ResponsiveTableHistory.propTypes = {}

export default ResponsiveTableHistory
