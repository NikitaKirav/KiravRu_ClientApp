/** Absolute imports */
import React from 'react';

/** Components */
import TextMeContainer from '../../components/TextMe/text-me-container';

/** Styles */
import classes from './contacts-page.module.less';

export const ContactsPage = () => {
    
    return (
        <div className={classes.contactsPage}>
            <TextMeContainer />
        </div>
    );
}