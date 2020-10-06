import * as axios from 'axios';

const instance = axios.create({
    //withCredentials: true,
    baseURL: 'http://localhost:58963/api/',
    headers:  {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

export const blogAPI = {
    getArticles(pageindex = 1, pageSize = 10, search = '', sort = '-DateChange') {
        return instance.post(`blog/getArticles`, {pageindex, pageSize, sort, search});
    },

    getArticle(articleId) {
        return instance.get(`blog/getArticle?articleId=${articleId}`).then(response => {
            return response.data;
        });
    },

    getArticleEdit(articleId) {
        return instance.get(`blog/edit?articleId=${articleId}`).then(response => {
            return response.data;
        });
    },

    postArticleEdit(article, roles) {
        return instance.post(`blog/edit`, {article, roles}).then(response => {
            return response.data;
        });
    },

    getArticleDelete(articleId) {
        return instance.get(`blog/delete?id=${articleId}`);
    },

    getCategories(search = '') {
        return instance.get(`categories/list`, {search});
    },

    getCategoryEdit(categoryId) {
        return instance.get(`categories/edit?id=${categoryId}`).then(response => {
            return response.data;
        });
    },

    postCategoryEdit(category) {
        return instance.post(`categories/edit`, {category}).then(response => {
            return response.data;
        });
    },

    getCategoryDelete(categoryId) {
        return instance.get(`categories/delete?id=${categoryId}`);
    }
}

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

export const projectArtCanvasAPI = {
    uploadImage(imageData) {
        return instance.post(`projects/artcanvas/uploadImage`, {ImageData: imageData}).then(response => {
            return response.data;
        }); 
    },

    loadImages() {
        return instance.get(`projects/artcanvas/imagePaths`).then(response => {
            return response.data;
        });
    }
}

export const imageAPI = {
    getDirInfos() {
        return instance.get(`image/filebrowse`).then(response => {
            return response.data;
        });
    },

    getDirectory(url) {
        return instance.get(`image/getdirectory?dir=${url}`).then(response => {
            return response.data;
        });
    },

    getFiles(url) {
        return instance.get(`image/getfiles?dir=${url}`).then(response => {
            return response.data;
        });
    },

    addDirectory(dir, name) {
        return instance.get(`image/addnewfolder?dir=${dir}&name=${name}`).then(response => {
            return response.data;
        });
    },

    renameDirectory(dir, name) {
        return instance.get(`image/renamefolder?dir=${dir}&name=${name}`).then(response => {
            return response.data;
        });
    },

    remoteDirectory(dir) {
        return instance.get(`image/remotefolder?dir=${dir}`).then(response => {
            return response.data;
        });
    },

    uploaFile(data, dir) {
        return instance.post(`image/uploadfile?dir=${dir}`, data).then(response => {
            return response.data;
        });
    },

    renameFile(dir, nameOld, nameNew) {
        return instance.get(`image/renamefile?dir=${dir}&nameOld=${nameOld}&nameNew=${nameNew}`).then(response => {
            return response.data;
        });
    },

    remoteFiles(names, dir) {
        return instance.post(`image/remotefiles`, { names: names, dir: dir}).then(response => {
            return response.data;
        });
    },

    moveFiles(names, urlNew, url) {
        return instance.post(`image/movefiles?newDir=${urlNew}`, { names: names, dir: url }).then(response => {
            return response.data;
        });
    },

    copyFiles(names, urlNew, url) {
        return instance.post(`image/copyfiles?newDir=${urlNew}`, { names: names, dir: url }).then(response => {
            return response.data;
        });
    }
}

export const authAPI = {
    me() {
        return instance.get(`account/me`);
    },

    login(userName, password, rememberMe = false, returnUrl) {
        return instance.post(`account/login`, {userName, password, rememberMe, returnUrl})
        .then((response) => {
            if(response) {
                localStorage.setItem('token', response.data.token);
                instance.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
            }
            return response;
        })
        .catch((error) => {
            if(error.response.status === 401) {
                return error.response;
            }
        });
    },

    register(email, userName, password, passwordConfirm) {
        return instance.post(`account/register`, { email, userName, password, passwordConfirm  })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            //if(error.response.status === 400) {
                console.log(error.response);
                return error.response;
            //}
        });
    },

    logout() {
        localStorage.removeItem('token');
        instance.defaults.headers['Authorization'] = 'null';
    }
}

