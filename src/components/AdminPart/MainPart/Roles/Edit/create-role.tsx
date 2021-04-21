import React, { useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Input } from '../../../../common/FormsControls/forms-controls';
import './create-role.less';
import Errors from '../../Users/Edit/errors';
import {actions} from '../../../../../redux/role-adm-reducer';
import { AppStateType } from '../../../../../redux/redux-store';

const CreateRole = (props) => {

    useEffect(() => {
        return () => {
            props.removeRole();
        };
    },[])

    return (
        <div className="createRole">
            <div className="text-danger"><Errors errors={props.errors} /></div>

            <form onSubmit={props.handleSubmit}>
                <div className="form-group">
                    <label>New Role</label>
                    <Field name="Name" className="form-control" component={Input} />
                </div>
                <button className="btn btnSuccess">Add</button>
            </form>
        </div>
    );
}

const mapStateToProps = (state: AppStateType) => ({
    errors: state.roleAdm.errors
});

export default reduxForm({form: "CreateRole"})(connect(mapStateToProps, {removeRole: actions.removeRole})(CreateRole));