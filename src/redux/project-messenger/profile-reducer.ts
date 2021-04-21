import { FormAction, stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { ResultCode } from "../../api/project-messanger/api";
import { profileAPI } from "../../api/project-messanger/profile-api";
import { usersAPI } from "../../api/project-messanger/users-api";
import { AppStateType, BaseThunkType, InferActionsTypes } from "../redux-store";
import { PhotosType, PostType, ProfileType } from "./types/types";

let initialState = {
    posts: [] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    photo: null as HTMLImageElement,
    followed: false 
}

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'project-messenger/profile/ADD_POST':  {
            let newPost = action.post;        
            return {
                ...state,
                posts: [ ...state.posts, newPost]
            };
        }
        case 'project-messenger/profile/SET_USER_PROFILE': {
            return { ...state, profile: action.profile };
        }
        case 'project-messenger/profile/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'project-messenger/profile/SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos }
            }
        }
        case 'project-messenger/profile/SET_POSTS': {
            return {
                ...state,
                posts: action.posts
            }
        }
        case 'project-messenger/profile/ADD_PHOTO': {
            return {
                ...state,
                photo: action.photo
            }
        }
        case 'project-messenger/profile/CHANGE_FOLLOWED': {
            return {
                ...state,
                followed: action.followed
            }
        }
        default:
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>;


export const actions = {
   /* addPostActionCreator: (newPostText: string) => {
        return { type: 'project-messenger/profile/ADD_POST', newPostText  } as const;
    },*/
    setStatus: (status: string) => {
        return { type: 'project-messenger/profile/SET_STATUS', status } as const;
    },
    setUserProfile: (profile: ProfileType) => {
        return { type: 'project-messenger/profile/SET_USER_PROFILE', profile } as const;
    },
    savePhotoSuccess: (photos: PhotosType) => {
        return { type: 'project-messenger/profile/SAVE_PHOTO_SUCCESS', photos } as const;
    },
    setPosts: (posts: Array<PostType>) => {
        return { type: 'project-messenger/profile/SET_POSTS', posts } as const;
    },
    addPost: (post: PostType) => {
        return { type: 'project-messenger/profile/ADD_POST', post } as const;
    },
    addPhoto: (photo: HTMLImageElement) => {
        return { type: 'project-messenger/profile/ADD_PHOTO', photo } as const;
    },
    changeFollowed: (followed: boolean) => {
        return { type: 'project-messenger/profile/CHANGE_FOLLOWED', followed} as const;
    }
}


type ThunkType = BaseThunkType<ActionsType | FormAction>;

export const addPhoto = (photo: HTMLImageElement): ThunkType => async (dispatch) => {
    dispatch(actions.addPhoto(photo));      
}

export const getUserProfile = (userId: string): ThunkType => async (dispatch) => {  
    if (userId) {
        let request = await profileAPI.getProfile(userId);
        dispatch(actions.setUserProfile(request.data));        
    }  
}

export const getStatus = (userId: string): ThunkType => async (dispatch) => {
    if (userId) {
        let response = await profileAPI.getStatus(userId);
        if (response.data.status !== undefined) { 
            dispatch(actions.setStatus(response.data.status));
        }     
    }
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if(data.resultCode === ResultCode.Success) {
        dispatch(actions.setStatus(status));
    }       
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if(data.resultCode === ResultCode.Success) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
   const userId = getState().auth.userId;
   const data = await profileAPI.saveProfile(profile);

   if(data.resultCode === ResultCode.Success) {
       if (userId != null) {
            dispatch(getUserProfile(userId));
       } else {
           throw new Error("userId can't be null");
       }

   } else {
       //dispatch(stopSubmit("edit-profile", {"contacts": {"facebook": data.messages[0] }}));
       dispatch(stopSubmit("edit-profile", {_error: data.messages[0] }));
       return Promise.reject(data.messages[0]);
   }
}

export const getPosts = (userId: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.getPosts(userId);
    if(data.resultCode === ResultCode.Success) {
        dispatch(actions.setPosts(data.data.posts));
    }   
}

export const deleteActivePost = (postId: string, userId: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.deletePost(postId);
    if(data.resultCode === ResultCode.Success) {
        dispatch(getPosts(userId));
    } 
}

export const addPost = (text: string, profileId: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.addPost(text, profileId);
    if(data.resultCode === ResultCode.Success) {
        dispatch(actions.addPost(data.post));
    }  
}

export const addLike = (postId: string, like: boolean, userId: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.addLike(postId, like);
    if(data.resultCode === ResultCode.Success) {
        dispatch(getPosts(userId));
    }  
}

export const getFollowed = (userId: string): ThunkType => async (dispatch) => {
    let data = await usersAPI.getFollowed(userId);
    if(data.resultCode === ResultCode.Success) {
        dispatch(actions.changeFollowed(data.data.followed));
    } 
}

export default profileReducer;