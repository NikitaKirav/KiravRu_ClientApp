import React, { useEffect } from "react";

import Banner from '../Banner/banner.jsx';
import { Description } from "../Description/description.jsx";
import InformationBlocks from "../common/InformationBlocks/information-blocks.jsx";
import { Element, scroller } from "react-scroll";
import { useLocation } from "react-router-dom";
import AboutMe from "./about-me.jsx";

const Home = (props) => {

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
                <Banner />
            </Element>
            <Description />
            <InformationBlocks />
            <Element name="aboutme" className="element">
                <AboutMe />               
            </Element>
        </div>
    );
}

export default Home;