import React from 'react';
import './top-logo-adm.less';


const TopLogoAdm = (props) => {
    return (
        <div className="logotip">
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