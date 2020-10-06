import React, { useEffect } from 'react';
import s from './file-browse.module.less';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Preloader from '../../common/Preloader/preloader';
import {getDirInfos} from '../../../redux/file-browse-reducer.js';
import {initialization} from './js/main.js';
import folderIcon from '../../../../assets/images/folderIcon.png';

const FileBrowse = (props) => {

    useEffect(() => {
        props.getDirInfos();
    },[]);

    useEffect(() => {
        initialization();
    },[props.dirInfos]);

    if(!props.dirInfos) {
        return <Preloader />
    }

    return (
        <div className={s.fileBrowse}>
            <div className={s.container}>
                <div className={s.top}>
                    <button className={classNames(s.chooseIcon, s.buttonTop)} id={s.chooseFile}>Choose file</button>
                    <div className={s.uploadBtnWrapper}>
                        <button className={classNames(s.uploadIcon, s.buttonTop, s.btn)}>Upload a file</button>
                        <input type="file" id="uploadFile" />
                    </div>
                    <button className={classNames(s.createFolderIcon, s.buttonTop)} id="createFolder">Add folder</button>
                    <button className={classNames(s.renameFolderIcon, s.buttonTop)} id="renameFolder">Rename folder</button>
                    <button className={classNames(s.deleteFolderIcon, s.buttonTop)} id="remoteFolder">Delete folder</button>
                    <button className={classNames(s.copyFileIcon, s.buttonTop)} id={s.copyFile}>Copy files</button>
                    <button className={classNames(s.moveFileIcon, s.buttonTop)} id={s.moveFile}>Move files</button>
                    <button className={classNames(s.renameFileIcon, s.buttonTop)} id={s.renameFile}>Rename files</button>
                    <button className={classNames(s.deleteFileIcon, s.buttonTop)} id={s.remoteFile}>Delete files</button>
                </div>
                <div className={s.containerRow}>
                    <div className={s.left}>
                        <ul className={s.dirlist}>
                                <DirInfos dirInfos={props.dirInfos} />
                        </ul>
                    </div>
                    <div className={s.right}>
                        <ul id="fileExplorer" className={s.flexContainer}>
                        </ul>
                    </div>
                </div>
            </div>

        <div id="modalWindow" className={s.modal} data-id="createFolder">
            <div className={s.modalContent}>
                <div className={s.modalHeader}>
                    <h1 className={s.modalTitle}>Create New Folder</h1>
                    <span className={s.closeModalWindow}>×</span>
                </div>
                <div className={s.modalBody}>
                    <form action="#">
                        <label id="infoText">Enter the name of new folder:</label>
                        <input id="inputModal" name="newFolderName" />
                    </form>
                    <div className={s.directoriesList}>
                        <ul className={s.dirlist}>
                            <DirInfos dirInfos={props.dirInfos}  />
                        </ul>
                    </div>
                </div>
                <div className={s.modalFooter}>
                    <button id="cancelModal">Cancel</button>
                    <button id="okModal">Ok</button>
                </div>
            </div>
        </div>
    </div>
    );
}

const DirInfos = ({dirInfos}) => {
    return (
        dirInfos.map(dirInfo => {
            return (
            <li key={dirInfo.id} className={classNames(s.folder, s.task)}>
                <div className={s.folderElement} >
                    <a href="#" title={dirInfo.fullName}>
                        <img src={folderIcon} alt="" />
                        <label className={s.folderName}>{dirInfo.name}</label>
                    </a>
                </div>
            </li>
            )
        })        
    );
}

const mapStateToProps = (state) => ({
    dirInfos: state.fileBrowse.dirInfos
});

export default connect(mapStateToProps, {getDirInfos})(FileBrowse);