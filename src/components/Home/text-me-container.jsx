import React from 'react';
import TextMeFormRedux from './text-me.jsx';
import { connect } from 'react-redux';
import { sendMessageToServer } from '../../redux/message-reducer.js';

const TextMeContainer = (props) => {

    const sendMessage = (values) => {
        props.sendMessageToServer(values.email, values.message);
    }

    return (
        <TextMeFormRedux onSubmit={sendMessage} />
    );
}


export default connect(null, {sendMessageToServer})(TextMeContainer);
