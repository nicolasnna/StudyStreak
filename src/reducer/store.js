import { configureStore } from "@reduxjs/toolkit";
import cardReducer from './cardReducer'
import toggleReducer from "./toggleReducer";
import categoryReducer from "./categoryReducer";

const store = configureStore({
  reducer: {
    card: cardReducer,
    toggle: toggleReducer,
    category: categoryReducer
  } 
})

export default store