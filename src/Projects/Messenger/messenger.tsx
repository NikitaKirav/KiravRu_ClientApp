import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileContainer  from './components/Profile/profile-container';
import 'antd/dist/antd.css';
import './messenger.less';
import { Layout, Menu, Breadcrumb, Avatar, Row, Col, Button } from 'antd';
import { UserOutlined, MessageOutlined, TeamOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { Link, Route } from 'react-router-dom';
import { connect} from "react-redux";
import s from './messenger.module.less';
import  DialogsContainer  from './components/Dialogs/dialogs-container';
import  NavBarContainer  from './components/NavBar/navbar-container';
import  { UsersPage } from './components/Users/users-container';
import { LoginPage } from './components/Login/login';
import { initializeApp }   from '../../redux/project-messenger/app-reducer';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'redux';
import Preloader from '../../components/common/Preloader/preloader';
import { Header } from './components/Header/header';
import { ChatPage } from './pages/Chat/chat-page';
import { RegisterPage } from './components/Login/register';
import { AppStateType } from '../../redux/redux-store';
import { useAuth } from './hooks/auth.hook';
import { ChatList } from './pages/Chat/chat-list';
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/project-messenger/chat-reducer';
import { AboutPage } from './pages/About/about-page';

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

type MapStatePropsType = {
    initialized: boolean
}

type MapDispatchPropsType = {
    initializeApp: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

const Messenger: React.FC<PropsType & RouteComponentProps> = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        props.initializeApp();
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
    }, [])


    if (!props.initialized) {
        return <Preloader />
    }

    return (
        <Layout className={s.content}>
            <Header {...props} />
            <Content className={s.contentBlock}>
            <Layout className={s.layoutInfo}>
                    <Sider className={s.leftMenu} width={150} style={{ background: 'none' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', background: 'none' }}
                    >
                        <Menu.Item key="1"><Link to="/projects/messenger/profile"><UserOutlined />Profile</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/projects/messenger/users"><TeamOutlined />Users</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/projects/messenger/chatlist"><MessageOutlined />Chat</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/projects/messenger"><QuestionCircleOutlined />About this</Link></Menu.Item>
                    </Menu>
                    </Sider>
                <Content className={s.mainPart}>
                    <Route exact path='/projects/messenger' render={ () =>
                    <AboutPage /> } />
                    <Route path='/projects/messenger/profile/:userId?' component={ProfileContainer} />
                    
                    <Route path='/projects/messenger/dialogs' render={ () => 
                    <DialogsContainer /> } />

                    <Route path='/projects/messenger/users' render={ () =>
                    <UsersPage /> } />

                    <Route path='/projects/messenger/login' render={ () =>
                    <LoginPage /> } />

                    <Route path='/projects/messenger/register' render={ () =>
                    <RegisterPage /> } />
                    
                    <Route path='/projects/messenger/chat/:userId' component={ChatPage} />

                    <Route path='/projects/messenger/chatlist' render={ () =>
                    <ChatList /> } />
                </Content>
            </Layout>
            </Content>

            <Footer className={s.footerLong} style={{ textAlign: 'center', marginTop: 'auto' }}>NKMessanger ©2021 Created by Nikita Kirav</Footer>
            <div className={s.footerShort} style={{ textAlign: 'center', marginTop: 'auto' }}>
                <Menu
                    className={s.bottomMenu}
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                >
                    <Menu.Item key="1"><Link to="/projects/messenger/profile"><UserOutlined className={s.menuIcon} /></Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/projects/messenger/users"><TeamOutlined className={s.menuIcon} /></Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/projects/messenger/chatlist"><MessageOutlined className={s.menuIcon} /></Link></Menu.Item>
                    <Menu.Item key="4"><Link to="/projects/messenger"><QuestionCircleOutlined className={s.menuIcon} /></Link></Menu.Item>
                </Menu>
            </div>
        </Layout>
    );
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
});

export default compose<React.ComponentType>(
        withRouter,
        connect(mapStateToProps, {initializeApp}))(Messenger);                
        
