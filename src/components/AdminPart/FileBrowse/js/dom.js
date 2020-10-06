import s from '../file-browse.module.less';
export function getFolderElement() {
    return document.querySelector(`.${s.dirlist}`, `.${s.folder}`, `.${s.folderElement}`);
}

export function getFileExplorer() {
    return document.querySelector('#fileExplorer');
}

export function getCreateFolderButton() {
    return document.querySelector('#createFolder');
}

export function getRenameFolderButton() {
    return document.querySelector('#renameFolder');
}

export function getRemoteFolderButton() {
    return document.querySelector('#remoteFolder');
}

export function getChooseFileButton() {
    return document.querySelector(`#${s.chooseFile}`);
}

export function getCopyFileButton() {
    return document.querySelector(`#${s.copyFile}`);
}

export function getMoveFileButton() {
    return document.querySelector(`#${s.moveFile}`);
}

export function getRenameFileButton() {
    return document.querySelector(`#${s.renameFile}`);
}

export function getRemoteFileButton() {
    return document.querySelector(`#${s.remoteFile}`);
}

export function getDownloadFile() {
    return document.querySelector('#uploadFile');
}

export function getImageElement() {
    return document.querySelector('#fileExplorer',`.${s.imageElement}`);
}

export function getLeftPart() {
    return document.querySelector(`.${s.left}`);
}

export function getRightPart() {
    return document.querySelector(`.${s.right}`);
}

export function getActiveFiles() {
    return document.querySelectorAll(`.${s.activeFile}`);
}

// Get a List of Image Elements of the right part 
export function getImageElements(e) {
    return findElement(e, s.imageElement);
}

export function getNameActiveFile() {
    return document.querySelector(`.${s.activeFile}`).querySelector('img').title;
}

export function getNameActiveFolder(topElementOfTree) {
    return topElementOfTree.querySelector(`.${s.activeFolder}`).querySelector(`.${s.folderName}`).innerHTML;
}

export function getActiveFolderProperty(topElementOfTree) {
    return topElementOfTree.querySelector(`.${s.activeFolder}`);
}

export function getFolder(folderProperty) {
    return folderProperty.parentElement;
}

export function getParentOfFolder(folderProperty) {
    return folderProperty.parentElement.parentElement.parentElement;
}

export function getFolderProperty(folder) {
    return folder.querySelector(`.${s.folderElement}`);
}

export function getMaginLeftOfFolder(folderProperty) {
    const a = folderProperty.querySelector('a');
    return a.style.marginLeft;
}

export function changeUrlOfFolder(folderProperty, url) {
    const a = folderProperty.querySelector('a');
    a.title = url;
}

export function changeNameOfFolder(folderProperty, nameNew) {
    const text = folderProperty.querySelector(`.${s.folderName}`);
    text.innerHTML = nameNew;
}

export function getUrlOfFolder(folderProperty) {
    const a = folderProperty.querySelector('a');
    return a.title;
}

export function getUrlOfActiveFolder(topElementOfTree) {
    const a = getActiveFolderProperty(topElementOfTree).querySelector('a');
    return a.title;
}

export function getFolderProperties(e) {
    return findElement(e, s.folderElement);
}

export function getNamesActiveFiles() {
    const names = [];
    getActiveFiles().forEach((activeFile) => {
        names.push(activeFile.querySelector('img').title);
    });
    return names;
}

export function findElement(e, text) {
    try {
        const element = e.path.find(x => x.classList.contains(text));
        return element;
    } catch {
        return null;
    }
}
