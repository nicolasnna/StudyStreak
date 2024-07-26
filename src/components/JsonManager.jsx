import { Box, Button, Paper, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { FontSize, PaddingSize } from "../utils/constants"
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { setCards } from "../redux/cardReducer"
import { setCardLocal } from "../utils/localStorage"

const JsonManager = () => {
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
            return keys.length === 3 && keys.includes('id') && keys.includes('front') && keys.includes('back') 
            })){
            dispatch(setCards(json))
            setCardLocal(json)
          } else {
            console.log("El json no tiene la estructura correcta")
          }
        } catch (error) {
          console.log("El archivo no es un JSON valido")  
        }
      }
      reader.readAsText(file)
    }
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
        Exporta/Importa tus flashcards
      </Typography>
      <Button variant="contained" onClick={handleExportCards}>
        Exportar
      </Button>
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
    </Box>
  )
}

export default JsonManager