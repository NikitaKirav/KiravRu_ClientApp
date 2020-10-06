import React, { Component } from 'react';

import s from './dialogs.module.less';
import { DialogItem } from './DialogItem/dialog-item.jsx';
import { Message } from './Message/message.jsx';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../../../components/common/FormsControls/forms-controls.jsx';
import { required, maxLengthCreator } from '../../../../utils/validators/validators.js';

export class Dialogs extends Component {

    addNewMessage(values) {
        this.props.sendMessage(values.newMessageBody);
    } 

    render() {
        let state = this.props.dialogsPage;
        let dialogElement = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
        let messageElement = state.messages.map(m => <Message message={m.message} key={m.id}/>);
   
        if (!this.props.isAuth) return <Redirect to={"/projects/messenger/login"} />

        return (
            <div className={s.dialogs}>
                <div className={s.dialogs_items}>
                    {dialogElement}
                </div>
                <div className={s.messages}>
                    <div>{messageElement}</div>
                    <AddMessageFormRedux onSubmit={this.addNewMessage.bind(this)} />
                </div>

                 
            </div>
        );
    }
}

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} 
                validate={[required, maxLength50]} 
                name="newMessageBody" 
                placeholder="Enter you message..." />
            </div>
            <div><button>Send</button></div>
        </form>
    );
}

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm);