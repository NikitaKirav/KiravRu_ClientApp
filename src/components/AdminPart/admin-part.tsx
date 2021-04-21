import React, { useState, useCallback } from 'react';
import TopMenuAdm from './TopMenu/top-menu-adm';
import LeftMenuAdm from './LeftMenu/left-menu-adm';
import s from './admin-part.module.less';
import TopLogoAdm from './TopLogo/top-logo-adm';
import MainPartAdm from './MainPart/main-part-adm';
import FooterAdm from './Footer/footer-adm';
import classNames from'classnames';
import qs from 'qs';
import useLocationState from '../../packages/ui/hooks/location';
import './admin-part.css';

const AdminPart = () => {

    let [closeMenu, setCloseMenu] = useState(false);
    let [searchText, setSearchText] = useState('');
    let [{ query }, pushState] = useLocationState();

    const onToggleMenu = useCallback(() => {
        setCloseMenu(prev => !prev);
    },[])

    const onSearching = (values) => {
        pushState(`?${qs.stringify({...query, search: values.search})}`);
        setSearchText(values.search);
    }

    return ( <div className={classNames(s.adminPage, {
       [s.closeMenu]: closeMenu 
    })}>
        <div className={s.topMenu}><TopMenuAdm onToggleMenu={onToggleMenu} /></div>
        <div className={s.topLogo}><TopLogoAdm closeMenu={closeMenu} /></div>
        <div className={s.leftMenu}><LeftMenuAdm closeMenu={closeMenu} /></div>
        <div className={s.mainPart}><MainPartAdm searchText={searchText} /></div>
        <div className={s.footer}><FooterAdm /></div>
    </div>
    );
}


export default AdminPart;

