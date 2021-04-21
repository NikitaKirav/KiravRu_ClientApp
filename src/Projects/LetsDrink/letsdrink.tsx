import React, { useState } from 'react';
import s from './letsdrink.module.less';
import letsdrinkImage_001 from '../../../assets/images/letsdrink_001.jpg';
import letsdrinkImage_002 from '../../../assets/images/letsdrink_002.jpg';
import letsdrinkImage_003 from '../../../assets/images/letsdrink_003.jpg';
import letsdrinkImage_004 from '../../../assets/images/letsdrink_004.jpg';
import letsdrinkImage_005 from '../../../assets/images/letsdrink_005.jpg';
import letsdrinkImage_006 from '../../../assets/images/letsdrink_006.jpg';
import letsdrinkImage_007 from '../../../assets/images/letsdrink_007.jpg';
import { NavLink } from 'react-router-dom';


const LetsDrink = (props) => {

    return (
        <div className={s.letsdrink}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/projects">Projects</NavLink> / Let's drink</li>
                </ol>
            </nav>
            <h1>Let's drink</h1>
            <span><time className={s.blockTime}>NOVEMBER 20, 2019</time></span>
            <div className={s.contentText}>
                <p>This is an old project but I want to present it because it was really interesting and very big. 
                    My best friend gave me an idea with the brand name of our company. It sounds a bit boldly but pretty clear. 
                    The company name became <span className={s.textRed}>Let's drink...</span> Our productions include bar inventory, wine glasses, syrups, bar furniture etc.  
                    </p>
                    <p>I've created a design of our site, logotype and all necessary graphic productions. 
                    My business partner and I have chosen <span className={s.textGreen}>CMS OpenCart</span> (we liked admin part). Later, I built our sites (online shop and forum). 
                    The store had about 15.000 goods positions from different providers. We worked as intermediaries between the biggest companies and simple people. 
                    It was a very interesting online shop because it was automatically updated depending on changes in provider's sites. 
                    Every three hours such points as an availability of goods and their prices were updated.
                    My work included: design project, landing, SEO optimization, set up plugins and also developing new plugins by using PHP and JavaScript. </p>
                <img src={letsdrinkImage_001} className={s.letsdrinkImg} title="letsDrinkScreenShot" />  
                <img src={letsdrinkImage_002} className={s.letsdrinkImg} title="letsDrinkScreenShot" />  
                <img src={letsdrinkImage_003} className={s.letsdrinkImg} title="letsDrinkScreenShot" />       
                <img src={letsdrinkImage_004} className={s.letsdrinkImg} title="letsDrinkScreenShot" />     
                <img src={letsdrinkImage_005} className={s.letsdrinkImg} title="letsDrinkScreenShot" />    
                <img src={letsdrinkImage_006} className={s.letsdrinkImg} title="letsDrinkScreenShot" /> 
                <img src={letsdrinkImage_007} className={s.letsdrinkImg} title="letsDrinkScreenShot" />          
            </div>
        </div>
    );
}

export default LetsDrink;