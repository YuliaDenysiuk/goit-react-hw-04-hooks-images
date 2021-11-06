import s from './Modal.module.css';
import {Component} from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (e) => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
    }

    render() {        
        const {image} = this.props;
        const {handleBackdropClick} = this;

        return createPortal(
        <div className={s.overlay} onClick={handleBackdropClick}> 
            <div className={s.modal}>
                <img src={image.largeImageURL} alt={image.tags} />
            </div>
        </div>, modalRoot,
        );
    }
}

Modal.propTypes = {
    image: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string,
    }),
    onClose: PropTypes.func.isRequired,
};

export default Modal;
