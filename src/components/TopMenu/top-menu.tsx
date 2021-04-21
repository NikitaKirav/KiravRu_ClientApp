import React, { useRef, useState, useCallback, useEffect } from 'react';
import useClickOutside from '../../packages/ui/hooks/clickoutside';
import s from './top-menu.module.less';
import { NavLink, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import LoggedComponent from './logged-component';
import classNames from 'classnames';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    isAuth: boolean
    userName: string
}

const TopMenu: React.FC<MapStatePropsType> = (props) => {
    let [showMenu, setShowMenu] = useState(false);
    let location = useLocation();

    useEffect(() => {
        handleClickOutside($blockTopMenu);
    },[location])

    const lineStyle = {
        marginBottom: '0px'
        };
    let $menu = useRef(null);
    let $blockTopMenu = useRef(null);

    const onClickTogglerMenu = useCallback((event) => {
        setShowMenu(prev => !prev);
    },[showMenu]);

    const handleClickOutside = useCallback((event) => {
        showMenu && !$blockTopMenu.current.contains(event.target) && setShowMenu(false);
    },[showMenu]);


    useClickOutside($blockTopMenu, handleClickOutside);

    return (
        <nav ref={$blockTopMenu} className={classNames(s.top_menu, {
            [s.openMenu]: showMenu
        })}>
            <div className={s.content_menu}>
                <NavLink className={s.brand} to="/">Nikita Kirav</NavLink>
                <button className={s.menu_toggler} type="button" onClick={onClickTogglerMenu}>
                    <span className={s.line}></span>
                    <span className={s.line}></span>
                    <span className={s.line} style={lineStyle}></span>
                </button>
                <div className={classNames(s.collapse,s.menu_collapse, {
                    [s.show]: showMenu
                })} ref={$menu}>
                    <ul className={s.menu_nav}>
                        <li className={s.menu_item}>
                            <NavLink className={s.menu_link} to="/?aboutme" exact={true} activeClassName={s.active}>AboutMe</NavLink>
                        </li>
                        <li className={s.menu_item}>
                            <NavLink className={s.menu_link} to="/blog" activeClassName={s.active}>Blog</NavLink>
                        </li>
                        <li className={s.menu_item}>
                            <NavLink className={s.menu_link} to="/projects" activeClassName={s.active}>Projects</NavLink>
                        </li>
                        <li className={s.menu_item}>
                            <ul className={classNames(s.menu_nav, s.menu_icon)}>
                                <li className={`${s.menu_item}`}>
                                    <LoggedComponent isAuth={props.isAuth} userName={props.userName} />
                                </li>
                            </ul>    
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.authMain.isAuth,
    userName: state.authMain.userName
})

export default connect(mapStateToProps, null)(TopMenu);