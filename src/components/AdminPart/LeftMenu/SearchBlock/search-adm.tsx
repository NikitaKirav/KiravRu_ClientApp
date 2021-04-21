import React, { useCallback } from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Input } from '../../../common/FormsControls/forms-controls';
import s from './search-adm.module.less';

export type SearchAdminFormValuesType = {
    search: string
}

const SearchAdm: React.FC<InjectedFormProps<SearchAdminFormValuesType>> = (props) => {

    const handleSubmit = useCallback((values)=> props.handleSubmit(values),[]);

    return (
        <div>
            <form onSubmit={handleSubmit} className={s.searchForm}>
                <Field type="search" name="search" component={Input} placeholder="Search..." className={s.searchField} />
            </form>
        </div>
    );
}

export default reduxForm<SearchAdminFormValuesType>({form: "SearchAdmin"})(SearchAdm);