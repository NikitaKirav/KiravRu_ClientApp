import React, { createElement, useEffect, useState } from 'react';
import { Comment, Tooltip, Avatar, Menu, Dropdown, Popconfirm  } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, DownOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';


import s from './post.module.less';
import { PostType } from '../../../../../../redux/project-messenger/types/types';
import { Link } from 'react-router-dom';
import { addLike, deleteActivePost } from '../../../../../../redux/project-messenger/profile-reducer';
import { AppStateType } from '../../../../../../redux/redux-store';

type PropsType = {
    post: PostType
    userId: string
}

export const Post: React.FC<PropsType> = ({post, userId}) => {
    const [likes, setLikes] = useState(post.likes);
    const [dislikes, setDislikes] = useState(post.dislikes);
    const [action, setAction] = useState(post.userLike);
    const dispatch = useDispatch();
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    const like = () => {
      if (isAuth) {
        if ((action === 'disliked') || (action === null) || (action === undefined))  {
          setLikes(likes + 1);
          setDislikes(dislikes);
          setAction('liked');
          dispatch(addLike(post.id, true, userId));

          if (action === 'disliked') {
            setDislikes(dislikes - 1);
          }
        }
      }
    };
  
    const dislike = () => {
      if (isAuth) {
        if ((action === 'liked') || (action === null)) {
          setLikes(likes);
          setDislikes(dislikes + 1);
          setAction('disliked');
          dispatch(addLike(post.id, false, userId));

          if (action === 'liked') {
            setLikes(likes - 1);
          }
        }
      }
    };

    const deletePost = () => {
      dispatch(deleteActivePost(post.id, userId));
    }
  
    const actions = [
      <Tooltip key="comment-basic-like" title="Like">
        <span onClick={like}>
          {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
        </span>
      </Tooltip>,
      <Tooltip key="comment-basic-dislike" title="Dislike">
        <span onClick={dislike}>
          {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          <span className="comment-action">{dislikes}</span>
        </span>
      </Tooltip>
    ];

    //,<span key="comment-basic-reply-to">Reply to</span>,

    const menu = (
      <Menu className={s.menu}>
        <Menu.Item key="0">
          <Popconfirm title="Are you sure to delete this post?" okText="Yes" onConfirm={deletePost} cancelText="No" placement="topRight">
            <div>Delete</div>
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );

    return (
        <Comment
        actions={actions}
        author={<>
            <Link to={`/projects/messenger/profile/${post.userId}`}>
              <span className={s.userName}>{post.userName}</span>
            </Link>
            <Dropdown overlay={menu} className={s.postMenu} placement="bottomRight">
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <DownOutlined className={s.menuIcon} />
                    </a>
            </Dropdown>
            </>}
        avatar={
          post.avatar ? <Avatar
            className={s.postAvatar}
            size={64}
            src={post.avatar}
            alt={post.userName}
          />
          : <Avatar size={64} icon={<UserOutlined />} />
        }
        content={post.text}
        datetime={<span>{post.createDate}</span>}
      />       
    );
}

