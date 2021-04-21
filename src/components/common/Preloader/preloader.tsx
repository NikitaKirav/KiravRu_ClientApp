import React from 'react';
import preloader from '../../../../assets/images/circles.svg';
import preloader2 from '../../../../assets/images/circles2.svg';

import s from './preloader.module.less';

type PropsType = {
    isBlackStyle?: boolean
}

const Preloader: React.FC<PropsType> = ({isBlackStyle = true}) => {
    if (isBlackStyle) {
        return <div className={s.loader}>
            <img src={preloader} />
        </div> 
    }
    return <div className={s.loader}>
        <img src={preloader2} />
    </div>
}

export default Preloader;