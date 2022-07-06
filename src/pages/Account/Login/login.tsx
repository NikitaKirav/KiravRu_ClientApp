/** Absolute imports */
import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

/** Components */
import { LoginFormValuesType } from './login-container';
import { Input } from '../../../components/common/FormsControls/forms-controls';

/** Styles */
import classes from './login.module.less';


const Login: React.FC<InjectedFormProps<LoginFormValuesType>> = ({handleSubmit, error}) => {

    return (
    <form onSubmit={handleSubmit}>
        <div className={classes.pageWrap}>
            <div className={classNames(classes.container, classes.colLg6)}>
                <h1>Enter to application</h1>
                {error && <div className={classes.formSummaryError}>
                    {error}
                </div>}
                <div className={classes.formGroup}>
                    <label>Login</label>
                    <Field name="userName" className={classes.formControl} id="exampleInputEmail1" placeholder="Login" component={Input} />
                </div>
                <div className={classes.formGroup}>
                    <label>Password</label>
                    <Field name="password" type="password" className={classes.formControl} id="exampleInputPassword1" placeholder="Password" component={Input} />
                </div>
                <div className={classes.shift}></div>
                <button className={classNames(classes.btn, classes.btnPrimary)}>SUBMIT</button>
                <NavLink className={classes.register} to="/register">Registration on the site</NavLink>
            </div>
        </div>
    </form>
    );
} 

let LoginFormRedux = reduxForm<LoginFormValuesType>({form: "LoginForm"})(Login);

export default LoginFormRedux;