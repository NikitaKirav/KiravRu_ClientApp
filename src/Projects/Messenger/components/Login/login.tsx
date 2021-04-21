import React, {useContext} from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { createField } from '../../../../components/common/FormsControls/forms-controls';
import { required } from '../../../../utils/validators/validators';
import { connect, useSelector, useDispatch } from 'react-redux';
import { login } from '../../../../redux/project-messenger/auth-reducer';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../../../redux/redux-store';
import s from '../../../../components/common/FormsControls/forms-controls.module.less';
import { AuthContext } from '../../context/auth-context';
import { Form, Input, Button, Checkbox, Alert, Divider } from 'antd';
import style from './login.module.less';

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    //captcha: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>;

export const LoginPage: React.FC = () => { 

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    const dispatch = useDispatch();

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password));
    }

    if(isAuth) {
        return <Redirect to={"/projects/messenger/profile"} />
    }
    return <div className={style.loginForm}>  
        <h1>Login</h1>   
        <Divider />
        <LoginReduxForm  onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
}

type LoginFormPropsType = {
    captchaUrl: string | null
}

const LoginForm: React.FC<LoginFormPropsType> = ({captchaUrl}) => {
    
    const dispatch = useDispatch();
    const error = useSelector((state: AppStateType) => state.auth.error);
    
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };

    const onFinish = (formData: LoginFormValuesType) => {
        console.log('Success:', formData);
        dispatch(login(formData.email, formData.password));
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
        {error && 
            <Alert
                message={error}
                type="error"
                showIcon
            />
        }
        <div style={{marginTop: '20px'}}>
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
  
        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
  
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        </div>
      </Form>
    );
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormPropsType>({
    form: 'login'
})(LoginForm);

    {/*<form onSubmit={handleSubmit}>
        { createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input) }
        { createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, {type: "password"} ) }
        { createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me") }

        { captchaUrl && <img src={captchaUrl} /> }
        { captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [required], Input) }

        {error && <div className={s.formSummaryError}>
            {error}
        </div>}
        <div><button>Login</button></div>
    </form>*/}