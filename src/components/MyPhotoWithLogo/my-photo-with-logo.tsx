/** Absolute imports */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

/** Styles */
import classes from './my-photo-with-logo.module.less';

/** Images */
import my_photo1_path from "../../../assets/images/photo2v2-min.png";
import my_photo2_path from "../../../assets/images/photo1v3-min.png";
import my_photo2_webp_path from "../../../assets/images/photo1v3-min.webp";
import my_photo1_webp_path from "../../../assets/images/photo2v2-min.webp";
import my_photo1_small_path from "../../../assets/images/photo2v1-small-min.png";
import my_photo2_small_path from "../../../assets/images/photo1v1-small-min.png";
import my_photo1_webp_small_path from "../../../assets/images/photo2v1-small-min.webp";
import my_photo2_webp_small_path from "../../../assets/images/photo1v1-small-min.webp";
import my_photo1_medium_path from "../../../assets/images/photo2v1-medium-min.png";
import my_photo2_medium_path from "../../../assets/images/photo1v1-medium-min.png";
import my_photo1_webp_medium_path from "../../../assets/images/photo2v1-medium-min.webp";
import my_photo2_webp_medium_path from "../../../assets/images/photo1v1-medium-min.webp";
import my_photo1_637_542_path from "../../../assets/images/photo2v1-micro_637-542-min.png";
import my_photo1_542_461_path from "../../../assets/images/photo2v1-micro_542-461-min.png";
import my_photo1_409_348_path from "../../../assets/images/photo2v1-micro_409-348-min.png";
import my_photo1_290_247_path from "../../../assets/images/photo2v1-micro_290-247-min.png";
import my_photo1_webp_637_542_path from "../../../assets/images/photo2v1-micro_637-542-min.webp";
import my_photo1_webp_542_461_path from "../../../assets/images/photo2v1-micro_542-461-min.webp";
import my_photo1_webp_409_348_path from "../../../assets/images/photo2v1-micro_409-348-min.webp";
import my_photo1_webp_290_247_path from "../../../assets/images/photo2v1-micro_290-247-min.webp";

import logo1_path from "../../../assets/images/logo1-v2-min.png";
import logo1_webp_path from "../../../assets/images/logo1-v2-min.webp";
import logoKirav_path from "../../../assets/images/logoKirav-v2-min.png";
import logoNikita_path from "../../../assets/images/logoNikita-v2-min.png";
import logoKirav_webp_path from "../../../assets/images/logoKirav-v2-min.webp";
import logoNikita_webp_path from "../../../assets/images/logoNikita-v2-min.webp";
import logoKirav_58_219_path from "../../../assets/images/logoKirav-micro-58-219.png";
import logoKirav_50_189_path from "../../../assets/images/logoKirav-micro-50-189.png";
import logoKirav_38_144_path from "../../../assets/images/logoKirav-micro-38-144.png";
import logoKirav_26_99_path from "../../../assets/images/logoKirav-micro-26-99.png";
import logoKirav_webp_58_219_path from "../../../assets/images/logoKirav-micro-58-219.webp";
import logoKirav_webp_50_189_path from "../../../assets/images/logoKirav-micro-50-189.webp";
import logoKirav_webp_38_144_path from "../../../assets/images/logoKirav-micro-38-144.webp";
import logoKirav_webp_26_99_path from "../../../assets/images/logoKirav-micro-26-99.webp";
import logoNikita_58_268_path from "../../../assets/images/logoNikita-micro-58-268.png";
import logoNikita_50_231_path from "../../../assets/images/logoNikita-micro-50-231.png";
import logoNikita_38_176_path from "../../../assets/images/logoNikita-micro-38-176.png";
import logoNikita_26_120_path from "../../../assets/images/logoNikita-micro-26-120.png";
import logoNikita_webp_58_268_path from "../../../assets/images/logoNikita-micro-58-268.webp";
import logoNikita_webp_50_231_path from "../../../assets/images/logoNikita-micro-50-231.webp";
import logoNikita_webp_38_176_path from "../../../assets/images/logoNikita-micro-38-176.webp";
import logoNikita_webp_26_120_path from "../../../assets/images/logoNikita-micro-26-120.webp";
import logoKirav_medium_path from "../../../assets/images/logoKirav-medium-v1-min.png";
import logoNikita_medium_path from "../../../assets/images/logoNikita-medium-v1-min.png";
import logoKirav_webp_medium_path from "../../../assets/images/logoKirav-medium-v1-min.webp";
import logoNikita_webp_medium_path from "../../../assets/images/logoNikita-medium-v1-min.webp";

