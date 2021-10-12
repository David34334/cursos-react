import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { getUserStorage } from "../helpers/getUserStorage";
import {
    LoginOutlined
} from '@ant-design/icons';

const Navbar = () => {

    const [user] = useState(getUserStorage());
    const history = useHistory();

    const LogOutUser = () => {
        localStorage.removeItem('AuthUser');
        localStorage.removeItem('Username');
        history.push('/registro');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">CursosApp</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link active" aria-current="page" href="/home">Home</a>
                            <a className="nav-link" href="/home">About</a>
                        </div>
                    </div>
                    <button className="btn btn-outline-light mx-2" type="submit" onClick={LogOutUser}>
                    {
                        user.name && user.id ? <LoginOutlined /> : 'Registrarme'
                    }
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Navbar
