import React, { useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Input } from '../../../../common/FormsControls/forms-controls';
import Preloader from '../../../../common/Preloader/preloader';
import {actions} from '../../../../../redux/user-adm-reducer';
import './edit-user.less';
import Errors from './errors';
import { AppStateType } from '../../../../../redux/redux-store';

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

type PasswordPropsType = {
    id: string
}

const Password: React.FC<PasswordPropsType> = ({id}) => {
    if(id === null) {
        return (
            <div className="form-group">
                <label className="control-label">Password</label>
                <Field name="Password" type="password" className="form-control" component={Input} />
            </div>
        );
    } else {
        return <></>;
    }
}

const mapStateToProps = (state: AppStateType) => ({
    user: state.userAdm.user,
    errors: state.userAdm.errors
});

export default reduxForm({form: "SaveUser"})(connect(mapStateToProps, {removeUser: actions.removeUser})(EditUser));