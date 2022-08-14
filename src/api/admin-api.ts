import { instance } from "./kirav-api";

export const adminAPI = {
    getUsers(search = '') {
        return instance.get(`users/`);
    },

    getUser(userId) {
        return instance.get(`users/${userId}`).then(response => {
            return response.data;
        });
    },

    postUser(user) {
        if(user.Id === null) {
            return instance.post(`users/`, { Email: user.Email, UserName: user.UserName, Password: user.Password }).then(response => {
                return response.data;
            });
        } else {            
            return instance.put(`users/`, { Id: user.Id, Email: user.Email, UserName: user.UserName }).then(response => {
                return response.data;
            });
        }
    },

    getChangePassword(userId) {
        return instance.get(`users/changePassword/${userId}`).then(response => {
            return response.data;
        });
    },

    postChangePassword(user) {
        return instance.post(`users/changePassword`, { Email: user.Email, Id: user.Id, NewPassword: user.NewPassword }).then(response => {
            return response.data;
        });
    },

    userDelete(userId) {
        return instance.delete(`users/${userId}`);
    },

    getRoles(search = '') {
        return instance.get(`roles/`);
    },

    roleDelete(roleId) {
        return instance.delete(`roles/${roleId}`);
    },

    postCreateRole(role) {
        return instance.post(`roles/`, { name: role.Name }).then(response => {
            return response.data;
        });
    },

    getUserAccess(userId) {
        return instance.get(`roles/${userId}`).then(response => {
            return response.data;
        });
    },

    putUpdateAccess(access) {
        return instance.put(`roles/`, { Roles: access.Roles, UserId: access.UserId }).then(response => {
            return response.data;
        });
    }
}