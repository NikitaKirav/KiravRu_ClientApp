import { instance } from "./kirav-api";

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