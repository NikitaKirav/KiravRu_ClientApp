import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {getUsers} from '../../../../../redux/users-adm-reducer';
import Preloader from '../../../../common/Preloader/preloader';
import './users-list.less';

const UsersList = (props) => {
    
    useEffect(()=> {
        props.getUsers();
    },[]);

    if(!props.users) {
        return <Preloader />
    }

    return (
        <div className="userList">
            <h1>List's Users</h1>
            <table className="table">
                <tbody>
                    <Users users={props.users} />
                </tbody>
            </table>
        </div>
    );
}

const Users = ({users}) => {
    return (
        users.map(user => {
            return (
            <tr key={user.id}>
                <th>{user.userName}</th>
                <th>{user.email}</th>
                <th>
                    <NavLink className="btn btnPrimary" to={`/adminBoard/roles/userList/${user.id}`}>Access right</NavLink>
                </th>
            </tr>
            );
        })
    );
}

const mapStateToProps = (state) => ({
    users: state.usersAdm.users
});

export default connect(mapStateToProps, {getUsers})(UsersList);