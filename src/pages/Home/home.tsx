/** Absolute imports */
import React, { useEffect } from "react";
import { Element, scroller } from "react-scroll";
import { useLocation } from "react-router-dom";

/** Components */
import AboutMe from "./components/AboutMe/about-me";
import { MyPhotoWithLogo } from "../../components/MyPhotoWithLogo/my-photo-with-logo";

const Home = () => {

    let location = useLocation();

    useEffect(() => {
        var anchor = location.search.match(/\w+/);
        scrollTo(anchor??"begin");
    },[location]);

    const scrollTo = (anchor) => {
        scroller.scrollTo(anchor, {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart',
          offset: -57
        });
    }

    return(
        <div className='homepage'>
            <Element name="begin" className="element">
                <MyPhotoWithLogo />
            </Element>
            <Element name="aboutme" className="element">
                <AboutMe />               
            </Element>
        </div>
    );
}

export default Home;