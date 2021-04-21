import { GetItemsType, instance, APIResponseType } from './api';

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + ((friend === null) ? `` : `&friend=${friend}`))
            .then(response => {
                return response.data;
            });
    },
    unfollow(userId: number) {
        return instance.delete(`users/follow/${userId}`).then(res => res.data) as Promise<APIResponseType>;
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`users/follow/${userId}`)
            .then(response => {
                return response.data;
            });
    },
    getFollowed(userId: string) {
        return instance.get(`users/${userId}`).then(res => res.data);
    }  
}