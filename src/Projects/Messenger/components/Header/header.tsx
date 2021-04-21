import React, {useContext, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Dropdown, Avatar, Row, Col, Layout, Button, Space } from 'antd';
import s from './header.module.less';
import { Link, RouteComponentProps, useHistory, useLocation } from 'react-router-dom';
import { LeftOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import { selectIsAuth, selectCurrentUserLogin } from '../../../../redux/project-messenger/auth-selectors';
import { getUserAvatar } from '../../../../redux/project-messenger/chat-reducer';
import { logout } from '../../../../redux/project-messenger/auth-reducer';
import { AuthContext } from '../../context/auth-context';
import { AppStateType } from '../../../../redux/redux-store';
import useSelection from 'antd/lib/table/hooks/useSelection';
import { size } from 'lodash';


export type MapStatePropsType = {
}

export const Header: React.FC<MapStatePropsType & RouteComponentProps> = (props) => {
    const isAuth = useSelector(selectIsAuth);
    const avatars = useSelector((state: AppStateType) => state.chat.data.userAvatar);
    const login = useSelector(selectCurrentUserLogin);
    const profile = useSelector((state: AppStateType) => { return state.profilePage.profile });
    const [localData, setLocalData] = useState({ userName: '', userId: '' });
    const location = useLocation();
    const history = useHistory();
    const [avatar, setAvatar] = useState('');
    const status = useSelector((state: AppStateType) => state.chat.status);

    const dispatch = useDispatch();

    const logoutCallback = () => {
        dispatch(logout());
        props.history.push('/projects/messenger/login');
    }

    useEffect(() => {
        if ((status === 'ready') && localData && (localData.userId !== '')) {
            dispatch(getUserAvatar(localData.userId));
        }
    }, [status, profile, location, localData]);

    useEffect(() => {
        if (localData && localData.userId !== '') {
            if(avatars && avatars.userAvatar) {
                setAvatar(avatars.userAvatar);
            }
        }
    }, [avatars, localData]);

    useEffect(() => {
        setLocalData(JSON.parse(localStorage.getItem('userData_Messanger'))); 
    }, [location])

    const menu = (
        <Menu className={s.menu}>
          <Menu.Item key="0">
            <Link to={'/projects/messenger'}>About this project</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <div onClick={logoutCallback}>Log out</div>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" disabled>
            © NikitaKirav
          </Menu.Item>
        </Menu>
      );

    const { Header } = Layout;

    return (
        <Header className={s.header}>
        <div className={s.comeBack}><Link to={`/projects`}><div style={{display: 'flex'}}><div style={{fontSize: '13px'}}><LeftOutlined /></div>
                        <span className={s.comeBackText}>Come back to Projects</span></div></Link></div>
        <div className="logo" />
        <Row className={s.headerRow}>
            { isAuth
                ? <>
                <div className={s.headerDropdown}>
                <Dropdown overlay={menu} className={s.headerMenu} placement="bottomRight">
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <span className={s.userName}>{localData && localData.userName}</span>
                        {avatar ? <Avatar style={{ margin: '10px' }} src={avatar} /> : <Avatar size={32} style={{ margin: '10px' }} icon={<UserOutlined />} /> }
                        <DownOutlined className={s.menuIcon} />
                    </a>
                </Dropdown>
                </div>
                    </> 
                : <div className={s.headerDropdown}>
                        <div className={s.loginRegister}>
                            <div>
                                <Button>
                                    <Link to={'/projects/messenger/login'}>Login</Link>
                                </Button>
                            </div>
                            <div style={{marginLeft: '20px'}}>
                                <Button>
                                    <Link to={'/projects/messenger/register'}>Register</Link>
                                </Button>
                            </div>
                        </div>
                    </div>    
            }
        </Row>            
        </Header>           
    );
}

/*<div className={s.header}>
    <div>This is messenger</div>
    <div className={s.loginBlock}>
        { props.isAuth 
            ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div> 
            : <NavLink to={'/projects/messenger/login'}>Login</NavLink>}
    </div>
</div> */