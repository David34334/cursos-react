import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    VideoCameraOutlined,
    YoutubeOutlined
} from '@ant-design/icons';
import Cursos from './CursosAlumno';
import { getUserStorage } from '../helpers/getUserStorage';
import HomeCursos from './HomeCursos';
import Pago from './Pago';
import DetalleCurso from './DetalleCurso';
import Login from './Login';
import ModuloCurso from './ModuloCurso';

const { Sider, Content } = Layout;

const Home = () => {

    const [user] = useState(getUserStorage());

    return (
        <>
            <Router>
                <Layout style={{ height: '100vh' }}>
                    <Sider collapsedWidth="0"
                        breakpoint="md"
                    >
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1" icon={<VideoCameraOutlined />}>
                                <Link to="/home-cursos">
                                    Cursos
                                </Link>
                            </Menu.Item>
                            {
                                (user.name && user.id) && (
                                    <>
                                        <Menu.Item key="2" icon={<UserOutlined />}>
                                            <Link to="/ingresar">
                                                Perfil
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item key="3" icon={<YoutubeOutlined />}>
                                            <Link to="/mis-cursos">
                                                Mis Cursos
                                            </Link>
                                        </Menu.Item>
                                    </>
                                )
                            }
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
                            <Switch>
                                <Route path="/registro" component={Login} />
                                <Route path="/detalle-curso" component={DetalleCurso} />
                                <Route path="/pago-curso" component={Pago} />
                                <Route path="/mis-cursos" component={Cursos} />
                                <Route path="/home-cursos" component={HomeCursos} />
                                <Route path="/modulo-curso" component={ModuloCurso} />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        </>
    )
}

export default Home
