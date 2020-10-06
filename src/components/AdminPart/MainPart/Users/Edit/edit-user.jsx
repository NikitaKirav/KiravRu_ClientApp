import React, { useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Input } from '../../../../common/FormsControls/forms-controls.jsx';
import Preloader from '../../../../common/Preloader/preloader.js';
import useLocationState from '../../../../../packages/ui/hooks/location.js';
import {removeUser} from '../../../../../redux/user-adm-reducer.js';
import './edit-user.less';
import Errors from './errors.jsx';

const EditUser = (props) => {

    //let [{ query },, replaceState] = useLocationState();
 
    useEffect(()=> {
        if(props.user) {
            props.initialize({
                Id: props.user.id,
                Email: props.user.email,
                UserName: props.user.userName
            });
            //return replaceState(`/adminBoard/users/${props.user.id}`);  
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
        <div className="editUser">
            <form onSubmit={props.handleSubmit}>
                <div className="text-danger"><Errors errors={props.errors} /></div>
                <div className="form-group">
                    <Field type="hidden" name="Id" component={Input} />
                </div>
                <div className="form-group">
                    <label className="control-label">Email</label>
                    <Field className="form-control" name="Email" component={Input} />
                </div>
                <div className="form-group">
                    <label className="control-label">UserName</label>
                    <Field name="UserName" className="form-control" component={Input} />
                </div>
                <Password id={props.user.id} />
                <div className="form-group">
                    <button className="btn btnSuccess">Save</button>
                </div>
            </form>
        </div>
    );
}

const Password = ({id}) => {
    if(id === null) {
        return (
            <div className="form-group">
                <label className="control-label">Password</label>
                <Field name="Password" type="password" className="form-control" component={Input} />
            </div>
        );
    } else {
        return '';
    }
}

const mapStateToProps = (state) => ({
    user: state.userAdm.user,
    errors: state.userAdm.errors
});

export default reduxForm({form: "SaveUser"})(connect(mapStateToProps, {removeUser})(EditUser));