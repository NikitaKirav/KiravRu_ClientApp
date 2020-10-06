import React, { useCallback } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../../../common/FormsControls/forms-controls.jsx';
import s from './search-adm.module.less';



const SearchAdm = (props) => {

    const handleSubmit = useCallback((values)=> props.handleSubmit(values),[]);

    return (
        <div>
            <form onSubmit={handleSubmit} className={s.searchForm}>
                <Field type="search" name="search" component={Input} placeholder="Search..." className={s.searchField} />
            </form>
        </div>
    );
}

export default reduxForm({form: "SearchAdmin"})(SearchAdm);