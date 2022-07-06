/** Absolute imports */
import React from 'react';
import classNames from 'classnames';

/** Styles */
import classes from './works-baner.module.less';

/** SVG */
import { IconArrowLeft, IconArrowRight } from '../../../../svg-icons/arrow';

export const WorksBaner = () => {
    return (<>
            <div className={classes.baner}>
            <div className={classes.leftPart}>
                <p className={classes.worksText}>WORKS</p>
                <div className={classes.pointerLeft}><IconArrowLeft /></div>                
            </div>
            <div className={classes.rightPart}>
                <div className={classes.pointerRight}><IconArrowRight /></div>
            </div>
            </div>
            <div className={classes.centralPart1}>
                <h3>Hotel client-server application</h3>
                {/*<div className={classes.date}>NOVEMBER 20, 2019</div>*/}
                <div className={classes.about}>
                Fault-Tolerant Composite Project that had a strong isolation between the host and plug-ins.
                </div>
                <div className={classes.technologies}><span className={classes.title}>Technologies Used:</span>
                    <div className={classNames(classes.skillsRow)}>
                        <div className={classes.skill}>WPF MVVM</div> <div className={classes.skill}>ASP.NET WebApi</div> <div className={classes.skill}>MS SQL</div> 
                        <div className={classes.skill}>TFS Git</div> <div className={classes.skill}>IIS</div> 
                    </div>
                </div>
            </div>
            <div className={classes.centralPart2}>
                <h3>Messenger</h3>
                {/*<div className={classes.date}>NOVEMBER 20, 2019</div>*/}
                <div className={classes.about}>
                Example of a social network (messenger).
                </div>
                <div className={classes.technologies}><span className={classes.title}>Technologies Used:</span>
                    <div className={classNames(classes.skillsRow)}>
                        <div className={classes.skill}>ReactJS + Redux</div> <div className={classes.skill}>TypeScript</div> <div className={classes.skill}>Less</div> 
                        <div className={classes.skill}>NodeJS</div> <div className={classes.skill}>Websockets</div> <div className={classes.skill}>MongoDb</div> 
                        <div className={classes.skill}>Ant design</div> <div className={classes.skill}>GitHub + Jenkins</div> 
                    </div>
                </div>
            </div>
            <div className={classes.centralPart3}>
                <h3>FileBro</h3>
                {/*<div className={classes.date}>NOVEMBER 20, 2019</div>*/}
                <div className={classes.about}>
                File manager for working with CKEditor and ASP.NET Core.
                </div>
                <div className={classes.technologies}><span className={classes.title}>Technologies Used:</span>
                    <div className={classNames(classes.skillsRow)}>
                        <div className={classes.skill}>Javascript</div> <div className={classes.skill}>ES6</div> <div className={classes.skill}>ASP.NET Core</div> 
                        <div className={classes.skill}>CSS3</div> <div className={classes.skill}>CKEditor</div> <div className={classes.skill}>Opensource</div>
                    </div>
                </div>
            </div>
       </>);
}