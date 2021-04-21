import React from 'react';

import s from './dialogs.module.less';
import { DialogItem } from './DialogItem/dialog-item';
import { Message } from './Message/message';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { createField, Textarea } from '../../../../components/common/FormsControls/forms-controls';
import { required, maxLengthCreator } from '../../../../utils/validators/validators';
import { InitialStateType } from '../../../../redux/project-messenger/dialogs-reducer';

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
    newMessageBody: string
}

const Dialogs: React.FC<PropsType> = (props) => {

    let addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody);
    } 

    let state = props.dialogsPage;
    let dialogElement = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
    let messageElement = state.messages.map(m => <Message message={m.message} key={m.id}/>);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                {dialogElement}
            </div>
            <div className={s.messages}>
                <div>{messageElement}</div>
                <AddMessageFormRedux onSubmit={addNewMessage.bind(this)} />
            </div>

                
        </div>
    );
}

const maxLength50 = maxLengthCreator(50);
type NewMessageFormValuesKeys = Extract<keyof NewMessageFormValuesType, string>;

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                { createField<NewMessageFormValuesKeys>("Enter you message...", "newMessageBody", [required, maxLength50], Textarea) }
            </div>
            <div><button>Send</button></div>
        </form>
    );
}

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({form: "dialogAddMessageForm"})(AddMessageForm);
export default Dialogs;