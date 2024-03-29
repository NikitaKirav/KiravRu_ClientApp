/** Absolute imports */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

/** Components */
import Portal from './portal';

/** Styles */
import './modal.less';


const Modal = ({
    title, isOpen, onCancel, onSubmit, children
    }) => {
    return (
        <>
        { isOpen && 
            <Portal>
                <div className="modalOverlay">
                    <div className="modalWindow">
                        <div className="modalHeader">
                            <div className="modalTitle">{title}</div>
                            <div className="button"><FontAwesomeIcon icon={faTimes} onClick={onCancel} /></div>
                        </div>
                        <div className="modalBody">
                            {children}
                        </div>
                        <div className="modalFooter">
                            <button className="btn btnPrimary" onClick={onCancel}>Cancel</button>
                            <button className="btn btnSuccess" onClick={onSubmit}>Ok</button>
                        </div>
                    </div>

                </div>
            </Portal>
        }
        </>
    );
}

Modal.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    children: PropTypes.node
};

Modal.defaultProps = {
    title: 'Modal title',
    isOpen: 'false',
    onCancel: () => {},
    onSubmit: () => {},
    children: null
};

export default Modal;