import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import EditCategory from './edit-category.jsx';
import { getCategoryEdit, postCategoryEdit } from '../../../../../redux/category-reducer.js';

const EditCategoryContainer = (props) => {

    useEffect(() => {
        props.getCategoryEdit(props.match.params.categoryId);
    }, []);

    const onSaveCategory = (values) => {
        let category = {
            Id: values.Id,
            Name: values.Name,
            OrderItem: parseInt(values.OrderItem),
            ImagePath: values.ImagePath,
            ImageText: values.ImageText,
            Description: values.Description,
            Visible: values.Visible
        };
        props.postCategoryEdit(category);
    } 

    return (
        <EditCategory onSubmit={onSaveCategory} />
    );
}

export default connect(null, {getCategoryEdit, postCategoryEdit})(EditCategoryContainer);