import React from 'react';
import s from './top-logo-adm.module.less';


const TopLogoAdm = (props) => {
    return (
        <div className={s.logotip}>
            <Logotip closeMenu={props.closeMenu} />
        </div>
    );
}

const Logotip = ({closeMenu}) => {
    if (!closeMenu) {
        return (<span>AdminMenu</span>);
    } else {
        return (<span>ADM</span>);
    }
}

export default TopLogoAdm;