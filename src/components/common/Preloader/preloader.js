import React from 'react';
import preloader from '../../../../assets/images/circles.svg';

import './preloader.less';

const Preloader = () => {
    return <div className="loader">
        <img src={preloader} />
    </div>
}

export default Preloader;