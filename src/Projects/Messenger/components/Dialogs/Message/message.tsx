import React, { Component } from 'react';

import s from './message.module.less';

type PropsType = {
    message: string
}

export class Message extends Component<PropsType> {
    render() {
        return (
            <div className={s.message}>
                {this.props.message}
            </div>
        );
    }
}