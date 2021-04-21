import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FilterType } from '../../../../redux/project-messenger/users-reducer';
import { getUsersFilter } from '../../../../redux/project-messenger/users-selectors';
import {  Input, Select  } from 'antd';
import s from './users.module.less';

const { Option } = Select;

const usersSearchFormValidate = (value: any) => {
    const errors = {};
    return errors;
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FriendFormType = "true" | "false" | "null";
type FormType = {
    term: string
    friend: FriendFormType
}

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    const filter = useSelector(getUsersFilter);

    const submit = (values: FormType, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        props.onFilterChanged(filter);
        setSubmitting(false);
    }

    return (
      <div className="site-input-group-wrapper">
        <Input.Group compact className={s.searchGroup}>
          <Select defaultValue="null" className={s.selector}>
            <Option value="null">All</Option>
            <Option value="true">Only followed</Option>
            <Option value="false">Only unfollowed</Option>
          </Select>
          <Input.Search allowClear defaultValue="" className={s.search} />
        </Input.Group>
      </div>
    );
});

export default UsersSearchForm;
/*
<data>
<Formik
    enableReinitialize= {true}
    initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
    validate={usersSearchFormValidate}
    onSubmit={submit}
    >
    {({ isSubmitting }) => (
        <Form>
        <Field type="text" name="term" />
        <Field as="select" name="friend">
            <option value="null">All</option>
            <option value="true">Only followed</option>
            <option value="false">Only unfollowed</option>
        </Field>
        <button type="submit" disabled={isSubmitting}>
            Find
        </button>
        </Form>
    )}
    </Formik>
</data>*/