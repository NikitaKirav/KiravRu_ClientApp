import React, { Component } from 'react';

import s from './myposts.module.less';
import { Post } from './Post/post.jsx';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../../../../utils/validators/validators.js';
import { Textarea } from '../../../../../components/common/FormsControls/forms-controls.jsx';


export class MyPosts extends Component {
    render() {

        let postsElements = this.props.posts.map(p => <Post message={p.message} key={p.id} likesCount={p.likesCount} />);

        let onAddPost = (values) => {
            this.props.addPost(values.newPostText);
        }

        return (
            <div>
                <h3>My posts</h3>
                <AddNewPostFormRedux onSubmit={onAddPost} />
                <div className={s.posts}>
                    {postsElements}
                </div>
            </div>
        );
    }
}

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newPostText" component={Textarea}
                placeholder="Post message..."
                validate={[required, maxLength10]} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form> 
    );
}

let AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm);