import React, { useEffect, useState, useRef } from 'react';
import './edit-article.less';
import {actions} from '../../../../../redux/article-reducer';
import { setChangeArticles } from '../../../../../redux/articles-reducer';
import {connect} from 'react-redux';
import Preloader from '../../../../common/Preloader/preloader';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Input, CheckboxGroup, CKEditorField, Checkbox } from '../../../../common/FormsControls/forms-controls';
import 'react-dropdown/style.css';
import classNames from 'classnames';
import { AppStateType } from '../../../../../redux/redux-store';
import { ArticleType, CategoryType, RolesType, RoleType } from '../../../../../types/types';
import { ArticleFormType } from './edit-article-container';
import { useNavigate } from 'react-router-dom';

type MapStatePropsType = {
    article: ArticleType
    listCategories: Array<CategoryType>
    listRoles: RolesType
}

type MapDispatchPropsType = {
    removeArticle: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

const EditArticle: React.FC<InjectedFormProps<ArticleFormType<string>> & PropsType> = (props) => {

    let navigate = useNavigate();

    useEffect(() => {
        if(props.article) {            
            props.initialize({
                Id: props.article.id,
                Name: props.article.name,
                ShortDescription: props.article.shortDescription,
                DateCreate: props.article.dateCreate,
                DateChange: props.article.dateChange,
                ImagePath: props.article.imagePath,
                ImageText: props.article.imageText,
                DifficultyLevel: props.article.difficultyLevel === 0 ? 1 : props.article.difficultyLevel,
                IsFavorite: props.article.isFavorite,
                Visible: props.article.visible,
                CategoryId: props.article.categoryId === 0 ? '1' : String(props.article.categoryId),
                Roles: [...props.listRoles.userRoles, 'admin'],
                Text: props.article.text,
            });   
        }
    }, [props.article]);

    useEffect(() => {
        return () => {
            props.removeArticle();
        };
    },[]);

    const saveAndExit = (props) => {
        props.handleSubmit();
        navigate("/adminBoard/articles");

        //props.setChangeArticles();
        
    }

    if(!props.article) {
        return <Preloader />;
    } 

    return (
        <div className="editArticle">
            <h1>{props.article.id == 0 ? 'Create Article' : 'Edit Article'}</h1> 
            <form onSubmit={props.handleSubmit}>
                <Field type="hidden" name="Id" component={Input} />
                <Field type="hidden" name="isExit" component={Input} />

                <div className="sheetContent">
                    <div className="sheetSidebar">
                        <aside className="sidebar">
                            <div className="sidebar__track">
                                <div className="sidebar__wrapper">
                                    <div className="form-group">
                                        <label>
                                            DateCreate
                                        </label>
                                        <Field type="datetime" name="DateCreate" className="form-control" component={Input} readOnly />
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            DateChange
                                        </label>
                                        <Field type="datetime" name="DateChange" className="form-control" component={Input} readOnly />
                                    </div>

                                    <div className="form-check">
                                        <Field name="IsFavorite" className="form-control" component={Checkbox} />
                                        <label className="formCheckLabel" htmlFor="defaultCheck1">
                                            IsFavorite
                                        </label>
                                    </div>

                                    <div className="form-check">
                                        <Field name="Visible" className="form-control" component={Checkbox} />
                                        <label className="formCheckLabel" htmlFor="defaultCheck1">
                                            Visible
                                        </label>
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            ImagePath
                                        </label>
                                        <Field name="ImagePath" className="form-control" component={Input}  />
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            ImageText
                                        </label>
                                        <Field name="ImageText" className="form-control" component={Input}  />
                                    </div>

                                    <div className="form-group">                                        
                                        <label>
                                            Level difficulty
                                        </label>
                                        <Difficulty change={props.change} value={props.article.difficultyLevel === 0 ? 1 : props.article.difficultyLevel} />
                                    </div>

                                    <label>
                                        Access
                                    </label>
                                    <div className="form-group">
                                        <Access listRoles={props.listRoles} />
                                    </div>

                                </div>
                            </div>
                        </aside>
                    </div>
                    <main className="feed sheet__main sheet-content-width">
                        <div className="mt-5 mb-4">
                            <div className="form-group">
                                <label>
                                    Name 
                                </label>
                                <Field name="Name" className="form-control" component={Input} />
                            </div>

                            <div className="form-group">
                                <label>
                                    ShortDescription
                                </label>
                                <Field name="ShortDescription" className="form-control" component={Input} />
                            </div>

                            <div className="form-group">
                                <Field name="Text" component={CKEditorField} />
                            </div>


                            <div className="form-group">
                                <label className="category">
                                    Category
                                </label>                                
                                <Categories name="CategoryId" listCategories={props.listCategories} categoryId={props.article.categoryId}  />
                            </div>


                            <button id="saveButton" type="submit" className="btn btn-primary" >
                                Save
                            </button>
                            <button id="saveAndExitButton" type="button" onClick={() => {saveAndExit(props);}} className="btn btn-primary" >
                                Save and Exit
                            </button>
                        </div>
                    </main>
                </div>
            </form>
        </div>
    );
}

const Difficulty = (props) => {
    let $difficultyLevel = useRef(null);
    let [level, setLevel] = useState(1);

    useEffect(() => {
        props.change("DifficultyLevel", level);
    },[level]);

    useEffect(() => {
        setLevel(props.value);
    },[props.value])

    const onClickLevel = (level) => {
        setLevel(level);
    }

    return (
        <>
        <Field ref={$difficultyLevel} type="hidden" name="DifficultyLevel" component={Input}  />
        <div className="blockLevel">
            <div onClick={() => {onClickLevel(1)}} className={classNames("levels", {
                ["active1"] : level >= 1
            })}></div>
            <div onClick={() => {onClickLevel(2)}} className={classNames("levels", {
                ["active2"] : level >= 2
            })}></div>
            <div onClick={() => {onClickLevel(3)}} className={classNames("levels", {
                ["active3"] : level >= 3
            })}></div>
            <div onClick={() => {onClickLevel(4)}} className={classNames("levels", {
                ["active4"] : level >= 4
            })}></div>
            <div onClick={() => {onClickLevel(5)}} className={classNames("levels", {
                ["active5"] : level == 5
            })}></div>
        </div>
        </>
    );
}

type CategoriesPropsType = {
    name: string
    listCategories: Array<CategoryType>
    categoryId: number
}

const Categories: React.FC<CategoriesPropsType> = (props) => {
    return (
        <>
          <Field className="categoriesList" name={props.name} component="select">
            {props.listCategories.map(category => {
                return (
                    <option key={category.value} value={category.value}>{category.label}</option>   
                )
            })}
          </Field>
        </>
    );
}

type AccessPropsType = {
    listRoles: RolesType
}

const Access: React.FC<AccessPropsType> = (props) => {
    return (
        <Field name="Roles" component={CheckboxGroup} options={props.listRoles.allRoles} />
    );
}

const mapStateToProps = (state: AppStateType) => ({
    article: state.articlePage.article,
    listCategories: state.articlePage.listCategories,
    listRoles: state.articlePage.listRoles,
});

export default reduxForm<ArticleFormType<string>>({form: "SaveArticle"})
// @ts-ignore
(connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(mapStateToProps, {removeArticle: actions.removeArticle, setChangeArticles})(EditArticle));