import Directories from './Components/Directories';
import Files from './Components/Files';
import {
    getFolder, getLeftPart, changeUrlOfFolder, changeNameOfFolder,
    getParentOfFolder, getFolderProperty, getUrlOfFolder,
} from './dom';
import { imageAPI } from '../../../../api/kirav-api.js';

function getDirectories(text) {
    if (!text) {
        return;
    }
    return imageAPI.getDirectory(text); // fetch(config.getDirectoryUrl + text)
}

function getFiles(text) {
    if (!text) {
        return;
    }
    return imageAPI.getFiles(text);
}

function addDirectory(dir, name, folderProperty) {
    if ((!dir) || (!name)) {
        return;
    }
    const directories = new Directories();
    return imageAPI.addDirectory(dir, name)
        .then(data => {
            if (data.error !== '') {
                alert(data.error);
                return;
            }
            const folder = getFolder(folderProperty);
            directories.closeTheFolder(folder);
            directories.openFolderShowFiles(folderProperty, getLeftPart());
        });
}

function renameDirectory(dir, name, folderProperty) {
    if ((!dir) || (!name)) {
        return;
    }
    return imageAPI.renameDirectory(dir, name)
        .then(data => {
            if (data.error !== '') {
                alert(data.error);
                return;
            }
            changeUrlOfFolder(folderProperty, data.dir);
            changeNameOfFolder(folderProperty, name);
        });
}

function remoteDirectory(dir, folderProperty) {
    if ((!dir) || (!name)) {
        return;
    }
    const files = new Files();
    const folder = getParentOfFolder(folderProperty);
    const folderPropertyParent = getFolderProperty(folder);
    const directories = new Directories();
    return imageAPI.remoteDirectory(dir)
        .then(data => {
            if (data.error !== '') {
                alert(data.error);
                return;
            }            
            directories.closeTheFolder(folder);
            directories.openFolderShowFiles(folderPropertyParent, getLeftPart());
            files.getFiles(getUrlOfFolder(folderPropertyParent));
        });
}

function uploaFile(upload, dir) {
    if ((!dir) || (!upload)) {
        return;
    }
    const files = new Files();
    var data = new FormData();
    data.append('upload', upload);
    //data.append('dir', dir);

    return imageAPI.uploaFile(data, dir)
        .then(data => {
            if (data.error !== '') {
                alert(data.error);
                return;
            }
            files.getFiles(dir);
        });

}

function renameFile(nameOld, nameNew, dir) {
    if ((!nameOld) || (!nameNew) || (!dir)) {
        return;
    }
    const files = new Files();
    return imageAPI.renameFile(dir, nameOld, nameNew)
        .then(data => {
            if (data.error !== '') {
                alert(data.error);
                return;
            }
            files.getFiles(dir);
        });
}

function remoteFiles(names, dir) {
    if ((!names) || (!dir))  {
        return;
    }
    const files = new Files();
    return imageAPI.remoteFiles(names, dir)
        .then(data => {
            if (data.error !== '') {
                alert(data.error);
                return;
            }
            files.getFiles(dir);
        });
}

function moveFiles(names, urlNew, url) {
    if ((!names) || (!urlNew) || (!url)) {
        return;
    }
    const files = new Files();
    return imageAPI.moveFiles(names, urlNew, url)
        .then(data => {
            if (data.error !== '') {
                alert(data.error);
                return;
            }
            files.getFiles(url);
        });
}

function copyFiles(names, urlNew, url) {
    if ((!names) || (!urlNew) || (!url)) {
        return;
    }
    const files = new Files();
    return imageAPI.copyFiles(names, urlNew, url)
        .then(data => {
            if (data.error !== '') {
                alert(data.error);
                return;
            }
            files.getFiles(url);
        });
}

export default {
    getDirectories,
    getFiles,
    addDirectory,
    renameDirectory,
    remoteDirectory,
    uploaFile,
    renameFile,
    remoteFiles,
    moveFiles,
    copyFiles,
}