import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { getUserStorage } from '../helpers/getUserStorage';
import logo from "../img/banner.jpg";
import { Redirect, useHistory } from 'react-router';
import { ExceptionOutlined } from "@ant-design/icons";

const Cursos = () => {

    const history = useHistory();
    const [user] = useState(getUserStorage());
    const [cursosUser, setCursosUser] = useState([]);

    useEffect(() => {
        Axios.post('http://localhost:8080/my-courses', {
            id_alumno: user.id
        }).then((response) => {
            console.log('CURSOS DEL USUARIO: ', response.data);
            setCursosUser(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [setCursosUser, user.id]);

    if (!user.id || !user.name) {
        return <Redirect to="/registro" />
    }

    const getModulesCourse = (idCurso) => {
        localStorage.setItem('IDCOURSE', idCurso);
        history.push('/modulo-curso');
    }

    return (
        <>
            {
                (cursosUser.length > 0) ? (
                    <>
                        <div className="banner-cursos">
                            ¡Hola {user.name}!
                        </div>
                        <div className="container">
                            {
                                cursosUser.map(item => (
                                    <div className="card" key={item.id_alumno_clase}>
                                        <img src={logo} alt="" />
                                        <h4>{item.nombre_curso}</h4>
                                        <p>¡Comienza el curso!</p>
                                        <button className="btn btn-secondary btn-sm mt-4" onClick={(ev) => getModulesCourse(item.id_alumno_clase)}>Ver Contenido</button>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                ) : (
                    <>
                        <div className="alert alert-danger" role="alert">
                            <ExceptionOutlined /> ¡No has adquirido ningún curso!
                        </div>
                    </>
                )
            }

        </>
    )
}

export default Cursos
