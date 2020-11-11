import React, { useEffect } from 'react';
import BannerCursor from './banner-cursor.jsx';
import s from './banner-effect-ursa.module.less';
import { useLocation } from 'react-router';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

const BannerEffectUrsa = (props) => {
    const EVENT_PLACEHOLDER = {
        clientX: window.innerWidth / 5,
        clientY: window.innerHeight / 5,
    };

    let linksPositions = [];
    let hoveredLinkIndex = -1;
    let texts = [];
    let links = [];
    let location = useLocation();

    useEffect(() => {
        initEventListeners();
        updateLinksPositions();
        onMouseMove(EVENT_PLACEHOLDER); 
    });

    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', updateLinksPositions);
        };
    },[location]);
    
    const initEventListeners = () => {
        document.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', updateLinksPositions);

        [].forEach.call(links, (link, index) => {
            link.addEventListener('mouseover', () => { onLinkMouseOver(index)});
            link.addEventListener('mouseout', () => { onLinkMouseOut(index) });
        });
    }

    const updateLinksPositions = () => {
        linksPositions = [].map.call(links, (link) => {
            const transform = link.style.transform;
            link.style.transform = `translateX(0) translateY(0)`;
            const rect = link.getBoundingClientRect();
            link.style.transform = transform;

            return {
                x: (100 * (rect.left + window.scrollX) / window.innerWidth).toFixed(2),
                y: (100 * (rect.top + window.scrollY) / props.height).toFixed(2)
            };
        });
    }

    const onMouseMove = (e) => {
        const mouseX = (100 * e.clientX / window.innerWidth).toFixed(2);
        const mouseY = (100 * e.clientY / props.height).toFixed(2);

        [].forEach.call(links, (link, index) => {
            const text = texts[index];
            const linkPosition = linksPositions[index];

            const dx = linkPosition.x - mouseX;
            const dy = linkPosition.y - mouseY;
            const delta = Math.sqrt(dx * dx + dy * dy);
            const deltaXpx = window.innerWidth * dx / 100;
            const deltaYpx = props.height * dy / 100;

            link.style.transform = `translateX(${deltaXpx}px) translateY(${deltaYpx}px)`;
            link.style.opacity = 1 / delta;
            text.style.opacity = 1 / delta;

            if (hoveredLinkIndex === index) {
                text.style.opacity = 1;
            }
        });

    }

    const onLinkMouseOver = (index) => {
        const text = texts[index];
        hoveredLinkIndex = index;        
        [].forEach.call(text.querySelectorAll(`.${s.navigation__text_layer}`), (layer) => {
            layer.classList.add(s.navigation__text_layer__glitch);
        });
    }

    const onLinkMouseOut = (index) => {
        const text = texts[index];
        hoveredLinkIndex = -1;
        [].forEach.call(text.querySelectorAll(`.${s.navigation__text_layer}`), (layer) => {
            layer.classList.remove(s.navigation__text_layer__glitch);
        });
    }

    return (
        <>
        <div className={s.navigation}>            
            <div className={s.wrapper}>
                <NavLink className={s.navigation__link} ref={link => {links.push(link)}} to="/?aboutme"><div ref={(text) => {texts.push(text)}} className={s.navigation__text}><span className={classnames(s.navigation__text_layer, s.navigation__twoString)}>about me</span><span className={classnames(s.navigation__text_layer, s.navigation__twoString)}>about me</span><span className={classnames(s.navigation__text_layer, s.navigation__twoString)}>about me</span></div></NavLink>
                <NavLink ref={link => {links.push(link)}} className={s.navigation__link} to="/?textme"><div ref={(text) => {texts.push(text)}} className={s.navigation__text}><span className={classnames(s.navigation__text_layer, s.navigation__twoString)}>text me</span><span className={classnames(s.navigation__text_layer, s.navigation__twoString)}>text me</span><span className={classnames(s.navigation__text_layer, s.navigation__twoString)}>text me</span></div></NavLink>
                <NavLink ref={link => {links.push(link)}} className={s.navigation__link} to="/projects"><div ref={(text) => {texts.push(text)}} className={s.navigation__text}><span className={s.navigation__text_layer}>works</span><span className={s.navigation__text_layer}>works</span><span className={s.navigation__text_layer}>works</span></div></NavLink>
                <NavLink ref={link => {links.push(link)}} className={s.navigation__link} to="/blog"><div ref={(text) => {texts.push(text)}} className={s.navigation__text}><span className={s.navigation__text_layer}>blog</span><span className={s.navigation__text_layer}>blog</span><span className={s.navigation__text_layer}>blog</span></div></NavLink>
            </div>
        </div>
        <BannerCursor height={props.height} paddingTop={props.paddingTop} />
        </>
    );
}

export default BannerEffectUrsa;