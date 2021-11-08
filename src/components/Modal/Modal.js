import s from './Modal.module.css';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

function Modal({image, onClose}) {
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }        
    });

    const handleKeyDown = (e) => {
        if (e.code === 'Escape') {
            onClose();
        }
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}> 
        <div className={s.modal}>
            <img src={image.largeImageURL} alt={image.tags} />
        </div>
    </div>, modalRoot,
    );
};

Modal.propTypes = {
    image: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string,
    }),
    onClose: PropTypes.func.isRequired,
};

export default Modal;
