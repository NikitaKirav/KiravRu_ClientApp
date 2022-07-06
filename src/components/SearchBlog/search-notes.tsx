/** Absolute imports */
import React, { Component, useState } from 'react';
import { Field, reduxForm } from 'redux-form';

/** Components */
import { Input } from '../common/FormsControls/forms-controls';

/** Styles */
import s from './search-notes.module.less';

/** SVG */
import { IconSearch } from '../../svg-icons/search';


type PropsType = {
    addPost: (newPostText: string) => void
}

export class SearchNotes extends Component<PropsType> {
    render() {
        let onSearching = (values) => {
            this.props.addPost(values.newPostText);
        }

        return (
            <FindTextFormRedux onSubmit={onSearching} />
        );
    }
}

const FindTextForm = (props) => {

    const [activeSearch, setActiveSearch] = useState(false);

    const onActiveSearch = () => {
        setActiveSearch(true);
    }

    return (<>
        {!activeSearch 
            ? <div className={s.search_icon} onClick={onActiveSearch}><IconSearch /></div>
            : <div className={s.search_form}>
                <form onSubmit={props.handleSubmit}>
                    <div>
                        {/*<label className={s.search_icon} htmlFor="searchText">
                            
                        </label>*/}
                        <span className={s.search_autocomplete}>
                            <Field type="search" name="searchText" id="q" className={s.search_input} 
                            placeholder="Search Notes..." component={Input}></Field>
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
        }
    </>);
}

let FindTextFormRedux = reduxForm({form: "FindTextInBlogForm"})(FindTextForm);

export default FindTextFormRedux;
