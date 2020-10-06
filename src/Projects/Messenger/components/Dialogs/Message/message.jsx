import React, { Component } from 'react';

import s from './message.module.less';

export class Message extends Component {
    render() {
        return (
            <div className={s.message}>
                {this.props.message}
            </div>
        );
    }
}