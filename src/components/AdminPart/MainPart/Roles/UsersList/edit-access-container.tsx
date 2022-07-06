import React, { useEffect } from 'react';
import EditAccess from './edit-access';
import { connect } from 'react-redux';
import {getUsers} from '../../../../../redux/users-adm-reducer';
import {getUserAccess, putUpdateAccess} from '../../../../../redux/user-adm-reducer';
import { useNavigate, useParams } from 'react-router-dom';

const EditAccessContainer = (props) => {

    const navigate = useNavigate();

    const { userId } = useParams();

    useEffect(()=> {
        props.getUserAccess(userId);
    },[]);

    const onSaveAccess = (values) => {
        let access = {
            Roles: values.Roles,
            UserId: values.UserId
        };
        props.putUpdateAccess(access);
        props.getUsers();
        navigate(`/adminBoard/roles/userList`); 
    }

    return (
        <EditAccess onSubmit={onSaveAccess} />
    );
}

export default connect(null, {getUsers, getUserAccess, putUpdateAccess})(EditAccessContainer);