import imageService from '../../image-service';
import Directories from '../Directories';
import {
    getFolderProperties, getActiveFolderProperty, getUrlOfActiveFolder,
    getLeftPart, getNamesActiveFiles, getNameActiveFile, getNameActiveFolder
} from '../../dom';
import s from '../../../file-browse.module.less';

export default class ModalWindows {

    constructor() { 
        this.closeWindow = document.querySelector(`.${s.closeModalWindow}`);
        this.modalCancel = document.querySelector('#cancelModal');
        this.modalOk = document.querySelector('#okModal');
        this.modalWindow = document.querySelector('#modalWindow');
        this.inputModal = document.querySelector('#inputModal');
        this.title = document.querySelector(`.${s.modalTitle}`);
        this.infoText = document.querySelector('#infoText');
        this.directoriesListModal = document.querySelector(`.${s.directoriesList}`);

        this.directories = new Directories();
        this.folderElement = document.querySelector(`.${s.directoriesList}`, `.${s.dirlist}`, `.${s.folder}`, `.${s.folderElement}`);

    }

    initialization() {
        if (this.folderElement) {
            this.folderElement.addEventListener('click', e => {
                const folderProperty = getFolderProperties(e);
                const topElementOfTree = this.directoriesListModal;
                this.directories.openFolderShowFiles(folderProperty, topElementOfTree);
            });
        }
        if (this.modalOk) {
            this.modalOk.addEventListener('click', () => {
                const name = this.inputModal.value;
                const leftPart = getLeftPart();
                const folderProperty = getActiveFolderProperty(leftPart);
                const url = getUrlOfActiveFolder(leftPart);
                if (this.modalWindow.dataset.id === 'createFolder') {
                    imageService.addDirectory(url, name, folderProperty);
                }
                else if (this.modalWindow.dataset.id === 'renameFolder') {
                    imageService.renameDirectory(url, name, folderProperty);
                }
                else if (this.modalWindow.dataset.id === 'remoteFolder') {
                    imageService.remoteDirectory(url, folderProperty);
                }
                else if (this.modalWindow.dataset.id === 'remoteFiles') {
                    const names = getNamesActiveFiles();
                    imageService.remoteFiles(names, url);
                }
                else if (this.modalWindow.dataset.id === 'renameFile') {
                    const nameOld = getNameActiveFile();
                    imageService.renameFile(nameOld, name, url);
                }
                else if (this.modalWindow.dataset.id === 'moveFiles') {
                    const names = getNamesActiveFiles();
                    const urlNew = getUrlOfActiveFolder(this.directoriesListModal);
                    imageService.moveFiles(names, urlNew, url);
                }
                else if (this.modalWindow.dataset.id === 'copyFiles') {
                    const names = getNamesActiveFiles();
                    const urlNew = getUrlOfActiveFolder(this.directoriesListModal);
                    imageService.copyFiles(names, urlNew, url);
                }
                this.closeModal();
            });
        }
        if (this.closeWindow) {
            this.closeWindow.addEventListener('click', () => {
                this.closeModal();
            });
        }
    
        if (this.modalCancel) {
            this.modalCancel.addEventListener('click', () => {
                this.closeModal();
            });
        }
    }

    
    openModalRemoteFolder() {
        this.openModal({
            titleText: 'Remote the folder',
            info: 'Are you sure that want to delete this folder?',
            inputDisplay: 'none',
            inputValue: '',
            idWindow: 'remoteFolder',
            dirList: 'none',
        });
    }

    openModalRenameFolder() {
        const topElementOfTree = getLeftPart();
        const folderName = getNameActiveFolder(topElementOfTree);
        this.openModal({
            titleText: 'Rename the folder',
            info: 'Enter the new name of this folder:',
            inputDisplay: 'block',
            inputValue: folderName,
            idWindow: 'renameFolder',
            dirList: 'none',
        });
    }

    openModalCreateFolder() {
        this.openModal({
            titleText: 'Create new folder',
            info: 'Enter the name of new folder:',
            inputDisplay: 'block',
            inputValue: '',
            idWindow: 'createFolder',
            dirList: 'none',
        });
    }

    openModalRenameFile() {
        const fileName = getNameActiveFile();
        this.openModal({
            titleText: 'Rename the file',
            info: 'Enter the new name of this file:',
            inputDisplay: 'block',
            inputValue: fileName,
            idWindow: 'renameFile',
            dirList: 'none',
        });
    }

    openModalRemoteFiles() {
        this.openModal({
            titleText: 'Remote the files',
            info: 'Are you sure that want to delete this(these) file(s)?',
            inputDisplay: 'none',
            inputValue: '',
            idWindow: 'remoteFiles',
            dirList: 'none',
        });
    }

    openModalMoveFiles() {
        this.openModal({
            titleText: 'Move files',
            info: 'Choose a folder:',
            inputDisplay: 'none',
            inputValue: '',
            idWindow: 'moveFiles',
            dirList: 'block',
        });
    }

    openModalCopyFiles() {
        this.openModal({
            titleText: 'Copy files',
            info: 'Choose a folder:',
            inputDisplay: 'none',
            inputValue: '',
            idWindow: 'copyFiles',
            dirList: 'block',
        });
    }

    openModal(data) {
        this.title.innerHTML = data.titleText;
        this.infoText.innerHTML = data.info;
        this.inputModal.style.display = data.inputDisplay;
        this.inputModal.value = data.inputValue;
        this.modalWindow.dataset.id = data.idWindow;
        this.modalWindow.style.display = 'block';
        this.directoriesListModal.style.display = data.dirList;
    }

    closeModal() {
        this.modalWindow.style.display = 'none';
    }

}

//export default {
//    openModalCreateFolder,
//    openModalRenameFolder,
//    openModalRemoteFolder,
//    openModalRenameFile,
//    openModalRemoteFiles,
//    openModalMoveFiles,
//    openModalCopyFiles,
//    initialization
//}