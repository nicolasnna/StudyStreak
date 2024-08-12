import ArticleIcon from '@mui/icons-material/Article';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCards } from "../reducer/cardReducer";
import { errorNotification, successNotification } from "../reducer/notificationReducer";
import { CardKeys } from "../utils/constants";
import { setCardLocal } from "../utils/localStorage";

const JsonManager = () => {
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
            //console.log("El json no tiene la estructura correcta")
          }
        } catch (error) {
          dispatch(errorNotification("El archivo no es un JSON valido"))
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
  }

  return (
    <Box className="json-manager">
      <Typography variant="h2" align="center">
        Exporta/Importa tus tarjetas
      </Typography>
      <Stack flexDirection={"row"} gap={2} justifyContent={'center'} alignItems={'center'}>
        <Button 
          className='button--primary json-manager__button' 
          onClick={handleExportCards}
          startIcon={<CloudDownloadIcon />}
        >
          Exportar
        </Button>
        <Typography variant="body2"><strong>O</strong></Typography>
        <Button
          component="label"
          className='button--primary json-manager__button'
          role={undefined}
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
      {showUpload && <Box className="json-manager__show-upload" >
        <List dense sx={{ width: '100%', maxHeight: 200, overflow: 'auto'}}>
          {dataUpload.map((c) => (
            <ListItem key={c.id} divider>
              <ListItemIcon className='json-manager__icon'>
                <ArticleIcon edge="start" disableRipple/>
              </ListItemIcon>
              <ListItemText primary={c.question}/>
            </ListItem>
          ))}
        </List>
        <Typography align="center" variant="h3">
          Se ha leído {dataUpload.length} tarjetas <br/> ¿Desea <strong className='accent'>importarlos</strong>?
        </Typography>
        <Stack flexDirection="row" alignItems="center" justifyContent='center'>
          <Button 
            className="button--primary json-manager__button" 
            onClick={handleSaveCards}
            startIcon={<SaveIcon/>}
          >
            <strong>
              Guardar
            </strong>
          </Button>
        </Stack>
      </Box>}
    </Box>
  )
}


export default JsonManager