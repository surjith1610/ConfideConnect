import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import './App.css'

import AppRoutes from './Routes';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    allVariants: {
      color: 'rgba(255, 255, 255, 0.87)', 
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <Router basename="/confideconnect">
          <AppRoutes />
        </Router>
      </Provider>
    </ThemeProvider>
  )
}

export default App
