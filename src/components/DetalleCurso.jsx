import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import logo from "../img/banner.jpg";
import Axios from "axios";
import { getUserStorage } from '../helpers/getUserStorage';

const DetalleCurso = () => {

    const [user] = useState(getUserStorage()); 
    const [curso, setCurso] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const curso_st = localStorage.getItem('curso_selected');
        Axios.post('http://localhost:8080/get-course', {
            idCurso: curso_st
        }).then((response) => {
            console.log(response.data);
            setCurso(response.data);
        });
    }, [setCurso]);

    const reciboPago = () => {
        history.push('/pago-curso');
    }

    if (!user.id || !user.name) {
        return <Redirect to="/registro" />
    }

    return (
        <div className="container">
            <h2 className="mt-4 mb-4">DESCRIPCIÓN DEL CURSO</h2>
            <hr />
            <div className="row box-detalles bg-dark">
                <div className="col detalles">
                    {
                        curso.map(item => (
                            <div className="container" key={item.id_curso}>
                                <input type="text" className="form-control mt-2 text-center fw-light" value={item.nombre_curso} disabled={true} />
                                <input type="text" className="form-control mt-2 text-center fw-lighter" value={item.descripcion} disabled={true} />
                                <input type="text" className="form-control mt-2 text-center fw-lighter" value={"$COP " + item.valor} disabled={true} />
                                <input type="text" className="form-control mt-2 text-center fw-lighter" value="DOCENTE CURSO" disabled={true} />
                            </div>
                        ))
                    }
                </div>
                <div className="col">
                    <img src={logo} alt="" />
                </div>
                <div className="d-grid gap-2">
                    <button type="button" className="btn btn-warning mt-2 mb-2" onClick={() => reciboPago()}>PAGAR</button>
                </div>
            </div>
        </div>
    )
}

export default DetalleCurso
