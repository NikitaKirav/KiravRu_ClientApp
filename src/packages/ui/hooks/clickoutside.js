import { useEffect } from 'react';
import { addEventListener } from './dom.js';

function useClickOutside(ref, onClickOutside) {
    useEffect(() => {
        const handleClick = event => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside(event);
            }
        };

        const offClick = addEventListener('click', handleClick),
            offTouch = addEventListener('touchstart', handleClick);

        return () => {
            offClick();
            offTouch();
        };
    }, [ref, onClickOutside]);
}

export default useClickOutside;
