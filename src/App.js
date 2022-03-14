//hello
import React, {useState, useMemo, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import AppRoutes from './components/UI/AppRouter';
import './stules/App.css';
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App;
