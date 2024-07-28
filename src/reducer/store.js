import { configureStore } from "@reduxjs/toolkit";
import cardReducer from './cardReducer'
import categoryReducer from "./categoryReducer";
import notificationReducer from "./notificationReducer";

const store = configureStore({
  reducer: {
    card: cardReducer,
    category: categoryReducer,
    notification: notificationReducer,
  } 
})

export default store