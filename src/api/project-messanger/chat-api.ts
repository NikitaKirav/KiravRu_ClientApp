const subscribes = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
};

export type StatusType = 'pending' | 'ready' | 'error';

let ws: WebSocket | null = null;
type EventsNamesType = 'messages-received' | 'status-changed';

const closeHandler = () => {
    notifySubscribersAboutStatus('pending');
    setTimeout(createChannel, 3000);
}
const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribes['messages-received'].forEach(s => s(newMessages));
}

const openHandler = () => {
    notifySubscribersAboutStatus('ready');
    const userData = JSON.parse(localStorage.getItem('userData_Messanger'));
    if (userData && userData.token) {
        ws.send(`{"token": "${userData.token}", "action": "auntification"}`);
    }
}

const errorHandler = () => {
    notifySubscribersAboutStatus('error');
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('message', messageHandler);
    ws?.removeEventListener('open', openHandler);
    ws?.removeEventListener('error', errorHandler);
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribes['status-changed'].forEach(s => s(status));
}

function createChannel() {
    cleanUp();
    ws?.close();
    ws = new WebSocket('wss://kirav.ru:8050'); //'ws://localhost:8081' //wss://kirav.ru:8050
    notifySubscribersAboutStatus('pending');
    ws.addEventListener('close', closeHandler);
    ws.addEventListener('message', messageHandler);
    ws.addEventListener('open', openHandler);
    ws.addEventListener('error', errorHandler);
}

export const chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        subscribes['messages-received'] = [];
        subscribes['status-changed'] = [];
        cleanUp();
        ws?.close();
    },
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribes[eventName].push(callback);
        return () => {
            //@ts-ignore
            subscribes[eventName] = subscribes[eventName].filter(s => s !== callback);
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribes[eventName] = subscribes[eventName].filter(s => s !== callback);  
    },
    sendMessage(userId: string, text: string, addressee: string) {
        const userData = JSON.parse(localStorage.getItem('userData_Messanger'));
        if (userData) {
            ws?.send(`{"from": "${userId}", "text": "${text}", "to": "${addressee}", "token": "${userData.token}", "action": "saveMessage" }`);
        }
    },
    getChatList() {
        const userData = JSON.parse(localStorage.getItem('userData_Messanger'));
        if (userData) {
            ws?.send(`{"token": "${userData.token}", "action": "getChatList" }`);
        }
    },
    getMessagesFromUser(userId: string) {
        const userData = JSON.parse(localStorage.getItem('userData_Messanger'));
        if (userData) {
            ws?.send(`{"token": "${userData.token}", "action": "getMessagesFromUser", "to": "${userId}" }`);
        }
    },
    getUserAvatar(userId: string) {
        const userData = JSON.parse(localStorage.getItem('userData_Messanger'));
        if (userData) {
            ws?.send(`{"token": "${userData.token}", "action": "getUserAvatar", "userId": ["${userId}"] }`);
        }
    }
}

type MessagesReceivedSubscriberType = (messages: ChatType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;

export type ChatMessageType = {
    from: string
    to: string
    text: string
    createDate: string
    updateDate: string
    fromPhoto: string
}

export type OnlineUsersType = {
    photo: string
    userId: string
    userName: string
}

export type LastMessageInChatList = {
    from: string
    to: string
    fromPhoto: string
    toPhoto: string
    updateDate: string
    text: string
    fromUserName: string
    toUserName: string
    userId: string
}

export type UserAvatarType = {
    userId: string
    userAvatar: string
    userName: string
}

export type ChatType = {
    action: string
    message: ChatMessageType
    messages: Array<ChatMessageType>
    onlineUsers: Array<OnlineUsersType>
    chatList: Array<LastMessageInChatList>
    userAvatar: UserAvatarType
    usersAvatarsFriends: Array<UserAvatarType>
}