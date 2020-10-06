import React from 'react';
import s from './footer.module.less';

const Footer = (props) => {
    return (
        <footer className={s.footer}>
            <div className={s.container}>
                <p className={s.copyright}>Copyright &copy; {new Date().getUTCFullYear()} - KiravRu</p>
            </div>
        </footer>
    );
}

export default Footer;