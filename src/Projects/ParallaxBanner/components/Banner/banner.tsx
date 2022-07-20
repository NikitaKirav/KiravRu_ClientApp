/** Absolute imports */
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/** Components */
import BannerEffectUrsa from './components/UrsaEffect/banner-effect-ursa';

/** Styles */
import classes from './banner.module.less';
import classNames from "classnames";

const Banner = () => {

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

    const parallax = (e: MouseEvent) => {
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
        <section className={`${classes.component} ${classes.baner}`}>
            <section className={classes.imageBackground}>
            <div id={classes.parallax} ref={parallaxRef}>
                <div className={classes.ava}><div id={classes.avatar}></div></div>
                <h2 className={classNames(classes.title, classes.animTypewriter1)}>Hi, I'm Nikita</h2>
                <h2 className={classNames(classes.title, classes.animTypewriter2)}>I'm a programmer</h2>              
            </div>
            </section>
            {window.innerWidth > 1200 ? <BannerEffectUrsa height={468} paddingTop={57} /> :''}
        </section>
    );
}

export default Banner;
