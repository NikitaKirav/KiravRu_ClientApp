import React from "react";

import s from './banner.module.less';
import BannerEffectUrsa from './banner-effect-ursa.jsx';

const Banner = (props) => {

    return (
        <section className={`${s.component} ${s.baner}`}>
            <section className={s.wallpaper}>
                <div className={s.ava}><div id={s.avatar}></div></div>
                <h1 className={s.title}>Hi, I'm Nikita</h1>

                <BannerEffectUrsa height={468} paddingTop={57} />                
            </section>
        </section>
    );
}

export default Banner;