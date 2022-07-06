import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import EditCategory from './edit-category';
import { getCategoryEdit, postCategoryEdit } from '../../../../../redux/category-reducer';
import { useParams } from 'react-router-dom';

const EditCategoryContainer = (props) => {

    const { categoryId } = useParams();

    useEffect(() => {
        props.getCategoryEdit(categoryId);
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