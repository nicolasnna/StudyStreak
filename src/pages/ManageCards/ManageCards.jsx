import { Box, Stack, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import CardForm from "../../components/CardForm"
import FlashCard from "../../components/FlashCard/FlashCard"
import Header from "../../components/Header"
import JsonManager from "../../components/JsonManager"

const manageCardsStyle = {
  marginTop: '2em'
}

const ManageCards = () => {
  const cards = useSelector(state => state.card)

  return (
    <Box sx={manageCardsStyle}>
      <Header 
        Title={"Gestiona tus Tarjetas de Estudio"}
        SubTitle=" Organiza, personaliza y mantén tu contenido actualizado."
      />
      <Stack 
        flexDirection={'row'}
        alignItems='center'
        justifyContent='center'
        gap={6}
        padding={1}
      >
        <CardForm />
        <JsonManager/>
      </Stack>
      <Stack
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent='center'
        padding={1}
      >
        <Typography variant="h2">
          Tarjetas creadas
        </Typography>
        <Stack
          flexDirection='row'
          flexWrap='wrap'
          gap={3}
          justifyContent={'center'}
          alignItems='center'
          marginTop='2em'
        >
          {cards.length === 0 && <Typography variant="body1">
            Añade tarjetas para poder visualizarlas aquí.
          </Typography>}
          {cards.map(c => 
            <FlashCard 
              key={c.id} 
              cardContent={c} 
              manageMode={true}
            />
          )}
        </Stack>
      </Stack>
    </Box>
  )
}

export default ManageCards