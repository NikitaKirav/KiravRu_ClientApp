/** Absolute imports */
import React from 'react';
import classNames from 'classnames';

/** Styles */
import classes from './left-menu-social-media.module.less';

interface LeftMenuSocialMediaProps {
    hide: boolean;
}

export const LeftMenuSocialMedia: React.FC<LeftMenuSocialMediaProps> = ({hide}) => {
    return (
        <div className={classNames(classes.leftMenu, hide ? classes.hide : '')}>
            <a href='https://github.com/NikitaKirav'>
                <div className={classNames(classes.button, classes.buttonGithab)} data-title="GITHAB">
                    <div className={classes.githab}></div>
                </div>
            </a>
            <a href='http://www.linkedin.com/in/nikita-kirav'>
                <div className={classNames(classes.button, classes.buttonLinkedin)} data-title="LINKEDIN">
                    <div className={classes.linkedin}></div>
                </div>
            </a>
        </div>
    );
}