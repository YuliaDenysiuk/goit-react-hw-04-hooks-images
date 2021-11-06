import s from './Searchbar.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';
import {ReactComponent as Icon} from '../../icons/search.svg';

class Searchbar extends Component {
    state = {
        imageName: ''
    }

    handleChange = (e) => {
        this.setState({ imageName: e.currentTarget.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.imageName);
        this.reset();
    }

    reset = () => {
        this.setState({ imageName: '' });
    }

    render() {
        const { imageName } = this.state;
        const { handleChange, handleSubmit } = this;

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
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default Searchbar;
