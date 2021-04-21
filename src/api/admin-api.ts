import { instance } from "./kirav-api";

export const adminAPI = {
    getUsers(search = '') {
        return instance.get(`users/getUsers?search=${search}`);
    },

    getUser(userId) {
        return instance.get(`users/getUser?id=${userId}`).then(response => {
            return response.data;
        });
    },

    postUser(user) {
        if(user.Id === null) {
            return instance.post(`users/create`, { Email: user.Email, UserName: user.UserName, Password: user.Password }).then(response => {
                return response.data;
            });
        } else {            
            return instance.post(`users/edit`, { Id: user.Id, Email: user.Email, UserName: user.UserName }).then(response => {
                return response.data;
            });
        }
    },

    getChangePassword(userId) {
        return instance.get(`users/changePassword?id=${userId}`).then(response => {
            return response.data;
        });
    },

    postChangePassword(user) {
        return instance.post(`users/changePassword`, { Email: user.Email, Id: user.Id, NewPassword: user.NewPassword }).then(response => {
            return response.data;
        });
    },

    getUserDelete(userId) {
        return instance.get(`users/delete?id=${userId}`);
    },

    getRoles(search = '') {
        return instance.get(`roles/getRoles?search=${search}`);
    },

    getRoleDelete(roleId) {
        return instance.get(`roles/deleteRole?id=${roleId}`);
    },

    postCreateRole(role) {
        return instance.post(`roles/createRole`, { name: role.Name }).then(response => {
            return response.data;
        });
    },

    getUserAccess(userId) {
        return instance.get(`roles/editRole?userId=${userId}`).then(response => {
            return response.data;
        });
    },

    putUpdateAccess(access) {
        return instance.put(`roles/updateAccess`, { Roles: access.Roles, UserId: access.UserId }).then(response => {
            return response.data;
        });
    }
}