import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:  {
        "API-KEY": "64b4933c-d320-4708-ad57-93664b1c2552"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    getProfile(userId) {
        console.warn('Obsolete method. Please profileAPI object.');
        return profileAPI.getProfile(userId);
    },
    unfollow(id) {
        return instance.delete(`follow/${id}`)
            .then(response => {
                return response.data;
            });
    },
    follow(id) {
        return instance.post(`follow/${id}`)
            .then(response => {
                return response.data;
            });
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/`+userId)
        .then(response => {
            return response.data;
        });
    },
    getStatus(userId) {
        return instance.get(`profile/status/`+userId);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status });
    }
    
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe});
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}

