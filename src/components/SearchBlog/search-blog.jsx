import React, { Component } from 'react';
import { IconSearch } from '../../svg-icons/search.jsx';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../../components/common/FormsControls/forms-controls.jsx';

import s from './search-blog.module.less';

export class SearchBlog extends Component {
    render() {
        let onSearching = (values) => {
            this.props.addPost(values.newPostText);
        }

        return (
            <FindTextFormRedux onSubmit={onSearching} />
        );
    }
}

let FindTextForm = (props) => {
    return (
        <div className={s.search_form}>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <label className={s.search_icon} htmlFor="searchText">
                        <IconSearch />
                    </label>
                    <span className={s.search_autocomplete}>
                        <Field type="search" name="searchText" id="q" className={s.search_input} 
                        placeholder="Search Docs and Blog..." component={Input}></Field>
                        <pre aria-hidden="true">
                        </pre>                            
                        <span className={s.search_dropdown_menu} role="listbox" 
                                                                id="search_autocomplete_listbox_0" >
                            <div className={s.search_dataset}></div>
                        </span>                            
                    </span>
                </div>
            </form>
        </div>
    );
}

let FindTextFormRedux = reduxForm({form: "FindTextInBlogForm"})(FindTextForm);

export default FindTextFormRedux;
