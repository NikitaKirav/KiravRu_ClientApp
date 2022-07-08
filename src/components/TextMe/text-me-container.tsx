/** Absolute imports */
import React from 'react';
import { connect } from 'react-redux';

/** Components */
import TextMeFormRedux from './text-me';
import { sendMessageToServer } from '../../redux/message-reducer';

const TextMeContainer = (props) => {

    const sendMessage = (values) => {
        props.sendMessageToServer(values.name, values.email, values.message);
    }

    return (
        <TextMeFormRedux onSubmit={sendMessage} />
    );
}

export default connect(null, {sendMessageToServer})(TextMeContainer);
