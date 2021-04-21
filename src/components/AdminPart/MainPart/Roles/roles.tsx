import React, {useEffect, useState} from 'react';
import s from './roles.module.less';
import { connect } from 'react-redux';
import { getRoles, deleteRole } from '../../../../redux/users-adm-reducer';
import Preloader from '../../../common/Preloader/preloader';
import { NavLink } from 'react-router-dom';
import Modal from '../../../common/ModalWindow/modal';

const RolesContainer = (props) => {
    useEffect(() => {
        props.getRoles();
    },[props.changeRoles]);

    if(!props.roles) {
        return (<Preloader />);
    }
    
    return (
        <div className={s.listRoles}>
            <div className={s.title}>
                <h1>List's Roles</h1>
            </div>
            <table className="table">
            <thead>
                <tr><th>Name</th><th></th></tr>
            </thead>
            <tbody>
                <Roles roles={props.roles} deleteRole={props.deleteRole} />
            </tbody>
            </table>
            <NavLink className="btn btnSuccess" to={`/adminBoard/roles/create`}>Add Role</NavLink>
            <NavLink className="btn btnPrimary" to={`/adminBoard/roles/userList`}>User's List</NavLink>
        </div>
    ); 
}

const Roles = ({roles, deleteRole}) => {

    let [isOpen, setIsOpen] = useState(false);
    let [roleId, setId] = useState(0);

    const onDelete = (id) => {
        setIsOpen(true);
        setId(id);
    }

    const handleSubmit = () => {
        deleteRole(roleId);
        setIsOpen(false);
    }
    
    const handleCancel = () => {
        setIsOpen(false);
    }

    return (
        roles.map(role => {
            return (
            <tr key={role.id}>
                <th>{role.name}</th>
                <th>
                    <button className="btn btnDanger" onClick={() => onDelete(role.id)}>
                        Delete
                    </button>
                    <Modal title="Delete role" isOpen={isOpen} onCancel={handleCancel} onSubmit={handleSubmit}>
                        <p>Are you sure you want to delete this role?</p>
                    </Modal>
                </th>
            </tr>
            );
        })
    );
}

const mapStateToProps = (state) => ({
    roles: state.usersAdm.roles,
    changeRoles: state.usersAdm.changeRoles
});

export default connect(mapStateToProps, { getRoles, deleteRole })(RolesContainer);