import { Box, Stack, Typography } from "@mui/material"
import Header from "../../components/Header"
import CardForm from "../../components/CardForm"
import FlashCard from "../../components/FlashCard"
import JsonManager from "../../components/JsonManager"
import { FontSize, PaddingSize } from "../../utils/constants"
import { useSelector } from "react-redux"
import useNotification from "../../hooks/useNotification"

const manageCardsStyle = {
  marginTop: '2em'
}

const ManageCards = () => {
  const cards = useSelector(state => state.card)
  const notification = useNotification()

  return (
    <Box sx={manageCardsStyle}>
      <notification.component/>
      <Header Text={"Crea, añade y revisa tus tarjetas"}/>
      <Stack 
        flexDirection={'row'}
        alignItems='center'
        justifyContent='center'
        gap={6}
        padding={PaddingSize.NORMAL}
      >
        <CardForm handleNotification={notification.handleOpen}/>
        <JsonManager handleNotification={notification.handleOpen}/>
      </Stack>
      <Stack
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent='center'
        padding={PaddingSize.NORMAL}
      >
        <Typography variant="h2" fontSize={FontSize.BIG}>
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
          {cards.map(c => 
            <FlashCard 
              key={c.id} 
              cardContent={c} 
              manageMode={true}
              handleNotification={notification.handleOpen}
            />
          )}
        </Stack>
      </Stack>
    </Box>
  )
}

export default ManageCards