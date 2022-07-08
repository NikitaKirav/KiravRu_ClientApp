/** Absolute imports */
import React, { useEffect, useState } from 'react';
import { Element } from "react-scroll";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import classNames from 'classnames';

/** Components */
import Preloader from '../common/Preloader/preloader';
import { Textarea, Input } from '../common/FormsControls/forms-controls';
import Modal2 from '../common/ModalWindow/modal2';

/** Styles */
import s from './text-me.module.less';


const TextMe = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isSend, setSend] = useState(false);
    const [sendResult, setSendResult] = useState("Email sent successfully!");

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
        <Element name="textme">
        <div className={s.contentAboutMe}>
            <h1>Contact</h1>
            <div className={s.description}>I am always open to new ideas and like solving challenges. 
                    Don't hesitate to contact me regardless of project complexity you need!</div>
            <div className={s.borderLineFat}></div>
            <div className={s.socialMediaLogos}>
                    <a href='https://github.com/NikitaKirav'>
                        <div className={classNames(s.githab, s.logo)} data-title="GITHAB"></div>
                    </a>
                    <a href='http://www.linkedin.com/in/nikita-kirav'>
                        <div className={classNames(s.linkedin, s.logo)} data-title="LINKEDIN"></div>
                    </a>
                </div>
            <h3>Send me an email</h3>                
                <form onSubmit={props.handleSubmit}>
                    <div className={s.formBlock}>
                        <div className={s.rightColumn}>
                            <div>
                                <label>Name</label>  
                                <Field type="text" className={s.name} id="name" name="name" placeholder="Your name..." component={Input} />
                            </div>
                            <div className={s.emailBlock}>
                                <label>Email</label>                
                                <Field type="text" className={s.email} id="lname" name="email" placeholder="Your email..." component={Input} />
                            </div>                        
                        </div>
                        <div></div>
                        <div className={s.leftColumn}> 
                            <label>Message</label> 
                            <Field className={s.message} id="subject" name="message" placeholder="Write something..." component={Textarea} />
                        </div>
                    </div>
                    <div>  
                        <input className={s.submitButton} type="submit" value="SUBMIT" onClick={onSend} disabled={props.isLoading} />
                    </div>
                </form>
                {isSend && <Preloader />}
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
    errors: state.message.error,
    isLoading: state.message.isLoading
});

export default connect(mapStateToProps, null)(TextMeFormRedux);