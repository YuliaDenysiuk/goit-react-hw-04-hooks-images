import s from './Button.module.css';
import PropTypes from 'prop-types';

function Button({onLoadMore}) {
    return <button type='button' onClick={onLoadMore} className={s.button}>Load more</button>;
}

Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
}

export default Button;
