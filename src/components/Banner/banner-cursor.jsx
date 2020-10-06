import React, { useEffect, useRef } from 'react';
import s from './banner-cursor.module.less';
import { useLocation } from 'react-router';

const BannerCursor = (props) => {

    const EVENT_PLACEHOLDER = {
        clientX: window.innerWidth / 5,
        clientY: props.height / 5,
    };

    let $cursorReplacement = useRef(null);
    let lines = [];
    let location = useLocation();

    useEffect(() => {
        initEventListeners();
        onMouseMove(EVENT_PLACEHOLDER);
    });

    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
        };
    },[location])

    const initEventListeners = () => {
        document.addEventListener('mousemove', onMouseMove);
    }

    const onMouseMove = (e) => {
        if (e.clientY < props.height && e.clientY > props.paddingTop)
        {
            const mouseX = (100 * e.clientX / window.innerWidth).toFixed(2);
            const mouseY = (100 * e.clientY / props.height).toFixed(2);
            [].forEach.call(lines, (line) => {
                line.setAttribute('x2', mouseX);
                line.setAttribute('y2', mouseY);
            });
        }
    }

    return (
        <svg className={s.cursorReplacement} ref={$cursorReplacement} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line ref={line => {lines.push(line)}} x1="0" y1="0" x2="50" y2="50" stroke="#555" strokeWidth="0.1"></line>
        <line ref={line => {lines.push(line)}} x1="100" y1="0" x2="50" y2="50" stroke="#555" strokeWidth="0.1"></line>
        <line ref={line => {lines.push(line)}}  x1="100" y1="100" x2="50" y2="50" stroke="#555" strokeWidth="0.1"></line>
        <line ref={line => {lines.push(line)}}  x1="0" y1="100" x2="50" y2="50" stroke="#555" strokeWidth="0.1"></line>
        </svg>
    );
}

export default BannerCursor;