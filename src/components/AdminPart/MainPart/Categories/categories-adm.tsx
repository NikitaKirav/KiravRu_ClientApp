import React, { useEffect, useState } from 'react';
import './categories-adm.less';
import { connect } from 'react-redux';
import { getCategories, deleteCategory } from '../../../../redux/categories-reducer';
import Preloader from '../../../common/Preloader/preloader';
import { NavLink } from 'react-router-dom';
import Modal from '../../../common/ModalWindow/modal';

const CategoriesAdm = (props) => {

    useEffect(() => {
        props.getCategories();
    },[props.changeCategories]);

    if (!props.categories) {
        return <Preloader />
    }
    return (    
        <div className="listArticles">
            <div className="title">
                <h1>Categories</h1>
            </div>
            <br />
            <div className="createNewCategory">
                <NavLink to={`/adminBoard/categories/0`} className="btn btnSuccess">Create new category</NavLink>
            </div>
            <table className="table category">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <Categories categories={props.categories} deleteCategory={props.deleteCategory} />
                </tbody>
            </table>
        </div>
    );
}

const Categories = ({categories, deleteCategory}) => {
    return (
        categories.map(categoryLevel1 => {
            if (categoryLevel1.nestingLevelId === null) {
                return ( 
                    <Category categoryLevel={categoryLevel1} key={categoryLevel1.id} deleteCategory={deleteCategory} />
                );
            }
        })       

    );
}

const Category = ({categoryLevel, deleteCategory}) => {

    let [isOpen, setIsOpen] = useState(false);
    let [categoryId, setId] = useState(0);

    const onDelete = (id) => {
        setIsOpen(true);
        setId(id);
    }

    const handleSubmit = () => {
        deleteCategory(categoryId);
        setIsOpen(false);
    }
    
    const handleCancel = () => {
        setIsOpen(false);
    }

    return (
        <tr>                    
            <th>
                <input type="hidden" value={categoryLevel.id} />
                {categoryLevel.name}
            </th>
            <th>
                <NavLink to={`/adminBoard/categories/${categoryLevel.id}`} className="btn btnPrimary">Edit</NavLink>
                <button className="btn btnDanger" onClick={() => onDelete(categoryLevel.id)}>Delete</button>
                <Modal title="Delete category" isOpen={isOpen} onCancel={handleCancel} onSubmit={handleSubmit}>
                    <p>Are you sure you want to delete this category?</p>
                </Modal>
            </th>
        </tr>
    );
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    changeCategories: state.categories.changeCategories
});

export default connect(mapStateToProps, {getCategories, deleteCategory})(CategoriesAdm);