import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ChangePassword from './change-password';
import {postUserChangePassword, getUserForChangePassword} from '../../../../../redux/user-adm-reducer';
import {getUsers} from '../../../../../redux/users-adm-reducer';
import { useNavigate, useParams } from 'react-router-dom';

const ChangePasswordContainer = (props) => {

    const navigate = useNavigate();
    let [saved, setSaved] = useState(false);
    const { userId } = useParams();

    useEffect(()=> {
        props.getUserForChangePassword(userId)
    },[]);

    useEffect(() => {  
        if(saved) {     
            props.getUsers();
            setSaved(false);
            navigate(`/adminBoard/users`); 
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