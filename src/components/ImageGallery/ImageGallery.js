import s from './ImageGallery.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';
import API from '../../api/api';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import PendingLoader from '../Loader/Loader';
import Error from '../Error/Error';
import Modal from '../Modal/Modal';

class ImageGallery extends Component {
    state = {
        images: [],
        page: 1,
        error: null,
        status: 'idle',
        showModal: false,
        imageIndex: null
    }

    componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.name;
        const newName = this.props.name;
        const prevPage = prevState.page;
        const newPage = this.state.page;

        if (prevName !== newName) {
            this.setState({ status: 'pending' });

            API.fetchImage(newName)
                .then(images => this.setState({ images: images.hits, status: 'resolved', page: 1}))
                .catch(error => this.setState({ error, status: 'rejected' }));
        }

        if ((prevPage !== newPage) && (newPage > 1)) {
            this.setState({ status: 'pending' });

            API.fetchImage(newName, newPage)
                .then(images => this.setState({ images: [...this.state.images, ...images.hits], status: 'resolved' }))
                .catch(error => this.setState({ error, status: 'rejected' }));

            this.scroll();
        }
    }

    openModal = (e) => {
        const imageIndex = e.target.getAttribute('data-index');
        this.setState({ showModal: true, imageIndex });
    }

    closeModal = () => {        
        this.setState({ showModal: false, imageIndex: null });
    }

    loadMore = () => {
        this.setState(({page}) => ({page: page + 1}));            
    }

    scroll = () => {
        setTimeout(() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }, 1000);
    }

    render() {
        const { images, status, showModal, imageIndex } = this.state;
        const { openModal, closeModal, loadMore } = this;
        const { name } = this.props;

        if (status === 'idle') {
            return <></>;
        }

        if (status === 'pending') {
            return <PendingLoader />;
        }

        if (status === 'rejected' || images.length === 0 || name.trim() === '') {
            return <Error name={name} />;
        }

        if (status === 'resolved') {
            return (
                <>
                <ul className={s.imageGallery} onClick={openModal}>
                    {images.map(
                        ({ id, webformatURL, tags}, index) => 
                        <ImageGalleryItem key={id} webformatURL={webformatURL} tags={tags} index={index}/>
                    )}                       
                </ul>
                    <Button onLoadMore={loadMore}/>
                    {showModal && (<Modal image={images[imageIndex]} onClose={closeModal} />)}
                </>
            );
        }    
    }
}

ImageGallery.propTypes = {
    name: PropTypes.string.isRequired,
}

export default ImageGallery;
