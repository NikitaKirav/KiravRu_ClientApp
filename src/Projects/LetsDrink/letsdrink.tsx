/** Absolute imports */
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

/** Images */
import letsdrinkImage_001 from '../../../assets/images/letsdrink_001.jpg';
import letsdrinkImage_002 from '../../../assets/images/letsdrink_002.jpg';
import letsdrinkImage_003 from '../../../assets/images/letsdrink_003.jpg';
import letsdrinkImage_004 from '../../../assets/images/letsdrink_004.jpg';
import letsdrinkImage_005 from '../../../assets/images/letsdrink_005.jpg';
import letsdrinkImage_006 from '../../../assets/images/letsdrink_006.jpg';
import letsdrinkImage_007 from '../../../assets/images/letsdrink_007.jpg';
import letsdrinkImage_001_webp from '../../../assets/images/letsdrink_001.webp';
import letsdrinkImage_002_webp from '../../../assets/images/letsdrink_002.webp';
import letsdrinkImage_003_webp from '../../../assets/images/letsdrink_003.webp';
import letsdrinkImage_004_webp from '../../../assets/images/letsdrink_004.webp';
import letsdrinkImage_005_webp from '../../../assets/images/letsdrink_005.webp';
import letsdrinkImage_006_webp from '../../../assets/images/letsdrink_006.webp';
import letsdrinkImage_007_webp from '../../../assets/images/letsdrink_007.webp';

/** Styles */
import s from './letsdrink.module.less';

const LetsDrink = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    return (
        <div className={s.letsdrink}>
            <div><NavLink to="/works">Works</NavLink> / Let's drink</div>
            <div className={s.borderLineFat}></div>   
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
                    <picture>
                        <source srcSet={letsdrinkImage_001_webp} type="image/webp" />
                        <source srcSet={letsdrinkImage_001} type="image/jpg" />
                        <img src={letsdrinkImage_001} className={s.letsdrinkImg} title="letsDrinkScreenShot" /> 
                    </picture>
                    <picture>
                        <source srcSet={letsdrinkImage_002_webp} type="image/webp" />
                        <source srcSet={letsdrinkImage_002} type="image/jpg" />
                        <img src={letsdrinkImage_002} className={s.letsdrinkImg} title="letsDrinkScreenShot" /> 
                    </picture>
                    <picture>
                        <source srcSet={letsdrinkImage_003_webp} type="image/webp" />
                        <source srcSet={letsdrinkImage_003} type="image/jpg" />
                        <img src={letsdrinkImage_003} className={s.letsdrinkImg} title="letsDrinkScreenShot" /> 
                    </picture>
                    <picture>
                        <source srcSet={letsdrinkImage_004_webp} type="image/webp" />
                        <source srcSet={letsdrinkImage_004} type="image/jpg" />
                        <img src={letsdrinkImage_004} className={s.letsdrinkImg} title="letsDrinkScreenShot" /> 
                    </picture>
                    <picture>
                        <source srcSet={letsdrinkImage_005_webp} type="image/webp" />
                        <source srcSet={letsdrinkImage_005} type="image/jpg" />
                        <img src={letsdrinkImage_005} className={s.letsdrinkImg} title="letsDrinkScreenShot" /> 
                    </picture>
                    <picture>
                        <source srcSet={letsdrinkImage_006_webp} type="image/webp" />
                        <source srcSet={letsdrinkImage_006} type="image/jpg" />
                        <img src={letsdrinkImage_006} className={s.letsdrinkImg} title="letsDrinkScreenShot" /> 
                    </picture>
                    <picture>
                        <source srcSet={letsdrinkImage_007_webp} type="image/webp" />
                        <source srcSet={letsdrinkImage_007} type="image/jpg" />
                        <img src={letsdrinkImage_007} className={s.letsdrinkImg} title="letsDrinkScreenShot" /> 
                    </picture>
            </div>
        </div>
    );
}

export default LetsDrink;