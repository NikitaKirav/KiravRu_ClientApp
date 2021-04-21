import React, {useState, useEffect, ChangeEvent} from 'react';
import s from './profile-status-with-hooks.module.less';
import { Input } from 'antd';

type PropsType = {
    status: string
    isOwner: boolean
    updateStatus: (newStatus: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    
    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);
    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {props.isOwner ?
            <>
                {!editMode &&
                    <div className={s.status}>
                        <span onDoubleClick={activateEditMode} className={s.changeStatus}>{props.status || "Change status(double click)"}</span>
                    </div>
                }
                {editMode && 
                    <div className={s.status}>
                        <Input placeholder="your status" onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
                    </div>
                }
            </>
            :   <div className={s.status}>
                    <span onDoubleClick={activateEditMode} className={s.changeStatus}>{props.status}</span>
                </div>
            }
        </div>
    );
}

export default ProfileStatusWithHooks;