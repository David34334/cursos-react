import React, { useEffect, useState } from 'react'
import Axios from "axios";

const Pago = () => {

    const [pago, setPago] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:8080/pagos').then((response) => {
            console.log(response.data);
            setPago(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [setPago]);

    return (
        <>
        <h2 className="text-center mt-2 mb-2">PASARELA DE PAGOS</h2>
            <div className="container">
                {
                    pago.map(item => (
                        <div className="card-pasarela" key={item.id_empresa}>
                            <button className="btn btn-sm">
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
