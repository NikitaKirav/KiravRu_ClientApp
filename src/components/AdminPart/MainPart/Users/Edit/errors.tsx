import React from 'react';
import s from './errors.module.less';

const Errors = ({errors}) => {
    if(errors) {
        return (
            errors.map((error, index) => {
                return (
                    <label className={s.dangerError} key={index}>{error}</label>
                );
            })
        );
    }
    return '';
} 

export default Errors;