import React from 'react';
import s from './users.module.less';
import userPhoto from '../../../../../assets/images/user_default.png';
import { NavLink } from 'react-router-dom';
import { usersAPI } from '../../../../api/api.js';

let Users = (props) => {
    
    let pagesCount = Math.ceil( props.totalUsersCount / props.pageSize );
    let pages = [];
    for(let i=1; i < pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span key={p} className={ props.currentPage === p ? s.selectedPage : '' }
                            onClick={() => { props.onPageChanged(p)}}>{p}</span>
                })}
            </div>
            {
                props.users.map(u => <div key={u.id}>
                        <span>
                            <div>
                                <NavLink to={'/projects/messenger/profile/' + u.id}>
                                    <img className={s.userPhoto} src={u.photos.small != null ? u.photos.small : userPhoto} />
                                </NavLink>
                            </div>
                            <div>
                                { u.followed ? 
                                <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.unfollow(u.id);                               
                                }}>Unfollow</button> :
                                <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.follow(u.id);  
                                }}>Follow</button>}
                                
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </span>
                            <span>
                                <div>{"u.location.country"}</div>
                                <div>{"u.location.city"}</div>
                            </span>
                        </span>
                    </div>
                )
            }
        </div>
    );
}

export default Users;