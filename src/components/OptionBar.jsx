import { Button, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { changeForm, changeJsonManage } from "../reducer/toggleReducer"

const OptionBar = () => {
  const toggleOptions = useSelector(state => state.toggle)
  const dispatch = useDispatch()

  const handleCreate = () => {
    dispatch(changeForm())
  }

  const handleJsonManager = () => {
    dispatch(changeJsonManage())
  }

  return (
    <Stack justifyContent="center" flexDirection={"row"} gap={2}>
        {!toggleOptions.form && 
        <Button variant="contained" onClick={handleCreate}>
          <Typography>Crear</Typography>
        </Button>}
        {toggleOptions.form && 
        <Button variant="outlined" onClick={handleCreate}>
          <Typography>Esconder</Typography>
        </Button>}
        
        {!toggleOptions.jsonManage && 
        <Button variant="contained" onClick={handleJsonManager}>
          <Typography>Exportar/importar</Typography>
        </Button>}
        {toggleOptions.jsonManage && 
        <Button variant="outlined" onClick={handleJsonManager}>
          <Typography>Esconder</Typography>
        </Button>}


        <Button variant="contained">
          <Typography>Listar</Typography>
        </Button>
    </Stack>
  )
}

export default OptionBar