import React, { PropsWithChildren, useEffect } from 'react';
import EditArticle from './edit-article';
import { connect } from 'react-redux';
import { postArticleEdit, getArticleEdit } from '../../../../../redux/article-reducer';
import { RoleType } from '../../../../../types/types';
import { AppStateType } from '../../../../../redux/redux-store';
import { useParams } from 'react-router-dom';

type OwnPropsType = {
    match: any
}

type MapDispatchPropsType = {
    postArticleEdit: (article: ArticleRequestType<number>, roles: RoleType[]) => void
    getArticleEdit: (articleId: number) => void
}
type PropsType = MapDispatchPropsType & OwnPropsType;

export type ArticleFormType<T> = {
    Id: number
    Name: string
    DateCreate: string
    DateChange: string
    ImagePath: string
    ImageText: string
    Text: string
    ShortDescription: string
    CategoryId: T
    DifficultyLevel: number
    Roles: string[]
    IsFavorite: boolean
    Visible: boolean 
}

 type ArticleRequestType<T> = {
    Id: number
    Name: string
    ImagePath: string
    ImageText: string
    Text: string
    ShortDescription: string
    CategoryId: T
    DifficultyLevel: number
    IsFavorite: boolean
    Visible: boolean 
}

type RolesRequestType = {
    Roles: Array<RoleType>
}

const EditArticleContainer: React.FC<PropsType> = (props) => {

    const { articleId } = useParams();
    useEffect(() => {
        props.getArticleEdit(parseInt(articleId));
    }, []);

    const onSaveArticle = (formData: (ArticleFormType<string> & RolesRequestType)) => {
        let article = {
            Id: formData.Id,
            Name: formData.Name,
            ImagePath: formData.ImagePath,
            ImageText: formData.ImageText,
            Text: formData.Text,
            ShortDescription: formData.ShortDescription,
            CategoryId: parseInt(formData.CategoryId),
            DifficultyLevel: formData.DifficultyLevel,
            IsFavorite: formData.IsFavorite,
            Visible: formData.Visible        
        };
        let roles = formData.Roles;
        props.postArticleEdit(article, roles);
    } 

    return (
        <EditArticle onSubmit={onSaveArticle} />
    );
}
// @ts-ignore
export default connect<null, MapDispatchPropsType, OwnPropsType, AppStateType>(null, {postArticleEdit, getArticleEdit})(EditArticleContainer);