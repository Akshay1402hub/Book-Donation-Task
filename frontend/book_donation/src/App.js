import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import './styles/App.scss';

function App() {
    const [auth, setAuth] = useState(!!localStorage.getItem('token'));

    return (
        <Router>
            <Navbar auth={auth} setAuth={setAuth} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={
                     (() => {
                         if (auth) {
                         return <Navigate to="/dashboard" />;
                         } else {
                           return <Login setAuth={setAuth} />;
                         }
                     })()
                    } />

                <Route path="/register" element={
                    (() => {
                         if (auth) {
                         return <Navigate to="/dashboard" />;
                         } else {
                             return <Register setAuth={setAuth} />;
                        }
                        })()
                    } />

                <Route path="/dashboard" element={
                    (() => {
                        if (auth) {
                            return <Dashboard />;
                        } else {
                            return <Navigate to="/login" />;
                        }
                    })()
                } />

            </Routes>
        </Router>
    );
}

export default App;
