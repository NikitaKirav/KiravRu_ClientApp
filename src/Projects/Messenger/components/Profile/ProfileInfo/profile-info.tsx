import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Space, Upload, Divider, Modal, message } from 'antd';
import { UploadOutlined, EditOutlined } from '@ant-design/icons';
import Preloader from '../../../../../components/common/Preloader/preloader';
import { ProfileType } from '../../../../../redux/project-messenger/types/types';
import ProfileStatusWithHooks from './profile-status-with-hooks';
import userPhoto from '../../../../../../assets/images/user_default.png';
import s from './profile-info.module.less';
import ProfileDataForm from './profile-data-form';
import './profile-upload.less';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import { ReactCropper } from './react-cropper';
import { AppStateType } from '../../../../../redux/redux-store';
import { follow as userFollow, unfollow as userUnfollow } from '../../../../../redux/project-messenger/users-reducer';
import { getFollowed } from '../../../../../redux/project-messenger/profile-reducer';
import { getFollowingInProgress } from '../../../../../redux/project-messenger/users-selectors';
import classnames from 'classnames';


type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    updateStatus: (newStatus: string) => void
    savePhoto: (file: any) => void
    saveProfile: (profile: ProfileType) => Promise<string>
}

const ProfileInfo: React.FC<PropsType> = React.memo((props) => {

    const [editMode, setEditMode] = useState(false);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    const onMainPhotoSelected = useCallback((e) => {
        if(e.fileList && e.fileList.length) {
            props.savePhoto(e.fileList[0].originFileObj);
        }
    },[]);

    const sendCorrectedMainPhoto = useCallback((e) => {
        var fileData = e,
        parts, type, base64Data;

        parts = fileData.split(',');
        type = parts[0];
        base64Data = parts[1];

        type = type.split(';')[0].split(':')[1];

        let blobImage = b64toBlob(base64Data, type);
        props.savePhoto(blobImage);
    },[]);

    const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
      
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
      
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
      
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
      
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
      }

    const onSubmit = (formData: ProfileType) => {
        props.saveProfile(formData).then(() => {
            setEditMode(false);
        });
    }

    const onCancel = () => {
        setEditMode(false);
    }

    return (
        <div className={s.userInfo}>
            <div style={{display: 'flex'}}>
                <ImageAvatar profile={props.profile} isOwner={props.isOwner} onMainPhotoSelected={onMainPhotoSelected} sendCorrectedMainPhoto={sendCorrectedMainPhoto} />
                <div className={s.nameAndStatusSmall}>
                    <div className={s.userName}>{props.profile.fullName}</div>
                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner} />
                </div>
            </div>
            <div className={s.nameAndStatus}>
                <div className={s.nameAndStatusBig}>
                    <div className={s.userName}>{props.profile.fullName}</div>
                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner} />
                </div>
                {!props.isOwner && isAuth && <div className={s.buttonBlockHorizontal}><WriteMessageOrFollow userId={props.profile.userId} /></div>}
                { editMode ? <ProfileDataForm onSubmit={onSubmit} onCancel={onCancel} initialValues={props.profile} /> 
                    : <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => {setEditMode(true)}} /> }   
            </div>
        </div>
    );
});

type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

type ImageAvatarType = {
    profile: ProfileType
    isOwner: boolean
    onMainPhotoSelected: (e: any) => void,
    sendCorrectedMainPhoto: (e: any) => void
}

