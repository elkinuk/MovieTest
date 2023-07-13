import { createSearchParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { fetchMovies } from '../../../data/slices';
import { ENDPOINT_DISCOVER } from '../../../common/constants';

import '../styles.scss';

function Search({ setSearchParams, searchValue, setSearchValue }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSearchResults = (query) => {
    if (query !== '') {
      setSearchParams(createSearchParams({ search: query }));
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
      setSearchParams();
    }
  };

  const searchMovies = (query) => {
    navigate('/');
    getSearchResults(query);
  };

  const inputHandler = (e) => {
    const data = e.target.value;
    setSearchValue(data);
    if (data !== searchValue) searchMovies(data);
  };

  return (
    <div className="input-group rounded">
      <input
        value={searchValue}
        type="search"
        data-testid="search-movies"
        onChange={inputHandler}
        className="form-control rounded"
        placeholder="Search movies..."
        aria-label="Search movies"
        aria-describedby="search-addon"
      />
    </div>
  );
}

Search.propTypes = {
  setSearchParams: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
};

export default Search;
