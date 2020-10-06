import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, CheckboxGroup } from '../../../../common/FormsControls/forms-controls.jsx';
import { connect } from 'react-redux';
import Preloader from '../../../../common/Preloader/preloader.js';
import {getUserAccess} from '../../../../../redux/user-adm-reducer.js';
import useLocationState from '../../../../../packages/ui/hooks/location.js';
import './edit-access.less';
import Errors from '../../Users/Edit/errors.jsx';

const EditAccess = (props) => {
    useEffect(() => {
        if(props.user) {
            props.initialize({
                Roles: props.listRoles.userRoles,
                UserId: props.user.userId
            });   
        }
    }, [props.user]);

    if(!props.user) {
        return <Preloader />
    }

    return (
        <div className="editAccess">
            <h1>Change roles for the user {props.user.userEmail}</h1>
            <div className="text-danger"><Errors errors={props.errors} /></div>
            <form onSubmit={props.handleSubmit}>
                <Field type="hidden" name="UserId" component={Input} />
                <div className="form-group">
                    <Access listRoles={props.listRoles} />
                </div>
                <button className="btn btnSuccess">Save</button>
            </form>
        </div>
    );
}

const Access = (props) => {
    return (
        <Field name="Roles" component={CheckboxGroup} options={props.listRoles.allRoles} />
    );
}

const mapStateToProps = (state) => ({
    user: state.userAdm.user,
    listRoles: state.userAdm.listRoles,
    errors: state.userAdm.errors
});

export default reduxForm({form: "EditAccess"})(connect(mapStateToProps, {getUserAccess})(EditAccess));