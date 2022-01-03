import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logout from './logout';

export default class Header extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <ul className="navbar-nav">
                    <li className="nav-item" hidden={this.props.logged}>
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">Signup</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Logout />
                    </li>
                </ul>
            </nav>
        )
    }
}
