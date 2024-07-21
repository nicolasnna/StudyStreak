import { configureStore } from "@reduxjs/toolkit";
import cardReducer from './cardReducer'

const store = configureStore({
  reducer: {
    card: cardReducer
  } 
})

export default store