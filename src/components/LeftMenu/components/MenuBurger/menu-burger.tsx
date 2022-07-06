/** Absolute imports */
import classNames from 'classnames';
import React from 'react';

/** Styles */
import classes from './menu-burger.module.less';

interface MenuBurgerProps {
    navToggle: boolean;
    onClickNavToggle: () => void;
}

export const MenuBurger: React.FC<MenuBurgerProps> = ({navToggle, onClickNavToggle}) => {
    return (
        <div onClick={onClickNavToggle} className={classNames(classes.menuButton, navToggle ? classes.active : classes.noActive)}>
            <div className={classNames(classes.burger)}>
                <span className={classes.line1}></span>
                <span className={classes.line2}></span>
                <span className={classes.line3}></span>
            </div>
        </div>
    );
}