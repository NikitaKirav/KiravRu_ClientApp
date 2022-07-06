/** Absolute imports */
import React, { Component } from 'react';

/** Styles */
import s from './n-logo.module.less';

export class IconArrowLeft extends Component {
    render() {
      return (
        <svg width="15" height="35" viewBox="0 0 11 20">
            <path fill="#fff" fill-rule="evenodd" d="M299.634 6519.292a1.063 1.063 0 0 0-1.464 0l-8.563 8.264a1.95 1.95 0 0 0 0 2.827l8.625 8.325c.4.385 1.048.39 1.454.01a.975.975 0 0 0 .01-1.425l-7.893-7.617a.975.975 0 0 1 0-1.414l7.83-7.557a.974.974 0 0 0 0-1.413" transform="translate(-289 -6519)"/>
        </svg>
        );
    }
};

export class IconArrowRight extends Component {
    render() {
      return (
        <svg width="15" height="35" viewBox="0 0 11 20">
            <path fill="#fff" fill-rule="evenodd" d="M249.366 6538.708c.405.39 1.06.39 1.464 0l8.563-8.264a1.95 1.95 0 0 0 0-2.827l-8.625-8.325a1.063 1.063 0 0 0-1.454-.01.976.976 0 0 0-.011 1.425l7.894 7.617a.975.975 0 0 1 0 1.414l-7.831 7.557a.974.974 0 0 0 0 1.413" transform="translate(-249 -6519)"/>
        </svg>
        );
    }
};