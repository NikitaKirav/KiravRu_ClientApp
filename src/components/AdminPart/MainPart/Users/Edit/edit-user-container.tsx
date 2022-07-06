import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import EditUser from './edit-user';
import {getUserEdit, postUserEdit} from '../../../../../redux/user-adm-reducer';
import {getUsers} from '../../../../../redux/users-adm-reducer';
import { useNavigate, useParams } from 'react-router-dom';

const EditUserContainer = (props) => {

    const navigate = useNavigate();
    let [saved, setSaved] = useState(false);
    const { userId } = useParams();

    useEffect(() => {
        props.getUserEdit(userId);
    },[]);

    useEffect(() => {  
        if(saved) {     
            props.getUsers();
            setSaved(false);
            navigate(`/adminBoard/users`); 
        } 
    }, [props.user]);

    const onSaveUser = (values) => {
        let user = {
            Id: values.Id,
            Email: values.Email,
            UserName: values.UserName,
            Password: values.Password
        };
        props.postUserEdit(user);
        setSaved(true);
    }

    return (
        <EditUser onSubmit={onSaveUser} />
    );
}

const mapStateToProps = (state) => ({
    user: state.userAdm.user
});

export default connect(mapStateToProps, {getUserEdit, postUserEdit, getUsers})(EditUserContainer);