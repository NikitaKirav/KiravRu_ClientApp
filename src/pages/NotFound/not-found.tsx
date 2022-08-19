/** Absolute imports */
import React from 'react';

/** Styles */
import classes from './not-found.module.less';

const NotFound = () => {

    return (
        <div className={classes.contentPage}>
            <div className={classes.textBlock}>
                <div className={classes.error404}>ERROR 404</div>
                <div className={classes.noSignalPage}>NO SIGNAL PAGE</div>
            </div>
        </div>
    );
}

export default NotFound;