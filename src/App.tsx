import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from './pages/Login';
import Contacts from './pages/Contacts';
import { Provider } from 'react-redux';
import store from './store';

import { ThemeProvider } from '@mui/material';
import theme from './theme';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='*' element={<Login/>} />
            <Route path='/contacts' element={<Contacts/>} />
          </Routes>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
