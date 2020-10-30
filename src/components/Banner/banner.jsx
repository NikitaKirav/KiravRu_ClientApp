import React, { useEffect, useRef, useState } from "react";

import s from './banner.module.less';
import BannerEffectUrsa from './banner-effect-ursa.jsx';
import { useLocation } from "react-router-dom";

const Banner = (props) => {

    let parallaxRef = useRef(null);
    let location = useLocation();

    useEffect(() => {
        if (window.innerWidth > 1200) {
            document.addEventListener("mousemove", parallax);
        }
    },[location]);

    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', parallax);
        };
    },[location]);

    const parallax = (e) => {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/2;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        if (_mouseY > 472)
        { _mouseY = 472; } 
        let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
        let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
        let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
        let x = `${_depth3}, ${_depth2}, ${_depth1}`;
        parallaxRef.current.style.backgroundPosition = x;
    }

    return (
        <section className={`${s.component} ${s.baner}`}>
            <section className={s.imageBackground}>
            <div id={s.parallax} ref={parallaxRef}>
                <div className={s.ava}><div id={s.avatar}></div></div>
                <h1 className={s.title}>Hi, I'm Nikita</h1>                 
            </div>
            </section>
            {window.innerWidth > 1200 ? <BannerEffectUrsa height={468} paddingTop={57} /> :''}
        </section>
    );
}

export default Banner;
