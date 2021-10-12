import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import logo from "../img/banner.jpg";
import Axios from "axios";
import { getUserStorage } from '../helpers/getUserStorage';

const HomeCursos = () => {

    const history = useHistory();
    const [user] = useState(getUserStorage());
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:8080/cursos').then((response) => {
            console.log(response.data);
            setCursos(response.data);
        }).catch((error) => {
            console.log(error);
        });

    }, [setCursos]);

    const courses_details = (id_curso) => {
        localStorage.setItem('curso_selected', id_curso);
        history.push('/detalle-curso');
    }

    return (
        <>
            <div className="banner-cursos">
                ¡Bienvenido/a {user.name}!
            </div>
            <div className="container">
                {
                    cursos.map(item => (
                        <div className="card" key={item.id_curso}>
                            <img src={logo} alt="" />
                            <h4>{item.nombre_curso}</h4>
                            <p>{item.descripcion}</p>
                            {
                                (user.name && user.id) && (
                                    <button className="btn btn-dark btn-sm" onClick={() => courses_details(item.id_curso)}>Acceder</button>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default HomeCursos
