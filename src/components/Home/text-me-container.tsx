import React from 'react';
import TextMeFormRedux from './text-me';
import { connect } from 'react-redux';
import { sendMessageToServer } from '../../redux/message-reducer';

const TextMeContainer = (props) => {

    const sendMessage = (values) => {
        props.sendMessageToServer(values.email, values.message);
    }

    return (
        <TextMeFormRedux onSubmit={sendMessage} />
    );
}


export default connect(null, {sendMessageToServer})(TextMeContainer);
