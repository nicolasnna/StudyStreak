import { configureStore } from "@reduxjs/toolkit";
import cardReducer from './cardReducer'
import toggleReducer from "./toggleReducer";

const store = configureStore({
  reducer: {
    card: cardReducer,
    toggle: toggleReducer
  } 
})

export default store