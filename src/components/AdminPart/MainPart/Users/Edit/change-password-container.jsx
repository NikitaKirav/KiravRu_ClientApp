import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ChangePassword from './change-password.jsx';
import {postUserChangePassword, getUserForChangePassword} from '../../../../../redux/user-adm-reducer.js';
import {getUsers} from '../../../../../redux/users-adm-reducer.js';
import useLocationState from '../../../../../packages/ui/hooks/location.js';

const ChangePasswordContainer = (props) => {

    let [{ query },, replaceState] = useLocationState();
    let [saved, setSaved] = useState(false);

    useEffect(()=> {
        props.getUserForChangePassword(props.match.params.userId)
    },[]);

    useEffect(() => {  
        if(saved) {     
            props.getUsers();
            setSaved(false);
            return replaceState(`/adminBoard/users`); 
        } 
    }, [props.user]);

    const onSavePassword = (values) => {
        let user = {
            Id: values.Id,
            Email: values.Email,
            NewPassword: values.NewPassword
        };
        props.postUserChangePassword(user);
        setSaved(true);
    }

    return (
        <ChangePassword onSubmit={onSavePassword} />
    );
}

const mapStateToProps = (state) => ({
    user: state.userAdm.user
});

export default connect(mapStateToProps, {getUsers, postUserChangePassword, getUserForChangePassword})(ChangePasswordContainer);