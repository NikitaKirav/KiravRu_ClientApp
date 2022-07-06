/** Absolute imports */
import React from 'react';

/** SVG */
import { IconConsoleLogo, IconNLogo } from '../../../../svg-icons/n-logo';

/** Styles */
import classes from './n-logo.module.less';

export const NLogo = () => {
    return (
        <div className={classes.nLogoBlock}>
            <div className={classes.consoleLogo}><IconConsoleLogo /></div>
            <div className={classes.nLogo}><IconNLogo /></div>
        </div>
    );
}