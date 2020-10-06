import { connect } from "react-redux";
import { requestUsers, follow, unfollow, setCurrentPage, toggleFollowingProgress } from "../../../../redux/users-reducer.js";
import React, { Component } from 'react';
import Users from './users.jsx';
import Preloader from '../../../../components/common/Preloader/preloader.js';
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/with-auth-redirect.js";
import { getPageSize, getUsers, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from "../../../../redux/users-selectors.js";


class UsersContainer extends Component {

    constructor(props) {
        super(props);
        this.onPageChanged = this.onPageChanged.bind(this);
    }

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged(pageNumber) {
        this.props.requestUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
                { this.props.isFetching ? <Preloader /> : null}
                <Users 
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize} 
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
    }
}



/*const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}*/

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {
        follow, unfollow, setCurrentPage,
        toggleFollowingProgress, requestUsers
    })
)(UsersContainer);