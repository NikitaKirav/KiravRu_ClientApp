import React, { Component } from "react";

import Banner from '../Banner/banner.jsx';
import { Description } from "../Description/description.jsx";
import InformationBlocks from "../common/InformationBlocks/information-blocks.jsx";

export class Home extends Component {
    render() {
        return(
            <div className='homepage'>
                <Banner />
                <Description />
                <InformationBlocks />
            </div>
        );
    }
}