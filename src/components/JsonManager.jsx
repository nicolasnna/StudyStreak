import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { CardKeys, FontSize, PaddingSize } from "../utils/constants"
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import ArticleIcon from '@mui/icons-material/Article';
import { setCards } from "../reducer/cardReducer"
import { setCardLocal } from "../utils/localStorage"
import { useState } from "react"
import PropTypes from "prop-types";
import { errorNotification, successNotification } from "../reducer/notificationReducer";

const JsonManager = ({ handleNotification }) => {
  const [ dataUpload, setDataUpload ] = useState([])
  const [ showUpload, setShowUpload ] = useState(false)
  const flashCards = useSelector(state => state.card)
  const dispatch = useDispatch()

  const validateFileExtension = (file) => {  
    const nameExtension = file.name.split('.').pop();
    const acceptedTypes = ['json']
    const acceptedTypesLong = ['application/json']
    if (!acceptedTypes.includes(nameExtension)) {
      return false  
    }
    if(!acceptedTypesLong.includes(file.type)) {
      return false
    }
    return true
  }

  const handleExportCards = () => {
    const fileToSave = new Blob([JSON.stringify(flashCards, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(fileToSave)
    const a = document.createElement('a')
    a.href = url
    a.download = "flashcards.json"
    a.click()
    URL.revokeObjectURL(url)
  }
  
  const handleImportCards = (event) => {
    const file = event.target.files[0]
    if(validateFileExtension(file)) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result)
          if ( Array.isArray(json) && json.every(obj => {
            const keys = Object.keys(obj)
            return keys.length === CardKeys.length && CardKeys.every(k => keys.includes(k))
            })){
            setDataUpload(json)
            setShowUpload(true)
          } else {
            dispatch(errorNotification("El json no tiene la estructura correcta"))
            handleNotification()
            //console.log("El json no tiene la estructura correcta")
          }
        } catch (error) {
          dispatch(errorNotification("El archivo no es un JSON valido"))
          handleNotification()
          //console.log("El archivo no es un JSON valido")  
        } 
      }
      reader.readAsText(file)
    }
  }

  const handleSaveCards = () => {
    dispatch(setCards(dataUpload))
    setCardLocal(dataUpload)
    setShowUpload(false)
    setDataUpload([])
    dispatch(successNotification("Se ha subido las tarjetas corectamente"))
    handleNotification()
  }

  return (
    <Box component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: PaddingSize.NORMAL
      }}  
    >
      <Typography variant="h2" fontSize={FontSize.BIG} align="center">
        Exporta/Importa tus tarjetas
      </Typography>
      <Stack flexDirection={"row"} gap={2} justifyContent={'center'} alignItems={'center'}>
        <Button variant="contained" onClick={handleExportCards}>
          Exportar
        </Button>
        <Typography fontSize={FontSize.NORMAL}>O</Typography>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Importar
          <input
            accept=".json"
            style={{ display: 'none' }}
            type="file"
            onChange={handleImportCards}
          />
        </Button>
      </Stack>
      {showUpload && <Box>
        <Typography align="center" fontSize={FontSize.HIGH}>Se ha leído {dataUpload.length} tarjetas <br/> ¿Desea importarlos?</Typography>
        <Stack flexDirection="row" alignItems="center" justifyContent='center'>
          <Button width={20} variant="contained" onClick={handleSaveCards}>Guardar</Button>
        </Stack>
        <List dense sx={{ width: '100%', maxHeight: 200, overflow: 'auto'}}>
          {dataUpload.map((c) => (
            <ListItem key={c.id} divider>
              <ListItemIcon>
                <ArticleIcon edge="start" disableRipple/>
              </ListItemIcon>
              <ListItemText primary={c.question}/>
            </ListItem>
          ))}
        </List>
      </Box>}
    </Box>
  )
}

JsonManager.propTypes = {
  handleNotification: PropTypes.func
}

export default JsonManager