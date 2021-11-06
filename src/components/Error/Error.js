import s from './Error.module.css';
import PropTypes from 'prop-types';

function Error({name}) {
    return <p className={s.error}>Изображений с именем <span className={s.error__name}>"{name}"</span> не найдено</p>;
};

Error.propTypes = {
    name: PropTypes.string.isRequired,
}

export default Error;
