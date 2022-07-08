/** Absolute imports */
import classNames from 'classnames';
import React from 'react';
import CKEditor from "react-ckeditor-component";
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';

/** Ant design */
//import { Input as InputAntD } from 'antd';

/** Types */
import { RoleType } from '../../../types/types';

/** Utils */
import { FieldValidatorType } from '../../../utils/validators/validators';

/** Styles */
import classes from './forms-controls.module.less';


type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({ meta: {touched, error}, children })  => {
    const hasError = touched && error;
    return (
        <div className={classes.formControl + " " + (hasError ? classes.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    );
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    //const { TextArea } = InputAntD;
    const {input, meta, ...restProps} = props;
    return (
            <FormControl {...props}>
                <textarea {...input} {...restProps}  />
            </FormControl>
    );
}

interface ClassNameType {
    className: any;
}

export const Input: React.FC<WrappedFieldProps & ClassNameType> = (props) => {
    const {input, meta, className, ...restProps} = props;

    return (
        <FormControl {...props}>
            <input {...input} {...props} className={classNames(classes.input, className)} />
        </FormControl>
);
}

export const Checkbox: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return (
            <input type="checkbox"
                name={input.name}
                checked={input.value}
                onChange={(event) => {
                    return input.onChange(!input.value);
                }}/>
    );
}

type CheckboxGroupOwnPropsType = {
    options: Array<RoleType>
}

export const CheckboxGroup: React.FC<WrappedFieldProps & CheckboxGroupOwnPropsType> = (props) => {

    const checkboxGroup = () => {
        let {options, input} = props;

        return options.map((option, index) => {
            const checked = option.name === 'admin' ? true : input.value.indexOf(option.name) !== -1;
            return (
            <div className="checkbox" key={index}>
                <label>
                    <input type="checkbox"
                           name={`${input.name}[${index}]`}
                           value={option.name}
                           disabled={option.name === 'admin'}
                           checked={checked}
                           onChange={(event) => {
                               const newValue = [...input.value];
                               if (event.target.checked) {
                                   newValue.push(option.name);
                               } else {
                                   newValue.splice(newValue.indexOf(option.name), 1);
                               }

                               return input.onChange(newValue);
                           }}/>
                    <label className={classes.checkboxLabel}>{option.name}</label>
                </label>
            </div>)
        });
    }

    return (
        <div>
            {checkboxGroup()}
        </div>
    )
}

export const CKEditorField: React.FC<WrappedFieldProps> = ({ input }) => {

    return (
        <CKEditor
            content={input.value}
          scriptUrl = '/ckeditor/ckeditor.js'          
          events={{
            change: (event: any) => input.onChange(event.editor.getData())
          }}
          config={ {
            height: '40vh',
            skin: 'moono-dark'
        } }
        />
     );
};

export function createField<FormsKeysType extends string>(placeholder: string | undefined, 
                            name: FormsKeysType, 
                            validators: Array<FieldValidatorType>, 
                            component: React.FC<WrappedFieldProps>, 
                            props = {}, text = "") {
    return(
    <div>
        <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props} />
        {text}
    </div>
    );
}

