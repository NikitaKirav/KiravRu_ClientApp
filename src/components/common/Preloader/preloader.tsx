/** Absolute imports */
import React from 'react';

/** SVG */
import preloader from '../../../../assets/images/circles.svg';
import preloader2 from '../../../../assets/images/circles2.svg';

/** Styles */
import classes from './preloader.module.less';

type PropsType = {
    isBlackStyle?: boolean
}

const Preloader: React.FC<PropsType> = ({isBlackStyle = true}) => {
    if (isBlackStyle) {
        return <div className={classes.loader}>
            <img src={preloader} />
        </div> 
    }
    return <div className={classes.loader}>
        <img src={preloader2} />
    </div>
}

export default Preloader;