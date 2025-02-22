import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar = ({ auth, setAuth }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        setAuth(false);
        navigate('/login'); 
    };

    return (
        <nav className="navbar">
            <div className="logo">
               <h3><b><i>Book Donation</i></b></h3> 
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                {auth && <li><Link to="/dashboard">Dashboard</Link></li>}
                {auth && <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>}
                {!auth && <li><Link to="/login">Login</Link></li>}
                {!auth && <li><Link to="/register">Register</Link></li>}
            </ul>
        </nav>
    );
};

export default Navbar;
