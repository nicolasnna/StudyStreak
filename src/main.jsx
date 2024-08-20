import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import store from '@reducer/store.js'
import { ThemeProvider } from '@mui/material'
import theme from './theme/theme.js'
import './style.sass'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
)
