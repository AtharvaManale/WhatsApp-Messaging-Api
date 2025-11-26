import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Login from './login'
import Home from './home'
import Contacts from './contacts'
import Navbar from './navbar'


function App() {
  const [access_token, setAccess_token] = useState(localStorage.getItem("access_token"));
  return (
    <>

      {access_token && <Navbar setAccess_token={setAccess_token} />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login setAccess_token={setAccess_token} />} />
        <Route path="/home" element={access_token ? <Home setAccess_token={setAccess_token} /> : <Navigate to="/login" />} />
        <Route path="/contacts" element={access_token ? <Contacts setAccess_token={setAccess_token} /> : <Navigate to="/login" />} />
      </Routes>
    </>
  )
}
export default App;
