import { PhotosType, ProfileType } from '../../redux/project-messenger/types/types';
import { instance, APIResponseType } from './api';

type SavePhotoResponseDataType = {
    photos: PhotosType
}

type StatusType = {
    status: string
}

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get<APIResponseType<ProfileType>>(`profile/`+userId).then(res => res.data);
    },
    getStatus(userId: string) {
        return instance.get<APIResponseType<StatusType>>(`profile/status/` + userId).then(res => res.data);
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, { status }).then(res => res.data);
    },
    savePhoto(photoFile: File) {
        let formData = new FormData();
        formData.append("file", photoFile, photoFile.name ? photoFile.name : generateUUID() + '.png');
        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);

        return null;
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile).then(res => res.data);
    },
    getPosts(userId: string) {
        return instance.get(`post/${userId}`).then(res => res.data);
    },
    addPost(text: string, profileId: string) {
        return instance.post(`post`, {text, profileId}).then(res => res.data);
    },
    addLike(postId: string, like: boolean) {
        return instance.put(`post/like`, {postId, like}).then(res => res.data);
    },
    deletePost(postId: string) {
        return instance.delete(`post/${postId}`).then(res => res.data);
    }  
}

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}