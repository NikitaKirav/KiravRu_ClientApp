import React, { useEffect, useState } from 'react';
import { Element } from "react-scroll";
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import s from './text-me.module.less';
import { Input, Textarea } from '../common/FormsControls/forms-controls.jsx';
import { connect } from 'react-redux';
import Modal2 from '../common/ModalWindow/modal2.jsx';
import Preloader from '../common/Preloader/preloader';


const TextMe = (props) => {

    let [isOpen, setIsOpen] = useState(false);
    let [isSend, setSend] = useState(false);
    let [sendResult, setSendResult] = useState("Email sent successfully!");

    useEffect(() => {
        if (isSend) {
            setIsOpen(true);
            setSend(false);
            if (props.errors !== null) {
                console.log(props);
                setSendResult(props.errors);
            }
            props.initialize({
                email: "",
                message: ""
            });
        }
    }, [props.sentMessage]);

    const handleCancel = () => {
        setIsOpen(false);
    }

    const onSend = () => {
        setSend(true);
    }

    return (
        <Element name="textme" className={s.element}>
        <div className={s.contentAboutMe}>
            <div className={classnames(s.leftColumn, s.verticalAlign)}>
                <h3 className={classnames(s.labelH3, s.string)}>Contact with me</h3>
            </div>
            <div className={s.rightColumn}>
                {isSend ? <Preloader /> : ""}
                <form className={isSend ? s.hide : s.visible} onSubmit={props.handleSubmit}>                    
                    <Field type="text" className={s.email} id="lname" name="email" placeholder="Your email.." component={Input} />
                    <Field className={s.message} id="subject" name="message" placeholder="Write something.." component={Textarea} />
                    <input className={s.submitButton} type="submit" value="Submit" onClick={onSend} />
                </form>
            </div>
        </div>
        <Modal2 title="Send message" isOpen={isOpen} onCancel={handleCancel}>
            <p>{sendResult}</p>
        </Modal2>
        </Element>
    );
}

let TextMeFormRedux = reduxForm({form: "TextMeForm"})(TextMe);

const mapStateToProps = (state) => ({
    sentMessage: state.message.sentMessage,
    errors: state.message.error
});

export default connect(mapStateToProps, null)(TextMeFormRedux);