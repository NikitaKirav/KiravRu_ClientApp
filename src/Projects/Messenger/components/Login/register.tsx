import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { createField } from '../../../../components/common/FormsControls/forms-controls';
import { required } from '../../../../utils/validators/validators';
import { register } from '../../../../redux/project-messenger/auth-reducer';
import s from '../../../../components/common/FormsControls/forms-controls.module.less';
import { AppStateType } from '../../../../redux/redux-store';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, Divider, Alert } from 'antd';
import style from './login.module.less';

export const RegisterPage = () => {

    const dispatch = useDispatch();
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);


    if(isAuth) {
        return <Redirect to={"/projects/messenger/profile"} />
    }

    return (
        <div className={style.loginForm}>
            <h1>Register</h1>    
            <Divider />        
            <RegisterReduxForm />
        </div>
    );
}

type RegisterFormValuesType = {
    email: string
    password: string,
    userName: string
}

type RegisterFormValuesTypeKeys = Extract<keyof RegisterFormValuesType, string>;

const Register: React.FC = () => {

    const dispatch = useDispatch();
    const error = useSelector((state: AppStateType) => state.auth.error);
    const registerSuccess = useSelector((state: AppStateType) => state.auth.registerSuccess);
    
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };

    const onFinish = (formData: RegisterFormValuesType) => {
        console.log('Success:', formData);
        dispatch(register(formData.email, formData.password, formData.userName));
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {registerSuccess && 
            <Alert
            message="Success"
            description="Thanks for registration. User was added! Now you can login using your email and password."
            type="success"
            showIcon
          />
        }
        {error && 
            <Alert
                message={error}
                type="error"
                showIcon
            />
        }
        {!registerSuccess && 
        <div style={{marginTop: '20px'}}>
        <Form.Item
          label="Name"
          name="userName"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        </div>}
      </Form>
    );
}

const RegisterReduxForm = reduxForm<RegisterFormValuesType>({
    form: 'registerMessanger'
})(Register);

