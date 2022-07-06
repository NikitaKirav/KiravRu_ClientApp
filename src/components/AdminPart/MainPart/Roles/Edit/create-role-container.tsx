import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CreateRole from './create-role';
import {postCreateRole} from '../../../../../redux/role-adm-reducer'
import {getRoles} from '../../../../../redux/users-adm-reducer';
import { useNavigate } from 'react-router-dom';


const CreateRoleContainer = (props) => {

    const navigate = useNavigate();
    let [saved, setSaved] = useState(false);

    useEffect(() => {  
        if(saved) {     
            props.getRoles();
            setSaved(false);
            navigate(`/adminBoard/roles`); 
        } 
    }, [props.role]);

    const onSaveRole = (values) => {
        let role = {
            Name: values.Name
        };
        props.postCreateRole(role);
        setSaved(true);
    }

    return (
        <CreateRole onSubmit={onSaveRole} />
    );
}

const mapStateToProps = (state) => ({
    role: state.roleAdm.role
});

export default connect(mapStateToProps, {postCreateRole, getRoles})(CreateRoleContainer);