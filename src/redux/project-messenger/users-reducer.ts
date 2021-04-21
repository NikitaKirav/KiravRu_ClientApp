import { Dispatch } from 'redux';
import { APIResponseType } from '../../api/project-messanger/api';
import {usersAPI} from '../../api/project-messanger/users-api';
import { BaseThunkType, InferActionsTypes } from '../redux-store';
import { UserType } from './types/types';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 50,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<string>, // array of users ids
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'project-messenger/users/FOLLOW': {
            return { 
                ...state, 
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            };
        }
        case 'project-messenger/users/UNFOLLOW': {
            return { 
                ...state, 
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            };
        }
        case 'project-messenger/users/SET_USERS': {
            return { ...state, users: action.users }
        }
        case 'project-messenger/users/SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage }
        }
        case 'project-messenger/users/SET_TOTAL_USERS_COUNT': {
            return { ...state, totalUsersCount: action.totalCount}
        }
        case 'project-messenger/users/TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching }
        }
        case 'project-messenger/users/SET_FILTER': {
            return { ...state, filter: action.payload }
        }
        case 'project-messenger/users/TOGGLE_IS_FOLLOWING_PROGRESS': {
            return { ...state, 
                followingInProgress: action.isFetching
                ? [...state.followingInProgress, action.userId]
                : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }    
}

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
    followSuccess: (userId: string) => {
        return { type: 'project-messenger/users/FOLLOW', userId } as const
    },
    unfollowSuccess: (userId: string) => {
        return { type: 'project-messenger/users/UNFOLLOW', userId } as const
    },
    setUsers: (users: Array<UserType>) => {
        return { type: 'project-messenger/users/SET_USERS', users } as const
    },
    setCurrentPage: (currentPage: number) => {
        return { type: 'project-messenger/users/SET_CURRENT_PAGE', currentPage } as const
    },
    setFilter: (filter: FilterType) => {
        return { type: 'project-messenger/users/SET_FILTER', payload: filter } as const
    },
    setTotalUsersCount: (totalCount: number) => {
        return { type: 'project-messenger/users/SET_TOTAL_USERS_COUNT', totalCount } as const
    },
    toggleIsFetching: (isFetching: boolean) => {
        return { type: 'project-messenger/users/TOGGLE_IS_FETCHING', isFetching } as const
    },
    toggleFollowingProgress: (isFetching: boolean, userId: string) => {
        return { type: 'project-messenger/users/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const
    }
}



type ThunkType = BaseThunkType<ActionsTypes>;

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, 
                                   userId: string, apiMethod: (userId: string) => Promise<APIResponseType>, 
                                   actionCreator: (userId: string) => ActionsTypes) => {
    try {
        dispatch(actions.toggleFollowingProgress(true, userId));
        let data = await apiMethod(userId);
        if (data.resultCode == 0) {
            dispatch(actionCreator(userId));
        }
        dispatch(actions.toggleFollowingProgress(false, userId));
    } catch(err) { console.error(err); } 
}

export const follow = (userId: string): ThunkType => async (dispatch) => {
    try {
        await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
    } catch(err) { console.error(err); } 
}

export const unfollow = (userId: string): ThunkType => async (dispatch) => {
    try {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
    } catch(err) { console.error(err); } 
}

export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => 
                            async (dispatch) => { 
    try {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.setFilter(filter));
        let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.data.items));
        dispatch(actions.setTotalUsersCount(data.data.totalCount));
    } catch(err) { console.error(err); } 
}

export default usersReducer;