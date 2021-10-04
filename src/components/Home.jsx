import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    VideoCameraOutlined,
    YoutubeOutlined,
} from '@ant-design/icons';
import logo from "../img/banner.jpg";
import Cursos from './Cursos';
import Axios from "axios";
import { render } from '@testing-library/react';
import Item from 'antd/lib/list/Item';

const { Sider, Content } = Layout;

const Home = () => {

    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:8080/cursos').then((response) => {
            console.log(response.data);
            setCursos(response.data);
        }).catch((error) => {
            console.log(error);
        });

    }, [setCursos]);

    return (
        <>
            <Router>
                <Layout style={{ height: '100vh' }}>
                    <Sider collapsedWidth="0"
                        breakpoint="md"
                    >
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1" icon={<VideoCameraOutlined />}>
                                <Link to="/cursos">
                                    Cursos
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<UserOutlined />}>
                                <Link to="/ingresar">
                                    Perfil
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<YoutubeOutlined />}>
                                <Link to="/crearticket">
                                    Mis Cursos
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280,
                            }}
                        >
                            <div className="banner-cursos">
                                ¡Bienvenido/a!
                            </div>
                            <div className="container">
                                {
                                    cursos.map(item => (
                                        <div className="card" key={item.id_curso}>
                                            <img src={logo} />
                                            <h4>{item.nombre_curso}</h4>
                                            <p>{item.descripcion}</p>
                                            <button className="btn btn-dark btn-sm">Acceder</button>
                                        </div>

                                    ))
                                }
                            </div>
                            <Switch>
                                <Route path="/cursos" component={Cursos} />
                                <Route path="/cola" />
                                <Route path="/crearticket" />
                                <Route path="/escritorio" />

                                <Redirect to="/ingresar" />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        </>
    )
}

export default Home
