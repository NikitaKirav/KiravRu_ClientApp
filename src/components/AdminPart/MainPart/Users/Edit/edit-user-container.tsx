import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import EditUser from './edit-user';
import {getUserEdit, postUserEdit} from '../../../../../redux/user-adm-reducer';
import {getUsers} from '../../../../../redux/users-adm-reducer';
import useLocationState from '../../../../../packages/ui/hooks/location';

const EditUserContainer = (props) => {

    let [{ query },, replaceState] = useLocationState();
    let [saved, setSaved] = useState(false);

    useEffect(() => {
        props.getUserEdit(props.match.params.userId);
    },[]);

    useEffect(() => {  
        if(saved) {     
            props.getUsers();
            setSaved(false);
            return replaceState(`/adminBoard/users`); 
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