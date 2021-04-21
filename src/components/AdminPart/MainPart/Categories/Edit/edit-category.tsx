import React, {useEffect} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../../../../common/FormsControls/forms-controls';
import { connect } from 'react-redux';
import Preloader from '../../../../common/Preloader/preloader';
import './edit-category.less';

const EditCategory = (props) => {

    //let [{ query },, replaceState] = useLocationState();

    useEffect(() => {
        if(props.category) {
            props.initialize({
                Id: props.category.id,
                Name: props.category.name,
                OrderItem: props.category.orderItem,
                ImagePath: props.category.imagePath,
                ImageText: props.category.imageText,
                Description: props.category.description,
                Visible: props.category.visible,
                NestingLevelId: props.category.nestingLevelId
            });   
            //return replaceState(`/adminBoard/categories/${props.category.id}`);  
        }
    }, [props.category]);

    if(!props.category) {
        return <Preloader />;
    } 

    return (
        <div className="editCategory">
            <h1>{props.category.id == 0 ? 'Create Article' : 'Edit Category'}</h1>

            <form onSubmit={props.handleSubmit}>
                <Field type="hidden" name="Id" component={Input} />
                <div className="form-group">
                    <label>
                        Name
                    </label>
                    <Field name="Name" className="form-control" component={Input} />
                </div>

                <div className="form-group">
                    <label>
                        OrderItem
                    </label>
                    <Field name="OrderItem" className="form-control" component={Input}  />
                </div>

                <div className="form-group">
                    <label className="nestingLevel">
                        NestingLevel
                    </label>
                    <NestingLevel name="NestingLevelId" listCategories={props.listCategories} categoryId={props.category.NestingLevelId}  />
                </div>
                <div className="form-group">
                    <label>
                        ImagePath
                    </label>
                    <Field name="ImagePath" className="form-control" component={Input} />
                </div>

                <div className="form-group">
                    <label>
                        ImageText
                    </label>
                    <Field name="ImageText" className="form-control"  component={Input}  />
                </div>

                <div className="form-group">
                    <label>
                        Description
                    </label>
                    <Field name="Description" className="form-control" component={Input}   />
                </div>

                <div className="form-check">
                    <Field type="checkbox" name="Visible" component={Input} />
                    <label className="formCheckLabel" htmlFor="defaultCheck1">
                        Visible
                    </label>
                </div>


                <button className="btn btnSuccess">
                    Save
                </button>
            </form>
        </div>
    );
}

const NestingLevel = (props) => {
    return (
        <>
          <Field name={props.name} component="select">
            {props.listCategories.map((category, index) => {
                let value = index === 0 ? '' : category.value;
                let label = index === 0 ? '-root-' : category.label;
                return ( 
                    <option key={value} value={value}>{label}</option>   
                )
            })}
          </Field>
        </>
    );
}

const mapStateToProps = (state) => ({
    category: state.category.category,
    listCategories: state.category.listCategories
});

export default reduxForm({form: "SaveCategory"})(connect(mapStateToProps, null)(EditCategory));