import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { LoginFormValuesType } from '../../../../../../Projects/Messenger/components/Login/login';
import { createField, Textarea } from '../../../../../../components/common/FormsControls/forms-controls';
import { maxLengthCreator, required } from '../../../../../../utils/validators/validators';
import { Button, Input } from 'antd';
import s from './add-post-form.module.less';

export type AddPostFormValuesType = {
    newPostText: string
}

const { TextArea } = Input;
type AddPostFormValuesTypeKeys = Extract<keyof AddPostFormValuesType, string>;

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>

            <div>
                { createField<AddPostFormValuesTypeKeys>("What's new?", "newPostText", [], Textarea, {autoSize: { minRows: 2, maxRows: 6 }} ) }
            </div>
            <div className={s.addpost} >
                <Button type="primary" onClick={props.handleSubmit}>Add post</Button>
            </div>
        </form>
    );
}

export default reduxForm<AddPostFormValuesType>({form: "profile-add-post"})(AddPostForm);