const ImageAvatar: React.FC<ImageAvatarType> = React.memo(({profile, isOwner, onMainPhotoSelected, sendCorrectedMainPhoto}) => {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal');
    const photo = useSelector((state: AppStateType) => state.profilePage.photo);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  
    const showModal = () => {
      setVisible(true);
    };
  
    const handleOk = () => {
      setModalText('The modal will be closed after two seconds');
      setConfirmLoading(true);
        setVisible(false);
        setConfirmLoading(false);
        sendCorrectedMainPhoto(photo);
    };
  
    const handleCancel = () => {
      console.log('Clicked cancel button');
      setVisible(false);
    };

    const props = {
        beforeUpload: file => {
          if ((file.type !== 'image/jpeg') && (file.type !== 'image/png'))  {
            message.error(`${file.name} is not a png or jpg file`);
          }
          return file.type === 'image/jpeg' || file.type === 'image/png' ? true : false;
        },
        onChange: info => {
            if (info.file.status !== 'uploading') {
                onMainPhotoSelected(info);
            }
        },
      };


    return (
        <div>
            <div className={s.photoBig}><img src={profile.photos.large || userPhoto} className={s.mainPhoto} /></div>
            <div className={s.photoSmall}><img src={profile.photos.small || userPhoto} className={s.mainPhotoSmall} /></div>
            { isOwner ? 
                <div>
                    <div className={s.updateButtonBig}>
                        <Button onClick={showModal} className={s.updateButton}>
                            Edit photo
                        </Button>
                    </div>
                    <div onClick={showModal} className={s.updateButtonSmall}>Edit photo</div>
                    <Modal  
                        title="Image editor"
                        visible={visible}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}>
                        <ReactCropper rerender={confirmLoading} /> 
                        <Upload {...props}  className={s.uploadNewImage}> 
                            <Button>
                            <UploadOutlined /> Upload new Image
                        </Button>
                    </Upload> 
                    </Modal>
                </div>
                :
                isAuth && <div className={s.buttonBlockVertical}><WriteMessageOrFollow userId={profile.userId} /></div>
                }
        </div>
    );
});

type WriteMessageOrFollowType = {
    userId: string
}


const WriteMessageOrFollow: React.FC<WriteMessageOrFollowType> = ({userId}) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const followed = useSelector((state: AppStateType) => state.profilePage.followed);
    const followingInProgress = useSelector(getFollowingInProgress);
    const users = useSelector((state: AppStateType) => state.usersPage.users);

    useEffect(() => {
        dispatch(getFollowed(userId));
    },[userId, users]);

    const onWriteMessage = () => {
        history.push(`/projects/messenger/chat/${userId}`);
    }

    const follow = (userId: string) => {
        dispatch(userFollow(userId));
    }

    const unfollow = (userId: string) => {
        dispatch(userUnfollow(userId));
    }

    return (
        <div className={s.messegeFollowButtons}>
            <Button type="primary" className={s.button} onClick={onWriteMessage}>Write a message</Button>
            { followed ? 
            <button className={classnames(s.button, s.marginLeft)} disabled={followingInProgress.some(id => id === userId)} onClick={() => {
                unfollow(userId);                               
            }}>Unfollow</button> :
            <button className={classnames(s.button, s.marginLeft)} disabled={followingInProgress.some(id => id === userId)} onClick={() => {
                follow(userId);  
            }}>Follow</button>} 
        </div>);
}

const ProfileData: React.FC<ProfileDataType> = ({profile, isOwner, goToEditMode}) => {

    const [contactsLength, setContactsLength] = useState(0);

    useEffect(() => {
        setContactsLength(0);
        Object.keys(profile.contacts).map(key => {
            profile.contacts[key] && setContactsLength(contactsLength + 1);
        });
    }, [profile]);

    return (
        <div>
        {isOwner && <div>
            <Divider plain>
            About me<EditOutlined onClick={goToEditMode} />
            </Divider>
            </div>}
        <div className={s.aboutMe}>{profile.aboutMe && profile.aboutMe}</div>
        <Divider />  
        <table className={s.tableUserInfo}>
            <tbody>
            <tr>
                <td width="180"><span className={s.title}>Looking for a job:</span></td>
                <td>{profile.lookingForAJob 
                        ? <span className={s.infoAboutUser}>"yes"</span> 
                        : <span className={s.infoAboutUser}>"no"</span>}</td>
            </tr>
            { profile.lookingForAJob &&
            <tr>
                <td><span className={s.title}>My professional skills:</span></td>
                <td><span className={s.infoAboutUser}>{profile.lookingForAJobDescription}</span></td>
            </tr>
            }
            </tbody>
        </table>

        <div>
            {contactsLength > 0 && <>
                <span className={s.title}>Contacts:</span>                 
                {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                })}
                </>
            }
        </div>
    </div>
    );
}


type ContactPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return (
        contactValue && 
        <table className={s.tableUserInfo}>
            <tbody>
            <tr>
                <td width="180"><span className={s.title}>{contactTitle}:</span></td>
                <td><a href={contactValue}><span className={s.infoAboutUser}>{contactValue}</span></a></td>
            </tr> 
            </tbody>           
        </table>     
    );
}

export default ProfileInfo;