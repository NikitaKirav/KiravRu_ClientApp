/** Absolute imports */
import React, { Component } from 'react';

/** Styles */
import s from './n-logo.module.less';

export class IconConsoleLogo extends Component {
    render() {
      return (
        <svg  id={s.console}  width="28px" height="38px" viewBox="0 0 28 38">
          <polygon points="1.5,0 8.91,0 26.5,18 26.5,19 8.5,38 1.5,38 19.5,19 19.5,18 "/>
        </svg>
        );
    }
};

export class IconNLogo extends Component {
    render() {
      return (
        <svg  id={s.n}  width="30px" height="38px" viewBox="0 0 30 38">
          <polygon points="0,38 0,-0.09 5.18,-0.09 25.16,29.81 25.16,-0.09 30,-0.09 30,38 24.82,38 4.84,8.11 4.84,38 "/>
        </svg>
        );
    }
};