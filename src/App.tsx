import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import theme from './theme';

import Login from './pages/Login';
import Contacts from './pages/Contacts';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='*' element={<Login/>} />
          <Route path='/contacts' element={<Contacts/>} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
