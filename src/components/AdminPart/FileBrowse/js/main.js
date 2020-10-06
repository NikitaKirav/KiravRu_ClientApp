import Directories from './Components/Directories';
import imageService from './image-service';
import Files from './Components/Files';
import ModalWindows from './Components/ModalWindow';
import navigation from './Components/Navigation';
//import './Styles/style.less';
import {
    getFolderElement, getRemoteFileButton, getRenameFileButton, getMoveFileButton,
    getCopyFileButton, getCreateFolderButton, getRenameFolderButton, getRemoteFolderButton,
    getLeftPart, getRightPart, getImageElement, getDownloadFile, getUrlOfFolder, getFolderProperties,
} from './dom';
import s from '../file-browse.module.less';
import onChooseFile from './choose-file.js';

const directories = new Directories();

export function initialization() {
        
    const folderElement = getFolderElement();
    const createFolderButton = getCreateFolderButton();
    const renameFolderButton = getRenameFolderButton();
    const remoteFolderButton = getRemoteFolderButton();
    const copyFileButton = getCopyFileButton();
    const moveFileButton = getMoveFileButton();
    const renameFileButton = getRenameFileButton();
    const remoteFileButton = getRemoteFileButton();
    const downloadFile = getDownloadFile();
    const imageElement = getImageElement();
    const leftPart = getLeftPart();
    const rightPart = getRightPart();
    let modalWindow = new ModalWindows();
    modalWindow.initialization();
    onChooseFile();

    if (folderElement) {
        folderElement.addEventListener('click', e => {
            const files = new Files();
            const folderProperty = getFolderProperties(e);
            const topElementOfTree = leftPart;
            directories.openFolderShowFiles(folderProperty, topElementOfTree);
            const url = getUrlOfFolder(folderProperty);
            files.getFiles(url);
        });
    }

    if (remoteFileButton) {
        remoteFileButton.addEventListener('click', () => {
            modalWindow.openModalRemoteFiles();
        });
    }

    if (renameFileButton) {
        renameFileButton.addEventListener('click', () => {
            modalWindow.openModalRenameFile();
        });
    }

    if (moveFileButton) {
        moveFileButton.addEventListener('click', function () {
            modalWindow.openModalMoveFiles();
        });
    }

    if (copyFileButton) {
        copyFileButton.addEventListener('click', function () {
            modalWindow.openModalCopyFiles();
        });
    }

    if (createFolderButton) {
        createFolderButton.addEventListener('click', function () {
            modalWindow.openModalCreateFolder();
        });
    }

    if (renameFolderButton) {
        renameFolderButton.addEventListener('click', function () {
            modalWindow.openModalRenameFolder();
        });
    }

    if (remoteFolderButton) {
        remoteFolderButton.addEventListener('click', function () {
            modalWindow.openModalRemoteFolder();
        });
    }

    if (leftPart) {
        leftPart.addEventListener('click', function () {
            navigation.makeActiveLeftPart();
        });
    }

    if (rightPart) {
        rightPart.addEventListener('click', function () {
            navigation.makeActiveRightPart();
        });
    }

    if (imageElement) {
        imageElement.addEventListener('click', e => {
            navigation.makeActiveFile(e);
        });
    }

    if (downloadFile) {
        downloadFile.addEventListener('change', function () {
            const activeDirectory = document.querySelector(`.${s.activeFolder}`);
            const dir = activeDirectory.querySelector('a').title;
            imageService.uploaFile(this.files[0], dir);
            downloadFile.value = "";
        });
    }
}


