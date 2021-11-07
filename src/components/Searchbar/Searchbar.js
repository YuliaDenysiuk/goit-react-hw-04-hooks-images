import s from './Searchbar.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import {ReactComponent as Icon} from '../../icons/search.svg';

function Searchbar({onSubmit}) {
    const [imageName, setImageName] = useState('');    

    const handleChange = (e) => {
        setImageName(e.currentTarget.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(imageName);
        reset();
    }

    const reset = () => {
        setImageName('');
    }

    return (
        <header className={s.searchBar}>
            <form className={s.searchForm} onSubmit={handleSubmit}>
                <button type="submit" className={s.searchForm__button}>
                    <Icon />
                </button>

                <input
                    className={s.searchForm__input}
                    type="text"
                    value={imageName}
                    onChange={handleChange}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default Searchbar;
