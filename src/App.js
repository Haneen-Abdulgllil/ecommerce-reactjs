import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MasterLayout from './layouts/admin/MasterLayout';
import Home from './components/front/Home';
import Register from './components/front/auth/Register';
import Login from './components/front/auth/Login';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;




function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/admin/*" element={<MasterLayout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

