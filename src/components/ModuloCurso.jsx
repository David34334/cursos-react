import React, { useEffect } from 'react';
import { Table, Divider } from 'antd';
import { useState } from 'react';
import Axios from "axios";

const columns = [
    {
        title: 'Clase',
        dataIndex: 'nombre_curso',
    },
    {
        title: 'Modulo',
        dataIndex: 'modulo',
    },
    {
        title: 'Descripcion',
        dataIndex: 'descripcion',
    },
];

const ModuloCurso = () => {

    const [idClase] = useState(localStorage.getItem('IDCOURSE'));
    const [curso, setCurso] = useState([]);

    const [state, setState] = useState({
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
    });

    useEffect(() => {
        Axios.post('http://localhost:8080/get-module', {
            idAlumnoClase: idClase
        }).then((response) => {
            console.log('XD', response.data);
            setCurso(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [setCurso, idClase]);

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setState({ selectedRowKeys });
    };

    const { selectedRowKeys } = state;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
        <>
            {
                curso.length > 0 ? (
                    <>
                        <div className="banner-modulo">
                            ¡Contenido del curso de {curso[0].nombre_curso}!
                        </div>
                        <Divider />
                        <div>
                            <div style={{ marginBottom: 16 }}>
                                <span style={{ marginLeft: 8 }}>
                                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                                </span>
                            </div>
                            <Table rowSelection={rowSelection} columns={columns} dataSource={curso} key={curso.id_alumno_clase} />
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            Cargando...
                        </div>
                    </>
                )
            }

        </>
    )
}

export default ModuloCurso
