import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { startLogin, startRegister } from '../../actions/auth'

import './login.css';
import { removeError, setError } from '../../actions/ui';
import validator from 'validator';
import Swal from 'sweetalert2';


export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );

    const [ validEmail, setValidEmail ] = useState( false )
    const [ validPassword, setValidPassword ] = useState( false )

    const [ formLoginValues, handleLoginInputChange ] = useForm({
        lEmail: 'yenienserrano@gmail.com',
        lPassword: '123456'
    })

    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        rName: 'ian',
        rEmail: 'yenienserrano12@gmail.com',
        rPassword1: '123456',
        rPassword2: '123456'
    })

    const { lEmail, lPassword } = formLoginValues
    const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues

    const handleLogin = ( e ) => {
        e.preventDefault()
        
        if( isFormValid() ) {
            dispatch( startLogin( lEmail, lPassword ))
        }
    }

    const handleRegister = ( e ) => {
        e.preventDefault()

        if( rPassword1 === rPassword2 ){
            dispatch( startRegister( rName, rEmail, rPassword1 ) )
        } else {
            Swal.fire( 'error', 'Las contraseñas deben ser iguales', 'error')
        }
    } 

    const isFormValid = () => {
        if( !validator.isEmail( lEmail ) ){
            setValidEmail( true )
            dispatch(
                setError( 'Email is not valid' )
            )
            return false
        } else if( lPassword.length <= 5 ){
            setValidPassword( true )
            dispatch(
                setError( 'Password should be at least 6 caracters' )
            )
            return false
        }
        setValidEmail( false )
        setValidPassword( false )

        dispatch( removeError() )
        return true
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className={`form-control ${ validEmail && 'is-invalid' }`}
                                placeholder="Correo"
                                name="lEmail"
                                value={ lEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className={`form-control ${ validPassword && 'is-invalid' }`}
                                placeholder="Contraseña"
                                name="lPassword"
                                value={ lPassword }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                    {
                        msgError && (
                            <div className="alert alert-danger">
                                { msgError }
                            </div>
                        )
                    }
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={ rName }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={ rEmail }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="rPassword1"
                                value={ rPassword1 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="rPassword2"
                                value={ rPassword2 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}