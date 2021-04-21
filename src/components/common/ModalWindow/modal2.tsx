import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './modal.less';
import Portal from './portal';

// Informational Modal Window with one button 

const Modal2 = ({
    title, isOpen, onCancel, children
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
                            <button className="btn btnSuccess" onClick={onCancel}>Ok</button>
                        </div>
                    </div>

                </div>
            </Portal>
        }
        </>
    );
}

Modal2.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    children: PropTypes.node
};

Modal2.defaultProps = {
    title: 'Modal title',
    isOpen: 'false',
    onCancel: () => {},
    onSubmit: () => {},
    children: null
};

export default Modal2;