import { Box, CircularProgress, Typography } from "@mui/material"
import PropTypes from "prop-types"

const WaitCard = ({
  Title = "",
  Body1 = "Cargando tarjetas...",
  Body2 = "Si no ha añadido ninguna tarjeta, dirijase a la sección de 'Gestionar tarjetas'",
  Body3 = "",
}) => {
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      padding={3}
      gap={1}
      className="wait-card"
    >
      <Typography variant="h3" marginBottom={2}>
        {Title}
      </Typography>
      <CircularProgress size="4rem" />
      <Typography variant="body1" fontSize={20}>
        <strong>{Body1}</strong>
      </Typography>
      <Typography variant="body2" fontSize={16}>
        {Body2}
      </Typography>
      <Typography variant="body2" fontSize={16}>
        {Body3}
      </Typography>
    </Box>
  )
}

WaitCard.propTypes = {
  Title: PropTypes.string,
  Body1: PropTypes.string,
  Body2: PropTypes.string,
  Body3: PropTypes.string,
}

export default WaitCard
