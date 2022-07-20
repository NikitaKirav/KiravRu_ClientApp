/** Absolute imports */
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

/** Images */
import Banner from './components/Banner/banner';

/** Styles */
import s from './parallax-banner.module.less';

const ParallaxBanner = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    return (<>
        <Banner />
        <div className={s.parallaxBanner}>
            
            <div><NavLink to="/works">Works</NavLink> / ParallaxBanner</div>
            <div className={s.borderLineFat}></div>
            <h1>Parallax Banner</h1>
            <span><time className={s.blockTime}>SEPTEMBER 28, 2020</time></span>
            <div className={s.contentText}>
                <p>Banner with a parallax effect. The style of the banner was inspired by Durer's medieval engravings, alchemy and other various mysticism. 
                    Each element of the work has a double meaning. So in the center of the composition is a wheel with various signs.</p> 
                    <p>External signs represent 
                    graphic programs that I have worked with before or continue to work with. The internal Pentagon is programming languages and IT technologies 
                    familiar to me. In the center of this wheel is a stylized cartoon icon of a little man. Meet me - it's me! Behind the central circle there 
                    are clouds that move depending on the position of the mouse. They represent cloud technologies, without which there is nowhere now. 
                    Behind the clouds, the sun and moon are motionless, meaning my work in IT from morning to evening. </p>
                    <p>In addition, there is an animated 
                    navigation menu in front of the picture, which monitors the position of the mouse and gives additional dynamics to the work.</p> 
                <p><span className={s.textGreen}>Technologies Used:</span>
                    <span className={s.textRed}> JavaScript, Less, Photoshop, CorelDraw</span>
                </p>               
            </div>
        </div>
    </>);
}

export default ParallaxBanner;