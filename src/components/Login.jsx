import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';

const Login = (props) => {

    //VARIABLE GLOBAL - CONTROL DE SESION
    const [isLogIn, setIsLogIn] = useState(false);
    const [messageLogIn, setMessageLogIn] = useState(null);

    //CONTROLAR REGISTRO O INICIO DE SESION
    const [esRegistro, setEsRegistro] = useState(true);
    const [error, setError] = React.useState(null);

    //VARIABLES REGISTRO
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    //VARIABLE LOGIN
    const [emailAdress, setEmailAdress] = useState('');
    const [passwordAuth, setPasswordAuth] = useState('');

    const register = () => {
        Axios.post('http://localhost:8080/register', {
            name: name,
            lastName: lastName,
            email: email,
            phone: phone,
            password: password
        }).then((response) => {
            console.log(response);
        });
    };

    const login = () => {
        Axios.post('http://localhost:8080/login', {
            email: emailAdress,
            password: passwordAuth
        }).then((response) => {
            console.log(response)
            if (response.data.message) {
                setMessageLogIn(response.data.message);
            } else{
                setIsLogIn(!isLogIn);
                props.history.push('/home');
            }
            console.log(isLogIn);
        });
    }

    const sendForm = (ev) => {
        ev.preventDefault();

        if (esRegistro) {
            if (!name.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !password.trim()) {
                setError('¡Debes rellenar todos los campos!');
                return
            }
            register();
            //Se limpian variables form
            setName('');
            setLastName('');
            setEmail('');
            setPhone('');
            setPassword('');
        } else {
            if (!emailAdress.trim() || !passwordAuth.trim()) {
                setError('¡Debes rellenar todos los campos!');
                return
            }
            login();
            //Se limpían variables form
            setEmailAdress('');
            setPasswordAuth('');
        }
    };

    //                            <input type="password" class="input" name="contrasena-repeat" placeholder="Repite tu contraseña"/>
    return (
        <>
            <div className="mt-5 form-access">
                <h3 className="text-center">{esRegistro ? '¡REGÍSTRATE!' : '¡INICIA SESIÓN!'}</h3>
                <hr />
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                        <form onSubmit={sendForm}>
                            {
                                error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )
                            }
                            {
                                (esRegistro) ? (
                                    <>
                                        <input type="text" className="form-control mt-1" name="nombre" placeholder="Ingresa tu nombre" value={name} onChange={(ev) => { setName(ev.target.value) }} />
                                        <input type="text" className="form-control mt-1" name="apellido" placeholder="Ingresa tu apellido" value={lastName} onChange={(ev) => { setLastName(ev.target.value) }} />
                                        <input type="email" className="form-control mt-1" name="correo" placeholder="Ingresa tu correo" value={email} onChange={(ev) => { setEmail(ev.target.value) }} />
                                        <input type="text" className="form-control mt-1" name="telefono" placeholder="Ingresa tu teléfono" value={phone} onChange={(ev) => { setPhone(ev.target.value) }} />
                                        <input type="password" className="form-control mt-1" name="contrasena" placeholder="Ingresa tu contraseña" value={password} onChange={(ev) => { setPassword(ev.target.value) }} />
                                    </>
                                ) : (
                                    <>
                                        {
                                            messageLogIn && (
                                                <div className="alert alert-danger" role="alert">
                                                    {messageLogIn}
                                                </div>
                                            )
                                        }
                                        <input type="email" className="form-control mt-1" name="correo" placeholder="Ingresa tu correo" value={emailAdress} onChange={(ev) => { setEmailAdress(ev.target.value) }} />
                                        <input type="password" className="form-control mt-1" name="contrasena" placeholder="Ingresa tu contraseña" value={passwordAuth} onChange={(ev) => { setPasswordAuth(ev.target.value) }} />
                                    </>
                                )

                            }
                            <div class="d-grid gap-2">
                                <button className="btn btn-dark btn-block mt-1" type="submit">{esRegistro ? 'Registrarse' : 'Iniciar Sesión'}</button>
                                <button className="btn btn-warning btn-sm btn-block " type="button" onClick={() => setEsRegistro(!esRegistro)}>
                                    {esRegistro ? '¿Ya tienes cuenta?' : '¿No tienes una cuenta?'}
                                </button>
                                <Link to="/home" className="btn btn-outline-success mt-2"> ¡Accede sin registro!</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="img-banner">

            </div>
        </>
    )
}

export default Login
