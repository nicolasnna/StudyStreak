import { Box, CircularProgress, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { FontSize } from '../../../utils/constants'

const WaitCard = ({ 
  Title = "",
  Body1 = "Cargando tarjetas...",
  Body2 = "Si no ha añadido ninguna tarjeta, dirijase a la sección de 'Gestionar tarjetas'"
}) => {
  return (
    <Box display="flex" flexDirection={"column"} alignItems={"center"} justifyContent={"center"} padding={3} gap={1}>
      <Typography variant="h3" fontSize={FontSize.SUBTITLE} marginBottom={2}>{Title}</Typography>
      <CircularProgress />
      <Typography variant="body1" fontSize={FontSize.NORMAL}>{Body1}</Typography>
      <Typography variant="body2" fontSize={FontSize.SMALL}>{Body2}</Typography>
    </Box>
  )
}

WaitCard.propTypes = {
  Title: PropTypes.string,
  Body1: PropTypes.string,
  Body2: PropTypes.string
}

export default WaitCard