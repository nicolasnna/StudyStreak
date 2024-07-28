import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    label: '',
    severity: 'success',
    color: 'success'
  },
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

export const { setNotification } = notificationSlice.actions

export const successNotification = (text) => {
  return async (dispatch) => {
    const option ={
      label: text,
      severity: 'success',
      color: 'success'
    }
    dispatch(setNotification(option))
  }
}

export const infoNotification = (text) => {
  return async (dispatch) => {
    const option ={
      label: text,
      severity: 'success',
      color: 'info'
    }
    dispatch(setNotification(option))
  }
}

export const errorNotification = (text) => {
  return async (dispatch) => {
    const option ={
      label: text,
      severity: 'error',
      color: 'error'
    }
    dispatch(setNotification(option))
  }
}

export default notificationSlice.reducer