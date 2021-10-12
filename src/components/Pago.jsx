import React, { useEffect, useState } from 'react'
import Axios from "axios";
import { Redirect, useHistory } from 'react-router-dom';
import { getUserStorage } from "../helpers/getUserStorage";

const Pago = () => {

    const history = useHistory();
    const [pago, setPago] = useState([]);
    const [user] = useState(getUserStorage()); 

    useEffect(() => {
        Axios.get('http://localhost:8080/pagos').then((response) => {
            console.log(response.data);
            setPago(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [setPago]);

    const validarPago = (id_empresa) => {
        let id_curso = localStorage.getItem('curso_selected');
        Axios.post('http://localhost:8080/validar-pago', {
            id_alumno: localStorage.getItem('AuthUser'),
            idCurso: id_curso,
            id_empresa: id_empresa
        }).then((response) => {
            console.log(response.data.token);
            if (response.data.token) {
                history.push('/mis-cursos');
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    if (!user.id || !user.name) {
        return <Redirect to="/registro" />
    }

    return (
        <>
        <h2 className="text-center mt-2 mb-2">PASARELA DE PAGOS</h2>
            <div className="container">
                {
                    pago.map(item => (
                        <div className="card-pasarela" key={item.id_empresa}>
                            <button className="btn btn-sm" onClick={() => validarPago(item.id_empresa)}>
                                <img src={`${item.ruta_imagen}`} alt="" />
                            </button>
                            <h4>{item.nombre_empresa}</h4>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Pago
