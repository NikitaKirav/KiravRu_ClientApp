import React, { useState } from 'react';
import s from './left-menu-adm.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,  faPencilAlt, faListOl, faCogs, faUsers, faKey, faThumbsUp, faLock } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import SearchAdmin from './SearchBlock/search-adm';
import qs from 'qs';
import { connect } from 'react-redux';
import { actions } from '../../../redux/search-reducer';

type MapDispatchPropsType = {
    setSearchText: (searchText: string) => void
}
type OwnPropsType = {
    closeMenu: boolean
}

const LeftMenuAdm: React.FC<MapDispatchPropsType & OwnPropsType> = (props) => {

    const onSearching = (values) => {
        //pushState(`?${qs.stringify({...query, page: 1, search: values.search})}`);
        props.setSearchText(values.search);
    }

    return (
        <div className={s.menu}>
            <SearchAdmin onSubmit={onSearching} />
            <ul className={s.ulLeftMenu}>
                <li className={s.header}>
                {props.closeMenu ? <FontAwesomeIcon icon={faThumbsUp}/> : `HEADER`}
                </li>
                <li>
                    <NavLink end to="/adminBoard" className={({isActive}) => isActive ? s.activeMenu : ''}>
                        <div className={s.liLeftMenu}>
                            <FontAwesomeIcon icon={faHome} />
                            {props.closeMenu ? '' : <span>Main_Page</span>}
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/adminBoard/articles' className={({isActive}) => isActive ? s.activeMenu : ''}>
                        <div className={s.liLeftMenu}>                        
                                <FontAwesomeIcon icon={faPencilAlt} />
                                {props.closeMenu ? '' : <span>{`Articles_&_Notes`}</span>}                        
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/adminBoard/categories' className={({isActive}) => isActive ? s.activeMenu : ''}>
                        <div className={s.liLeftMenu}>
                            <FontAwesomeIcon icon={faListOl} />
                            {props.closeMenu ? '' : <span>Categories</span>}
                        </div>
                    </NavLink>
                </li>
                <li>
                    <div className={s.liLeftMenu}>
                        <FontAwesomeIcon icon={faCogs} />
                        {props.closeMenu ? '' : <span>Settings</span>}
                    </div>
                </li>
                <li className={s.header}>
                {props.closeMenu ? <FontAwesomeIcon icon={faLock}/> : `ACCESS`}
                </li>
                <li>
                    <NavLink to='/adminBoard/users' className={({isActive}) => isActive ? s.activeMenu : ''}>
                        <div className={s.liLeftMenu}>
                            <FontAwesomeIcon icon={faUsers} />
                            {props.closeMenu ? '' : <span>Users</span>}
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/adminBoard/roles' className={({isActive}) => isActive ? s.activeMenu : ''}>
                        <div className={s.liLeftMenu}>
                            <FontAwesomeIcon icon={faKey} />
                            {props.closeMenu ? '' : <span>Roles</span>}
                        </div>
                    </NavLink>
                </li>
            </ul>
        </div>
    ); 
}


export default connect(null, {setSearchText: actions.setSearchText})(LeftMenuAdm);