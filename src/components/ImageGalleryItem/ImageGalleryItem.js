import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({webformatURL, tags, index}) {            
    return <li className={s.imageGalleryItem}>
            <img src={webformatURL} alt={tags} className={s.imageGalleryItem__image} data-index={index}/>
        </li>;
}

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
    index: PropTypes.number.isRequired,
  };

export default ImageGalleryItem;
