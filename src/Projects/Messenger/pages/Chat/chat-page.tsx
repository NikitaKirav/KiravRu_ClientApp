import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, getUserAvatar, stopMessagesListening, getMessagesFromUser } from '../../../../redux/project-messenger/chat-reducer';
import { AppStateType } from '../../../../redux/redux-store';
import { List, message, Avatar, Spin, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import reqwest from 'reqwest';
import './message.css';

const { TextArea } = Input;

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo'; //delete in future

import s from './chat-page.module.less';
import { Link, RouteComponentProps, useLocation } from 'react-router-dom';


export type ChatMessageType = {
    text: string
    fromPhoto: string
    from: string
    to: string
    updateDate: string
}

type PathParamsType = {
    userId: string
}

export const ChatPage: React.FC<RouteComponentProps<PathParamsType>> = (props) => {
    const dispatch = useDispatch();
    const status = useSelector((state: AppStateType) => state.chat.status);
    const location = useLocation();
   /* const chatData = useSelector((state: AppStateType) => state.chat.data);

    const [data, setData] = useState([]);
    const [isLoading, changeIsLoading] = useState(false);
    const [hasMore, changeHasMore] = useState(true);
    const location = useLocation();
    const dispatch = useDispatch();
    const status = useSelector((state: AppStateType) => state.chat.status);

    
      const handleInfiniteOnLoad = () => {
        changeIsLoading(true);

        if (data.length > 14) {
          message.warning('Infinite List loaded all');
          changeIsLoading(false);
          changeHasMore(false);
          return;
        }
          setData(data.concat(chatData.messages));
          changeIsLoading(false);
      };

    useEffect(() => {
        if(chatData && chatData.messages) {
            setData(chatData.messages);
        }
    }, [chatData]);*/

    useEffect(() => {
        if (status === "ready") {
            dispatch(getMessagesFromUser(props.match.params.userId));
        }
    }, [location, status]);

    return (  <div className={s.chatPage}>           
            {/*}    {messages && messages.onlineUsers &&
            messages.onlineUsers.map(onlineUser => {
                return (
                    <div id={onlineUser.userId} className={s.onlineUser} key={onlineUser.userId} >
                        <img width="80px" src={onlineUser.photo}/>
                        <div className={s.newMessage}><label className={s.messageCount}>0</label></div>
                        <div className={s.nameText}>{onlineUser.userName}</div>
                    </div>
                );
            })} */}      

            <Chat {...props} />
        </div>
    );
}

export const Chat: React.FC<RouteComponentProps<PathParamsType>> = (props) => {
    const dispatch = useDispatch();

    /*useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
    }, []);*/

    
    return (
        <div className={s.contentMesseges}>
            <MessangerHead {...props} />
            <Messages />
            <AddMessageForm {...props} />
        </div>
    );
}

export const MessangerHead: React.FC<RouteComponentProps<PathParamsType>> = (props) => {
    const avatars = useSelector((state: AppStateType) => state.chat.data.usersAvatarsFriends);
    const [avatar, setAvatar] = useState('');
    const [userName, setUserName] = useState('');
    const status = useSelector((state: AppStateType) => state.chat.status);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'ready') {
            dispatch(getUserAvatar(props.match.params.userId));
        }
    }, [status]);

    useEffect(() => {
        if (avatars && avatars.length > 0) {
            const user = avatars.find(ava => ava.userId === props.match.params.userId);
            if(user) {
                setAvatar(user.userAvatar);
                setUserName(user.userName);
            }
        }
    }, [avatars]);

    return (
        <div>
            <Link className={s.addressee} to={`/projects/messenger/profile/${props.match.params.userId}`}>
                {avatar ? <Avatar src={avatar} />
                        : <Avatar size={32} icon={<UserOutlined />} />}
                <div className={s.friendName}>{userName}</div>
            </Link>
        </div>
    );
}

export const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.data.messages);
    const message = useSelector((state: AppStateType) => state.chat.data.message);
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(false);
    const localData = JSON.parse(localStorage.getItem('userData_Messanger'));
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(messages);
        setIsAutoScroll(true);
    }, [messages]);

    useEffect(() => {
        setData([...data, message]);
    }, [message]);

    useEffect(() => {
        if(isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView();
        }
    },[data])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true);
        } else {
            isAutoScroll && setIsAutoScroll(false);
        }

    }

    return (
        <div className={s.messageList} onScroll={scrollHandler}>
            {data && data.map((m, index) => <Message key={index} message={m} userId={localData.userId} />)}
            <div ref={messagesAnchorRef}></div>
        </div>
    );
}

export const AddMessageForm: React.FC<RouteComponentProps<PathParamsType>> = (props) => {
    let [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const status = useSelector((state: AppStateType) => state.chat.status);
    const localData = JSON.parse(localStorage.getItem('userData_Messanger'));
    const avatars = useSelector((state: AppStateType) => state.chat.data.userAvatar);
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        if (localData.userId) {
            if(avatars && avatars.userAvatar) {
                setAvatar(avatars.userAvatar);
            }
        }
    }, [avatars])
    
    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessage(localData.userId, message.replace (/[\n\r]/g, ' ').replace (/\s{2,}/g, ' '), props.match.params.userId));
        setMessage('');
    }

    return (
        <div className={s.addMessageform}>
            {avatar ? <Avatar src={avatar} alt={localData.userName} /> : <Avatar size={32} icon={<UserOutlined />} />}
            <div style={{width: '100%', marginLeft: '15px'}}>                
                <TextArea showCount onChange={(e) => setMessage(e.target.value)} value={message}  autoSize={{ minRows: 2, maxRows: 6 }} />
                <Button className={s.sendButton} type="primary" disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</Button>
            </div>
        </div>
    );
}

export const Message: React.FC<{message: ChatMessageType, userId: string}> = React.memo(({message, userId}) => {
    return (<>
        {userId === message.from ?
            <div className="myMessage message-orange">
                <div className="message-content">{message.text}</div>
                <div className="message-timestamp-left">{message.updateDate}</div>
            </div>
         :
            <div className="otherMessage message-blue">
                <div className="message-content">{message.text}</div>
                <div className="message-timestamp-right">{message.updateDate}</div>
            </div>
        }
        </>
    );
});