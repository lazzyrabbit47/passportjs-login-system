import React from  'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {

    render() {
        return(
            <div className="bg-dark">
                <nav className="navbar container navbar-dark navbar-expand-lg">
                    <Link to="/" className="navbar-brand">Mazad</Link>
                    <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                    <Link to="/login" className="nav-link">Login</Link>
                    </li>
                    </ul>
                    </div>
                </nav>
          </div>
        );
    }
}