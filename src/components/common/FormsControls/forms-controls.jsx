import React, { useState, useEffect } from 'react';
import s from './forms-controls.module.css';
import CKEditor from "react-ckeditor-component";
//import CKEditorScript from "../../../../assets/ckeditor/ckeditor.js";


const FormControl = ({input, meta, child, ...props})  => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
}

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
            <FormControl {...props}>
                <textarea {...input} {...restProps} />
            </FormControl>
    );
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;

    return (
        <FormControl {...props}>
            <input {...input} {...props}  />
        </FormControl>
);
}


export const CheckboxGroup = (props) => {

    const checkboxGroup = () => {
        let {label, required, options, input, meta} = props;

        return options.map((option, index) => {
            return (
            <div className="checkbox" key={index}>
                <label>
                    <input type="checkbox"
                           name={`${input.name}[${index}]`}
                           value={option.name}
                           checked={input.value.indexOf(option.name) !== -1}
                           onChange={(event) => {
                               const newValue = [...input.value];
                               if (event.target.checked) {
                                   newValue.push(option.name);
                               } else {
                                   newValue.splice(newValue.indexOf(option.name), 1);
                               }

                               return input.onChange(newValue);
                           }}/>
                    <label className={s.checkboxLabel}>{option.name}</label>
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

export const CKEditorField = ({ input }) => {

    return (
        <CKEditor
            content={input.value}
          scriptUrl = '/ckeditor/ckeditor.js'          
          events={{
            change: event => input.onChange(event.editor.getData())
          }}
          config={ {
            height: '40vh',
            skin: 'moono-dark'
        } }
        />
     );
  };
