/** Absolute imports */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

/** Components */
import BannerCursor from '../Cursor/banner-cursor';

/** Styles */
import classes from './banner-effect-ursa.module.less';


type MapStatePropsType = {
    height: number
    paddingTop: number    
}

const BannerEffectUrsa: React.FC<MapStatePropsType> = (props) => {

    let linksPositions: Array<{x: number, y: number}> = [];
    let hoveredLinkIndex = -1;
    let texts = [];
    let links = [];
    let location = useLocation();

    useEffect(() => {
        initEventListeners();
        updateLinksPositions();
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

        [].forEach.call(links, (link: HTMLElement, index: number) => {
            link.addEventListener('mouseover', () => { onLinkMouseOver(index)});
            link.addEventListener('mouseout', () => { onLinkMouseOut(index) });
        });
    }

    const updateLinksPositions = () => {
        linksPositions = [].map.call(links, (link: HTMLElement) => {
            if (link && link.style) {
                const transform = link.style.transform;
                link.style.transform = `translateX(0) translateY(0)`;
                const rect = link.getBoundingClientRect();
                link.style.transform = transform;

                return {
                    x: (100 * (rect.left + window.scrollX) / window.innerWidth).toFixed(2),
                    y: (100 * (rect.top + window.scrollY) / props.height).toFixed(2)
                };
            }
            return {};
        });
    }

    const onMouseMove = (e: MouseEvent) => {
        const mouseX = parseInt((100 * e.clientX / window.innerWidth).toFixed(2));
        const mouseY = parseInt((100 * e.clientY / props.height).toFixed(2));

        [].forEach.call(links, (link: HTMLElement, index: number) => {
            const text = texts[index];
            const linkPosition = linksPositions[index];
            if (linkPosition) {
                const dx = linkPosition.x - mouseX;
                const dy = linkPosition.y - mouseY;
                const delta = Math.sqrt(dx * dx + dy * dy);
                const deltaXpx = window.innerWidth * dx / 100;
                const deltaYpx = props.height * dy / 100;

                if (link && link.style) {
                    link.style.transform = `translateX(${deltaXpx}px) translateY(${deltaYpx}px)`;
                    link.style.opacity = (1 / delta).toString();
                    text.style.opacity = 1 / delta;

                    if (hoveredLinkIndex === index) {
                        text.style.opacity = 1;
                    }
                }
            }
        });

    }

    const onLinkMouseOver = (index: number) => {
        const text = texts[index];
        hoveredLinkIndex = index;        
        [].forEach.call(text.querySelectorAll(`.${classes.navigation__text_layer}`), (layer: HTMLElement) => {
            layer.classList.add(classes.navigation__text_layer__glitch);
        });
    }

    const onLinkMouseOut = (index: number) => {
        const text = texts[index];
        hoveredLinkIndex = -1;
        [].forEach.call(text.querySelectorAll(`.${classes.navigation__text_layer}`), (layer: HTMLElement) => {
            layer.classList.remove(classes.navigation__text_layer__glitch);
        });
    }

    return (
        <>
        <div className={classes.navigation}>            
            <div className={classes.wrapper}>
                <NavLink className={classes.navigation__link} ref={link => {links.push(link)}} to="/?aboutme"><div ref={(text) => {texts.push(text)}} className={classes.navigation__text}><span className={classnames(classes.navigation__text_layer, classes.navigation__twoString)}>about me</span><span className={classnames(classes.navigation__text_layer, classes.navigation__twoString)}>about me</span><span className={classnames(classes.navigation__text_layer, classes.navigation__twoString)}>about me</span></div></NavLink>
                <NavLink ref={link => {links.push(link)}} className={classes.navigation__link} to="/contacts"><div ref={(text) => {texts.push(text)}} className={classes.navigation__text}><span className={classnames(classes.navigation__text_layer, classes.navigation__twoString)}>text me</span><span className={classnames(classes.navigation__text_layer, classes.navigation__twoString)}>text me</span><span className={classnames(classes.navigation__text_layer, classes.navigation__twoString)}>text me</span></div></NavLink>
                <NavLink ref={link => {links.push(link)}} className={classes.navigation__link} to="/works"><div ref={(text) => {texts.push(text)}} className={classes.navigation__text}><span className={classes.navigation__text_layer}>works</span><span className={classes.navigation__text_layer}>works</span><span className={classes.navigation__text_layer}>works</span></div></NavLink>
                <NavLink ref={link => {links.push(link)}} className={classes.navigation__link} to="/notes"><div ref={(text) => {texts.push(text)}} className={classes.navigation__text}><span className={classes.navigation__text_layer}>notes</span><span className={classes.navigation__text_layer}>notes</span><span className={classes.navigation__text_layer}>notes</span></div></NavLink>
            </div>
        </div>
        <BannerCursor height={props.height} paddingTop={props.paddingTop} />
        </>
    );
}

export default BannerEffectUrsa;