const media_min_1801  = "(min-width: 1801px)";
const media_1361_1800 = "(min-width: 1361px) and (max-width: 1800px)";
const media_1060_1360 = "(min-width: 1060px) and (max-width: 1360px)";
const media_956_1059  = "(min-width: 956px) and (max-width: 1059px)";
const media_815_955   = "(min-width: 815px) and (max-width: 955px)";
const media_619_814   = "(min-width: 619px) and (max-width: 814px)";
const media_380_618   = "(min-width: 380px) and (max-width: 618px)";
const media_max_618   = "(max-width: 618px)";

const png = "image/png";
const webp = "image/webp";

export const MyPhotoWithLogo = () => {

    const [isOnLeftPartOfScreen, setIsOnLeftPartOfScreen] = useState(false);
    const [image1Loaded, setImage1Loaded] = useState(false);
    const [image2Loaded, setImage2Loaded] = useState(false);
    const [logoLoaded, setLogoLoaded] = useState(false);

    const handleMouseMove = (ev) => {
        if (window.innerWidth/2 > ev.pageX) 
            setIsOnLeftPartOfScreen(false); 
        else
            setIsOnLeftPartOfScreen(true); 
    }
    
    return (
        <div className={classes.conteiner} onMouseMove={(ev)=> handleMouseMove(ev)}>
            <picture>
                <source srcSet={logoNikita_webp_medium_path} media={media_1361_1800} type={webp} />
                <source srcSet={logoNikita_medium_path}      media={media_1361_1800} type={png} />
                <source srcSet={logoNikita_webp_path}        media={media_1060_1360} type={webp} />
                <source srcSet={logoNikita_path}             media={media_1060_1360} type={png} />
                <source srcSet={logoNikita_webp_58_268_path} media={media_956_1059}  type={webp} />
                <source srcSet={logoNikita_58_268_path}      media={media_956_1059}  type={png} />
                <source srcSet={logoNikita_webp_50_231_path} media={media_815_955}   type={webp} />
                <source srcSet={logoNikita_50_231_path}      media={media_815_955}   type={png} />
                <source srcSet={logoNikita_webp_38_176_path} media={media_619_814}   type={webp} />
                <source srcSet={logoNikita_38_176_path}      media={media_619_814}   type={png} />
                <source srcSet={logoNikita_webp_26_120_path} media={media_380_618}   type={webp} />
                <source srcSet={logoNikita_26_120_path}      media={media_380_618}   type={png} />
                <img alt="logo_Nikita" className={classNames(classes.logoNikita, isOnLeftPartOfScreen ? classes.left : classes.right)} style={image1Loaded || image2Loaded ? {} : {display: 'none'}} onLoad={() => setLogoLoaded(true)} />
            </picture>
            
            <div style={image1Loaded || image2Loaded ? {} : {display: 'none'}} className={classNames(classes.logoAboutFrontend, isOnLeftPartOfScreen ? classes.left : classes.right)}>Frontend &nbsp; {'&'}</div>            
            <picture>
                <source srcSet={my_photo1_webp_path}         media={media_min_1801}  type={webp} />
                <source srcSet={my_photo1_path}              media={media_min_1801}  type={png} />
                <source srcSet={my_photo1_webp_medium_path}  media={media_1361_1800} type={webp} />
                <source srcSet={my_photo1_medium_path}       media={media_1361_1800} type={png} />
                <source srcSet={my_photo1_webp_small_path}   media={media_1060_1360} type={webp} />
                <source srcSet={my_photo1_small_path}        media={media_1060_1360} type={png} />
                <source srcSet={my_photo1_webp_637_542_path} media={media_956_1059}  type={webp} />
                <source srcSet={my_photo1_637_542_path}      media={media_956_1059}  type={png} />
                <source srcSet={my_photo1_webp_542_461_path} media={media_815_955}   type={webp} />
                <source srcSet={my_photo1_542_461_path}      media={media_815_955}   type={png} />
                <source srcSet={my_photo1_webp_409_348_path} media={media_619_814}   type={webp} />
                <source srcSet={my_photo1_409_348_path}      media={media_619_814}   type={png} />
                <source srcSet={my_photo1_webp_290_247_path} media={media_max_618}   type={webp} />
                <source srcSet={my_photo1_290_247_path}      media={media_max_618}   type={png} />
                <img style={image1Loaded ? {} : {display: 'none'}} alt="My_photo_1" className={classes.myPhoto1} onLoad={() => setImage1Loaded(true)} />
            </picture>   
            <h1 className={classes.titleIamNikita}>Hi, I'm Nikita</h1>   
            <picture>
                <source srcSet={my_photo2_webp_path}        media={media_min_1801}  type={webp} />
                <source srcSet={my_photo2_path}             media={media_min_1801}  type={png} />
                <source srcSet={my_photo2_webp_medium_path} media={media_1361_1800} type={webp} />
                <source srcSet={my_photo2_medium_path}      media={media_1361_1800} type={png} />
                <source srcSet={my_photo2_webp_small_path}  media={media_1060_1360} type={webp} />
                <source srcSet={my_photo2_small_path}       media={media_1060_1360} type={png} />
                <img style={image2Loaded ? {} : {display: 'none'}} alt="My_photo_2" className={classNames(classes.myPhoto2, isOnLeftPartOfScreen ? classes.show : classes.hide)} onLoad={() => setImage2Loaded(true)} />
            </picture>        
            
            <picture>
                <source srcSet={logoKirav_webp_medium_path} media={media_1361_1800} type={webp} />
                <source srcSet={logoKirav_medium_path}      media={media_1361_1800} type={png} />
                <source srcSet={logoKirav_webp_path}        media={media_1060_1360} type={webp} />
                <source srcSet={logoKirav_path}             media={media_1060_1360} type={png} />
                <source srcSet={logoKirav_webp_58_219_path} media={media_956_1059}  type={webp} />
                <source srcSet={logoKirav_58_219_path}      media={media_956_1059}  type={png} />
                <source srcSet={logoKirav_webp_50_189_path} media={media_815_955}   type={webp} />
                <source srcSet={logoKirav_50_189_path}      media={media_815_955}   type={png} />
                <source srcSet={logoKirav_webp_38_144_path} media={media_619_814}   type={webp} />
                <source srcSet={logoKirav_38_144_path}      media={media_619_814}   type={png} />
                <source srcSet={logoKirav_webp_26_99_path}  media={media_380_618}   type={webp} />
                <source srcSet={logoKirav_26_99_path}       media={media_380_618}   type={png} />
                <img alt="logo_Kirav" className={classNames(classes.logoKirav, isOnLeftPartOfScreen ? classes.left : classes.right)} style={image1Loaded || image2Loaded ? {} : {display: 'none'}} onLoad={() => setLogoLoaded(true)} />
            </picture>
            <div className={classNames(classes.logoAboutBackend, isOnLeftPartOfScreen ? classes.left : classes.right)} style={image1Loaded || image2Loaded ? {} : {display: 'none'}}>Backend Developer</div>    
          
            <picture>
                <source srcSet={logo1_webp_path}  media={media_min_1801}   type={webp} />
                <source srcSet={logo1_path}       media={media_min_1801}   type={png} />
                <img alt="logo_NikitaKirav" className={classNames(classes.logo, isOnLeftPartOfScreen ? classes.left : classes.right)} style={image1Loaded || image2Loaded ? {} : {display: 'none'}} onLoad={() => setLogoLoaded(true)} />
            </picture>
            <div className={classNames(classes.logoAbout, isOnLeftPartOfScreen ? classes.left : classes.right)} style={image1Loaded || image2Loaded ? {} : {display: 'none'}}>Frontend &nbsp; {'&'}<br/>Backend Developer</div>
            <Link to={"/?aboutme"}><div className={classNames(classes.logoReadMore, isOnLeftPartOfScreen ? classes.left : classes.right)} style={image1Loaded || image2Loaded ? {} : {display: 'none'}}>READ MORE &#10141;</div></Link>
        </div>
    );
}