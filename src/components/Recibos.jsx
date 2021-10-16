import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { getUserStorage } from '../helpers/getUserStorage';
import { ExceptionOutlined } from "@ant-design/icons";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { savePdf } from '../helpers/pdf';

const Recibos = () => {

    const [user] = useState(getUserStorage());
    const [recibos, setRecibos] = useState([]);
    const [recibo, setRecibo] = useState([]);

    useEffect(() => {
        Axios.post("http://localhost:8080/obtener-recibos", {
            idAlumno: user
        }).then((response) => {
            console.log('DATA RECIBOS', response.data);
            setRecibos(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [setRecibos, user]);

    const descargarRecibo = (idPago) => {
        console.log('ENTRE XD',idPago);
        generar_recibo(idPago);
    }

    const generar_recibo = (idPago) => {
        recibos.map(function (item) {
            if (item.id_pago === idPago) {
                setRecibo(item);
                console.log('RECIBO DESDE EL METODO',recibo.id_pago);
                savePdf(<MyDocument />, `Recibo-${recibo.id_pago}-${recibo.nombre_curso}`);
            }
            return '';
        });
    }

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });

    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text># Pago: {recibo.id_pago}</Text>
                    <Text>Nombre curso: {recibo.nombre_curso}</Text>
                    <Text>Valor: $COP {recibo.valor}</Text>
                    <Text>Método de pago: {recibo.nombre_empresa}</Text>
                    <Text>Correo: {recibo.correo}</Text>
                    <Text>Nombre: {recibo.nombre + " " + recibo.apellido}</Text>
                    <Text>Teléfono: {recibo.telefono}</Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <>
            {
                (recibos.length > 0) ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"># Pago</th>
                                <th scope="col">Curso</th>
                                <th scope="col">Valor</th>
                                <th scope="col">Metodo Pago</th>
                                <th scope="col">Nombre Estudiante</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Comprobante</th>
                            </tr>
                        </thead>
                        {
                            recibos.map(item => (
                                <tbody key={item.id_pago}>
                                    <tr>
                                        <th scope="row">{item.id_pago}</th>
                                        <td>{item.nombre_curso}</td>
                                        <td>{item.valor}</td>
                                        <td>{item.nombre_empresa}</td>
                                        <td>{item.nombre + " " + item.apellido}</td>
                                        <td>{item.correo}</td>
                                        <td><button className="btn btn-dark btn-sm" onClick={() => descargarRecibo(item.id_pago)}>Descargar</button></td>
                                    </tr>
                                </tbody>
                            ))
                        }
                    </table>
                ) : (
                    <>
                        <div className="alert alert-dark" role="alert">
                            <ExceptionOutlined /> ¡No has comprado ningún curso en la plataforma!
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Recibos
