/** Absolute imports */
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Fade, Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

/** Images */
import typeStoryImage1 from '../../../assets/images/typestory001-min.jpg';
import typeStoryImage2 from '../../../assets/images/typestory002-min.jpg';
import typeStoryImage3 from '../../../assets/images/typestory003-min.jpg';
import typeStoryImage4 from '../../../assets/images/typestory004-min.jpg';
import githubOutlined from '../../../assets/images/githab-v3.png';

/** Styles */
import s from './type-story.module.less';

const buttonStyle = {
    width: "30px",
    background: 'none',
    border: '0px'
};

const properties = {
    prevArrow: <button style={{ ...buttonStyle }}><svg viewBox="0 0 512 512" fill="#fff"><path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z"/></svg></button>,
    nextArrow: <button style={{ ...buttonStyle }}><svg viewBox="0 0 512 512" fill="#fff"><path d="M512 256L270 42.6v138.2H0v150.6h270v138z"/></svg></button>
}

const TypeStory = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    const slideImages = [typeStoryImage1, typeStoryImage2, typeStoryImage3, typeStoryImage4];

    return (
        <div className={s.typeStory}>
            <div><NavLink to="/works">Works</NavLink> / TypeStory</div>
            <div className={s.borderLineFat}></div>
            <h1>TypeStory</h1>
            <span><time className={s.blockTime}>DECEMBER 20, 2021</time></span>
            <div className={s.contentText}>
                <p><span className={s.textGreen}>Source:</span> <a href='https://typestory.xyz/' target="_blank">typestory.xyz</a></p>
                
                <p>Application in <span className={s.textRed}>Neomorphism style</span> for typing tasks and their solutions. It helps to structure your thoughts.</p>
                <p>The design of the project was developed by the customer and presented in <span className={s.textRed}>Figma.</span></p>
                <h2>My work included:</h2>
                <p>{`1) Develop an application according to the customer's design.`}</p>
                <p>Application must works without Registration. Users should have an opportunity for exploration of the application and then if they like it, 
                    register there and all information must get to Firebase database. Besides the application must work with unstable internet connection.</p>
                <p>{`2) It was implemented in Local Storage. Thus, the user can use the application without registering, logging out of the session or having no 
                    Internet connection. After registering or logging in, the app syncs with the`}<span className={s.textRed}>{` Cloud Firestore (Firebase)`}</span>{` database.`}</p>
                <p>{`3) Publishing the application on Firebase hosting with the client's domain name.`}</p>

                <p><span className={s.textGreen}>{`Technologies Used:`}</span> {`React (Redux + Sagas), GitLab, Firebase Cloud Firestore`}</p>
                <div className="slide-container">
                    <Fade {...properties}>
                    {slideImages.map((slideImage, index)=> (
                        <div key={index} className={s.typeStoryImg}>
                            <img style={{ objectFit: "cover", width: "100%" }} alt="Slide Image" src={slideImage} />
                        </div>
                    ))} 
                    </Fade>
                </div>

                <iframe width="560" height="315" className={s.videoFrame} src="https://www.youtube.com/embed/xJlYDMN8vYI" title="YouTube video player" frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
               
            </div>
        </div>
    );
}

export default TypeStory;