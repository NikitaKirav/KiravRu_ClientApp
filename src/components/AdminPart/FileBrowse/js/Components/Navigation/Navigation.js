import {
    getLeftPart, getRightPart, getCreateFolderButton, getCopyFileButton,
    getRenameFolderButton, getRemoteFolderButton, getRenameFileButton,
    getMoveFileButton, getRemoteFileButton, getImageElements,
    getActiveFiles, getChooseFileButton,
} from '../../dom';
import s from '../../../file-browse.module.less';

function makeActiveLeftPart() {
    getLeftPart().classList.add(s.activPart);
    getRightPart().classList.remove(s.activPart);

    getCreateFolderButton().style.display = 'block';
    getRenameFolderButton().style.display = 'block';
    getRemoteFolderButton().style.display = 'block';
    getRenameFileButton().style.display = 'none';
    getChooseFileButton().style.display = 'none';
    getCopyFileButton().style.display = 'none';
    getMoveFileButton().style.display = 'none';
    getRemoteFileButton().style.display = 'none';
}

function makeActiveRightPart() {
    getRightPart().classList.add(s.activPart);
    getLeftPart().classList.remove(s.activPart);
    showButtonsChangingFile();
    getCreateFolderButton().style.display = 'none';
    getRenameFolderButton().style.display = 'none';
    getRemoteFolderButton().style.display = 'none';
}

function makeActiveFile(e) {
    const imageLi = getImageElements(e);
    if (imageLi === null) { return; }

    if (imageLi.classList.contains(s.activeFile)) {
        imageLi.classList.remove(s.activeFile);
    } else {
        imageLi.classList.add(s.activeFile);
    }
    showButtonsChangingFile();
}

function showButtonsChangingFile() {
    const activeFiles = getActiveFiles();
    if (activeFiles.length == 1) {
        getChooseFileButton().style.display = 'block';
        getRenameFileButton().style.display = 'block';
        getCopyFileButton().style.display = 'block';
        getMoveFileButton().style.display = 'block';
        getRemoteFileButton().style.display = 'block';

    } else if (activeFiles.length > 1) {
        getChooseFileButton().style.display = 'none';
        getRenameFileButton().style.display = 'none';
        getCopyFileButton().style.display = 'block';
        getMoveFileButton().style.display = 'block';
        getRemoteFileButton().style.display = 'block';
    }
    else {
        getChooseFileButton().style.display = 'none';
        getRenameFileButton().style.display = 'none';
        getCopyFileButton().style.display = 'none';
        getMoveFileButton().style.display = 'none';
        getRemoteFileButton().style.display = 'none';
    }
}

export default {
    makeActiveLeftPart,
    makeActiveRightPart,
    makeActiveFile,
    showButtonsChangingFile,
}