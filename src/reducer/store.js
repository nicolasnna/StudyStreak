import { configureStore } from "@reduxjs/toolkit"
import cardReducer from "./cardReducer"
import categoryReducer from "./categoryReducer"
import notificationReducer from "./notificationReducer"
import gameReducer from "./gameReducer"

const store = configureStore({
  reducer: {
    card: cardReducer,
    category: categoryReducer,
    notification: notificationReducer,
    game: gameReducer,
  },
})

export default store
