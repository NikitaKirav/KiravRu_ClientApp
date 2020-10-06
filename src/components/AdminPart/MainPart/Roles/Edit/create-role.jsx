import React, { useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Input } from '../../../../common/FormsControls/forms-controls.jsx';
import './create-role.less';
import Errors from '../../Users/Edit/errors.jsx';
import {removeRole} from '../../../../../redux/role-adm-reducer.js';

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

const mapStateToProps = (state) => ({
    errors: state.roleAdm.errors
});

export default reduxForm({form: "CreateRole"})(connect(mapStateToProps, {removeRole})(CreateRole));