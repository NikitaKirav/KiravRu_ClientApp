import React, { useEffect } from 'react';
import EditAccess from './edit-access.jsx';
import { connect } from 'react-redux';
import {getUsers} from '../../../../../redux/users-adm-reducer.js';
import {getUserAccess, putUpdateAccess} from '../../../../../redux/user-adm-reducer.js';
import useLocationState from '../../../../../packages/ui/hooks/location.js';

const EditAccessContainer = (props) => {

    let [{ query },, replaceState] = useLocationState();

    useEffect(()=> {
        props.getUserAccess(props.match.params.userId);
    },[]);

    const onSaveAccess = (values) => {
        let access = {
            Roles: values.Roles,
            UserId: values.UserId
        };
        props.putUpdateAccess(access);
        props.getUsers();
        return replaceState(`/adminBoard/roles/userList`); 
    }

    return (
        <EditAccess onSubmit={onSaveAccess} />
    );
}

export default connect(null, {getUsers, getUserAccess, putUpdateAccess})(EditAccessContainer);