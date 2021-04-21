import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { createField, Textarea, Input } from '../../../../../components/common/FormsControls/forms-controls';
import { ProfileType } from '../../../../../redux/project-messenger/types/types';
import s from './profile-info.module.less';
import { Button, Row, Col, Divider } from 'antd';
import classNames from 'classnames';

type OwnPropsType = {
    initialValues: ProfileType,
    onCancel: () => void
}

type ProfileTypeKeys = Extract<keyof ProfileType, string>;

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, OwnPropsType> & OwnPropsType> = ({handleSubmit, initialValues, error, onCancel}) => {

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <Divider plain>
                <Button type="primary" onClick={handleSubmit}>
                    Save
                </Button>
                <Button onClick={onCancel}>Cancel</Button>
            </Divider>
        </div>
        {error && <div className="formSummaryError">
                    {error}
                  </div>}
        <table className={classNames(s.tableUserInfo, s.textRight)}>
            <tbody>
            <tr>
                <td className={s.columnName} >Full name:</td>
                <td>{createField<ProfileTypeKeys>("Full name", "fullName", [], Input)}</td>
            </tr>
            <tr>
                <td>Looking for a job:</td>
                <td><div className={s.checkbox}>{createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, {type: "checkbox"})}</div></td>
            </tr>
            <tr>
                <td>My professional skills:</td>
                <td>{createField<ProfileTypeKeys>("My professional skills", "lookingForAJobDescription", [], Textarea)}</td>
            </tr>
            <tr>
                <td>About me:</td>
                <td>{createField<ProfileTypeKeys>("About me", "aboutMe", [], Textarea)}</td>
            </tr>
            </tbody>
        </table>

        <div>
            <Divider plain>Contacts</Divider>
            <table className={classNames(s.tableUserInfo, s.textRight)}>
                <tbody>
                {Object.keys(initialValues.contacts).map(key => {
                    return (
                    <tr key={key} className={s.contact}>
                        <td className={s.columnName}>{key}:</td> 
                        <td>{createField(key, "contacts." + key, [], Input)}</td>
                    </tr>)
                })}
                </tbody>
            </table>
        </div>
    </form>
    );
}

export default reduxForm<ProfileType, OwnPropsType>({form: "edit-profile"})(ProfileDataForm);