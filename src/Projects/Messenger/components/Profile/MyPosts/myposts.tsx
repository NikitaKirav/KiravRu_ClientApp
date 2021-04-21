import React, { Component, useEffect, useState } from 'react';

import { Post } from './Post/post';
import { PostType, ProfileType } from '../../../../../redux/project-messenger/types/types';
import s from './myposts.module.less';
import { AddPostFormValuesType } from './AddPostForm/add-post-form';
import AddPostForm from './AddPostForm/add-post-form';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, addPost, actions } from '../../../../../redux/project-messenger/profile-reducer';
import { useLocation } from 'react-router-dom';
import { AppStateType } from '../../../../../redux/redux-store';
import { reset } from 'redux-form';


export type MapStatePropsType = {
    posts: Array<PostType>
    profile: ProfileType | null
}


const MyPosts: React.FC<MapStatePropsType> = ({posts, profile}) => {

    const dispatch = useDispatch();
    const location = useLocation();
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const [newPostText, setNewPostText] = useState('');
 
    let onAddPost = (formData: AddPostFormValuesType) => {
        if (formData.newPostText) {
            setNewPostText(formData.newPostText);
            dispatch(addPost(formData.newPostText, profile.id));
            dispatch(reset("profile-add-post"));
        }
    }

    useEffect(() => {
        return () => {
            dispatch(actions.setPosts([]));
            dispatch(actions.setUserProfile(null));
        }
    },[]);


    useEffect(() => {
        if(profile && profile.userId) {
            dispatch(getPosts(profile.userId));   
      
        }   
    }, [profile]);

    return (    
        <div className={s.postsBlock}>
            {isAuth && <AddPostForm onSubmit={onAddPost} />}
            <div className={s.posts}>
                {posts.length > 0 && [...posts].reverse().map(p => <Post key={p.id} post={p} userId={profile.userId} />)}
            </div>
        </div>
    );
}

const MyPostsMemorized = React.memo(MyPosts);

export default MyPostsMemorized;
