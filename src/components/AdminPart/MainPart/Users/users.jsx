import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../../../../redux/users-adm-reducer.js';
import Preloader from '../../../common/Preloader/preloader.js';
import s from './users.module.less';
import { NavLink, useLocation } from 'react-router-dom';
import Modal from '../../../common/ModalWindow/modal.jsx';

const UsersContainer = (props) => {

    useEffect(() => {
        props.getUsers();
    },[props.changeUsers]);

    if(!props.users) {
        return (<Preloader />);
    }

    return (
        <div className={s.listUsers}>
            <div className={s.title}>
                <h1>List's Users</h1>
            </div>
            <div className={s.createNewUser}>
                <NavLink to={`/adminBoard/users/0`} className="btn btnSuccess">Add user</NavLink>
            </div>
            <table className="table">
            <thead>
                <tr><th>Email</th><th>Name</th><th></th></tr>
            </thead>
            <tbody>
                <Users users={props.users} deleteUser={props.deleteUser} />
            </tbody>
            </table>
        </div>
    ); 
}

const Users = ({users, deleteUser}) => {

    let [isOpen, setIsOpen] = useState(false);
    let [userId, setId] = useState(0);

    const onDelete = (id) => {
        setIsOpen(true);
        setId(id);
    }

    const handleSubmit = () => {
        deleteUser(userId);
        setIsOpen(false);
    }
    
    const handleCancel = () => {
        setIsOpen(false);
    }

    return (
        users.map(user => {
            return (
            <tr key={user.id}>
                <th>{user.email}</th>
                <th>{user.userName}</th>
                <th>
                    <NavLink to={`/adminBoard/users/${user.id}`} className="btn btnPrimary">Edit</NavLink>
                    <NavLink className="btn btnPrimary" to={`/adminBoard/users/changePassword/${user.id}`}>Change Password</NavLink>
                    <button className="btn btnDanger" onClick={() => onDelete(user.id)}>
                        Delete
                    </button>
                    <Modal title="Delete user" isOpen={isOpen} onCancel={handleCancel} onSubmit={handleSubmit}>
                        <p>Are you sure you want to delete this user?</p>
                    </Modal>
                </th>
            </tr>
            );
        })
    );
}

const mapStateToProps = (state) => ({
    users: state.usersAdm.users,
    changeUsers: state.usersAdm.changeUsers
});

export default connect(mapStateToProps, { getUsers, deleteUser })(UsersContainer);