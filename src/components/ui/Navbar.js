import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startEventLogout } from '../../actions/events';

export const Navbar = () => {

    const { name } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch( startLogout() )
        dispatch( startEventLogout() )
    }

    return (
        <nav className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                { name }
            </span>

            <button 
                className="btn btn-outline-danger"
                onClick={ handleLogout }
            >
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>
            
        </nav>
    )
}
