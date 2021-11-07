import s from './ImageGallery.module.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import API from '../../api/api';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import PendingLoader from '../Loader/Loader';
import Error from '../Error/Error';
import Modal from '../Modal/Modal';

function ImageGallery({name}) {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('idle');
    const [showModal, setShowModal] = useState(false); 
    const [imageIndex, setImageIndex] = useState(null);   

    useEffect(() => {
        if (!name) {
            return
        }
        
        setStatus('pending');
        
        API.fetchImage({name, page})
        .then(images => {       
            setImages(prevImages => [...prevImages, ...images.hits]);
            setStatus('resolved');
        })
        .catch(error => {
            setError(error.message);                
            setStatus('rejected');
        });
    }, [name, page]);


    // componentDidUpdate(prevProps, prevState) {
    //     const prevName = prevProps.name;
    //     const newName = this.props.name;
    //     const prevPage = prevState.page;
    //     const newPage = this.state.page;

    //     if (prevName !== newName) {
    //         this.setState({ status: 'pending' });

    //         API.fetchImage(newName)
    //             .then(images => this.setState({ images: images.hits, status: 'resolved', page: 1}))
    //             .catch(error => this.setState({ error, status: 'rejected' }));
    //     }

    //     if ((prevPage !== newPage) && (newPage > 1)) {
    //         this.setState({ status: 'pending' });

    //         API.fetchImage(newName, newPage)
    //             .then(images => this.setState({ images: [...this.state.images, ...images.hits], status: 'resolved' }))
    //             .catch(error => this.setState({ error, status: 'rejected' }));

    //         this.scroll();
    //     }
    // }

    const openModal = (e) => {       
        setImageIndex(e.target.getAttribute('data-index'));
        setShowModal(true);
    };

    const closeModal = () => {        
        setShowModal(false);
        setImageIndex(null);
    }

    const loadMore = () => {
        setPage(page => page + 1);
        scroll();        
    }

    const scroll = () => {
        setTimeout(() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }, 1000);
    }

    if (status === 'idle') {
        return <></>;
    }

    if (status === 'pending') {
        return <PendingLoader />;
    }

    if (status === 'rejected' || images.length === 0 || name.trim() === '' || error) {
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

ImageGallery.propTypes = {
    name: PropTypes.string.isRequired,
}

export default ImageGallery;
