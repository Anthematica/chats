import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Home } from './components/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}> </Route>
        <Route path='login' element={<Login />}> </Route>
        <Route path='register' element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
