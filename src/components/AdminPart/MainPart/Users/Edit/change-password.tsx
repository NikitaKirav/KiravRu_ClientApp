import React, { useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import './change-password.less';
import { Input } from '../../../../common/FormsControls/forms-controls';
import Preloader from '../../../../common/Preloader/preloader';
import {actions} from '../../../../../redux/user-adm-reducer';
import Errors from './errors';
import { AppStateType } from '../../../../../redux/redux-store';

const ChangePassword = (props) => {

    //let [{ query },, replaceState] = useLocationState();
    
    useEffect(()=> {
        if (props.user) {
            props.initialize({
                Id: props.user.id,
                Email: props.user.email            
            });
            //return replaceState(`/adminBoard/users/changePassword/${props.user.id}`);  
        }
    },[props.user]);

    useEffect(() => {
        return () => {
            props.removeUser();
        };
    },[])

    if(!props.user) {
        return <Preloader />;
    } 

    return (
        <div className="changePassword">
            <h1>Changing the password for the user {props.user.email}</h1>
            <form onSubmit={props.handleSubmit}>
                <div className="text-danger"><Errors errors={props.errors} /></div>

                <Field type="hidden" name="Id" component={Input} />
                <Field type="hidden" name="Email" component={Input} />

                <div className="form-group">
                    <label className="control-label">New password</label>
                    <Field type="password" name="NewPassword" className="form-control" component={Input} />
                </div>
                <div className="form-group">
                    <button className="btn btnSuccess">Save</button>
                </div>
            </form>
        </div>
    );
}

const mapStateToProps = (state: AppStateType) => ({
    user: state.userAdm.user,
    errors: state.userAdm.errors
});

export default reduxForm({form: "ChangePassword"})(connect(mapStateToProps, {removeUser: actions.removeUser})(ChangePassword));