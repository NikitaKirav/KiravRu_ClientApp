import { actions } from '../../../../../redux/project-messenger/profile-reducer';
import { connect } from 'react-redux';

import MyPosts, { MapStatePropsType } from './myposts';
import { AppStateType } from '../../../../../redux/redux-store';


const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        profile: state.profilePage.profile
    }
}

const MyPostsContainer = connect<MapStatePropsType, {}, {}, AppStateType>(mapStateToProps, {})(MyPosts);

export default MyPostsContainer;