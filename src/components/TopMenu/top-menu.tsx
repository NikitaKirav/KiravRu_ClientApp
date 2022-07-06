/** Absolute imports */
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import qs from 'qs';

/** Components */
import LoggedComponent from './components/Logged/logged-component';
import { NLogo } from './components/NLogo/n-logo';

/** Hooks */
import useClickOutside from '../../packages/ui/hooks/clickoutside';

/** Styles */
import s from './top-menu.module.less';

/** Store */
import { AppStateType } from '../../redux/redux-store';

/** SVG */
import { IconSearch } from '../../svg-icons/search';
import FindTextFormRedux from '../SearchBlog/search-notes';
import { actions, getArticles } from '../../redux/articles-reducer';


type MapStatePropsType = {
    isAuth: boolean;
    userName: string;
    navToggle: boolean;
    pageSize: number;
    addTextSearch: (searchText: string) => void;
    getArticles: (pageIndex: number, pageSize: number, s: string, sort?: string) => void;    
}

const TopMenu: React.FC<MapStatePropsType> = (props) => {
    const [showMenu, setShowMenu] = useState(false);
    const query = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const $menu = useRef(null);
    const $blockTopMenu = useRef(null);

    console.log(query);

    useEffect(() => {
        handleClickOutside($blockTopMenu);
    },[location])

    const onSearching = (values) => {
        navigate(`/notes?${qs.stringify({ ...query, s: values.searchText, page: 1 })}`);
        props.addTextSearch(values.searchText);
        props.getArticles(1, props.pageSize, values.searchText);
    }

    /*const onClickTogglerMenu = useCallback((event) => {
        setShowMenu(prev => !prev);
    },[showMenu]);*/

    const handleClickOutside = useCallback((event) => {
        showMenu && !$blockTopMenu.current.contains(event.target) && setShowMenu(false);
    },[showMenu]);


    useClickOutside($blockTopMenu, handleClickOutside);

    return (<>
        <nav ref={$blockTopMenu} className={classNames(s.top_menu, {
            [s.openMenu]: showMenu
        })}>
            <div className={s.content_menu}>
                <NavLink className={classNames(s.brand, props.navToggle ? s.active : '')} to="/"><NLogo /></NavLink>

                <div className={classNames(s.collapse,s.menu_collapse, {
                    [s.show]: showMenu
                })} ref={$menu}>
                    <ul className={s.menu_nav}>
                        <li className={s.menu_item}>
                            <NavLink to="/works" end={true} className={({isActive}) => isActive ? classNames(s.active,s.menu_link) : s.menu_link}>WORKS</NavLink>
                        </li>
                        {/*<li className={s.menu_item}>
                            <NavLink to="/blog" className={({isActive}) => isActive ? classNames(s.active,s.menu_link) : s.menu_link}>BLOG</NavLink>
                        </li>*/}
                        <li className={s.menu_item}>
                            <NavLink to="/notes" className={({isActive}) => isActive ? classNames(s.active,s.menu_link) : s.menu_link}>NOTES</NavLink>
                        </li>
                        <li className={s.menu_item}>
                            <NavLink to="/contacts" className={({isActive}) => isActive ? classNames(s.active,s.menu_link) : s.menu_link}>CONTACTS</NavLink>
                        </li>
                        {location.pathname === '/notes' &&
                        <li className={s.menu_item}>
                             <FindTextFormRedux onSubmit={onSearching}  />
                        </li>}
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
        </>
    );
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.authMain.isAuth,
    userName: state.authMain.userName,
    pageSize: state.blog.pageSize
})

export default connect(mapStateToProps, {addTextSearch: actions.addTextSearch, getArticles})(TopMenu);