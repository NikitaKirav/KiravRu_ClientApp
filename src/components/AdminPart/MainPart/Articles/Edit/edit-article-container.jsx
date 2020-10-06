import React, { useEffect } from 'react';
import EditArticle from './edit-article.jsx';
import { connect } from 'react-redux';
import { postArticleEdit, getArticleEdit } from '../../../../../redux/article-reducer.js';

const EditArticleContainer = (props) => {

    useEffect(() => {
        props.getArticleEdit(props.match.params.articleId);
    }, []);

    const onSaveArticle = (values) => {
        let article = {
            Id: values.Id,
            Name: values.Name,
            ImagePath: values.ImagePath,
            ImageText: values.ImageText,
            Text: values.Text,
            ShortDescription: values.ShortDescription,
            CategoryId: parseInt(values.CategoryId),
            DifficultyLevel: values.DifficultyLevel,
            IsFavorite: values.IsFavorite,
            Visible: values.Visible        
        };
        let roles = values.Roles;
        props.postArticleEdit(article, roles);
    } 

    return (
        <EditArticle onSubmit={onSaveArticle} />
    );
}

export default connect(null, {postArticleEdit, getArticleEdit})(EditArticleContainer);