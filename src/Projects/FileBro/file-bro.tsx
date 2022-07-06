/** Absolute imports */
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

/** Images */
import fileBroImage from '../../../assets/images/fileBro2.jpg';
import githubOutlined from '../../../assets/images/githab-v3.png';

/** Styles */
import s from './file-bro.module.less';

const FileBro = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    return (
        <div className={s.fileBro}>
            <div><NavLink to="/works">Works</NavLink> / FileBro</div>
            <div className={s.borderLineFat}></div>
            <h1>FileBro</h1>
            <span><time className={s.blockTime}>OCTOBER 19, 2020</time></span>
            <div className={s.contentText}>
                <p>When you use the CKEditor with ASP.NET Core you might have seen that the file manager CKFinder didn't work. I'd like to present my FileBro(File Browser)!</p>
                <img src={fileBroImage} className={s.fileBroImg} title="fileBroScreenShot" />
                <p>I do like CKEditor and I didn't want to change it to another one. For my "FileBrowser" I have made the simplified version of the CKFinder. 
                It's easier but its main functions are still available.</p>
                <p><img src={githubOutlined} className={s.githubIcon} /><a style={{marginLeft: '10px'}} href="https://github.com/NikitaKirav/FileBRO" target="_blank">GitHub repo</a></p>
            </div>
        </div>
    );
}

export default FileBro;