import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.scss';

import { useState } from 'react';
import { starredMoviesSelector } from '../../data/selectors';

import Search from './Search/Search';

function Header({ setSearchParams }) {
  const starredMovies = starredMoviesSelector();
  const [searchValue, setSearchValue] = useState();

  const homeHandler = () => {
    setSearchValue('');
  };

  return (
    <header>
      <Link to="/" data-testid="home" onClick={homeHandler}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink
          to="/starred"
          data-testid="nav-starred"
          className="nav-starred"
        >
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <Search
        setSearchParams={setSearchParams}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
    </header>
  );
}

Header.propTypes = {
  setSearchParams: PropTypes.func.isRequired,
};

export default Header;
