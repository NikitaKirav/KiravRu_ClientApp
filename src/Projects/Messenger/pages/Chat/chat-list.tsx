import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './chat-list.module.less';
import { List, message, Avatar, Spin, Comment } from 'antd';
import reqwest from 'reqwest';
import {getChatList} from '../../../../redux/project-messenger/chat-reducer';

import InfiniteScroll from 'react-infinite-scroller';
import { AppStateType } from '../../../../redux/redux-store';
import { Link } from 'react-router-dom';
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
import { UserOutlined } from '@ant-design/icons';


export const ChatList: React.FC = () => {

    const [data, setData] = useState([]);
    const [isLoading, changeIsLoading] = useState(false);
    const [hasMore, changeHasMore] = useState(true);
    const dispatch = useDispatch();
    const chatList = useSelector((state: AppStateType) => state.chat.data.chatList);
    const status = useSelector((state: AppStateType) => state.chat.status);

    const fetchData = callback => {
        reqwest({
          url: fakeDataUrl,
          type: 'json',
          method: 'get',
          contentType: 'application/json',
          success: res => {
            callback(res);
          },
        });
      };
    
      const handleInfiniteOnLoad = () => {
        changeIsLoading(true);

        if (data.length > 14) {
          message.warning('Infinite List loaded all');
          changeIsLoading(false);
          changeHasMore(false);
          return;
        }
        fetchData(res => {
          setData(data.concat(res.results));
          changeIsLoading(false);
        });
      };

    useEffect(() => {
        if(status === "ready") {
            dispatch(getChatList());
        }
    }, [status]);

    useEffect(() => {
        setData(chatList);
    }, [chatList])

/*
    from: string
    to: string
    fromPhoto: string
    toPhoto: string
    updateDate: string
    text: string
    fromUserName: string
    toUserName: string
    userId: string*/
    return (
        <div className={s.chatList}>
        <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!isLoading && hasMore}
          useWindow={false}
        >
            <List
                className="comment-list"
                header={`${data.length} replies`}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                <li>
                    <Link to={`/projects/messenger/chat/${item.userId}`}>
                    <Comment className={s.comment}
                    author={item.userId === item.from ? <span className={s.userName}>{item.fromUserName}</span> : <span className={s.userName}>{item.toUserName}</span>}
                    avatar={item.userId === item.from ? item.fromPhoto ? <Avatar src={item.fromPhoto} size={64} alt={item.fromUserName}/> : <Avatar size={64} icon={<UserOutlined />} />
                                                      : item.toPhoto ? <Avatar src={item.toPhoto} size={64} alt={item.toUserName}/> : <Avatar size={64} icon={<UserOutlined />} />}
                    content={<div className={s.messageContext}>
                        {item.fromPhoto ? <Avatar src={item.fromPhoto} /> : <Avatar size={32} icon={<UserOutlined />} />}<div className={s.contextText}>{item.text}</div>
                    </div>}
                    datetime={<span className={s.date}>{item.updateDate}</span>}
                    />
                    </Link>
                </li>
                )}
            />
            {isLoading && hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
        </InfiniteScroll>
      </div>
      </div>
    );
}