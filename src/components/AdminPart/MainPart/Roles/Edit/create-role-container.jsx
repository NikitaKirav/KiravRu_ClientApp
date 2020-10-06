import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CreateRole from './create-role.jsx';
import {postCreateRole} from '../../../../../redux/role-adm-reducer.js'
import {getRoles} from '../../../../../redux/users-adm-reducer.js';
import useLocationState from '../../../../../packages/ui/hooks/location.js';


const CreateRoleContainer = (props) => {

    let [{ query },, replaceState] = useLocationState();
    let [saved, setSaved] = useState(false);

    useEffect(() => {  
        if(saved) {     
            props.getRoles();
            setSaved(false);
            return replaceState(`/adminBoard/roles`); 
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