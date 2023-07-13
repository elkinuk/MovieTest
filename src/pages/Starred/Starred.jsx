import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { starredSlice } from '../../data/slices';

import { starredMoviesSelector } from '../../data/selectors';

import '../styles.scss';
import Movies from '../../components/MoviesList';

function Starred({ viewTrailer }) {
  const starred = starredMoviesSelector();
  const { clearAllStarred } = starredSlice.actions;
  const dispatch = useDispatch();

  const clearAllStarredHandler = () => dispatch(clearAllStarred());

  return (
    <div className="starred" data-testid="starred">
      {starred.starredMovies.length > 0 && (
        <div data-testid="starred-movies" className="starred-movies">
          <h6 className="header">Starred movies</h6>
          <div className="row">
            <Movies movies={starred.starredMovies} viewTrailer={viewTrailer} />
          </div>

          <div className="text-center">
            <button
              className="btn btn-primary remove-btn"
              onClick={clearAllStarredHandler}
              type="button"
            >
              Remove all starred
            </button>
          </div>
        </div>
      )}

      {starred.starredMovies.length === 0 && (
        <div className="text-center empty-cart">
          <i className="bi bi-star" />
          <p>There are no starred movies.</p>
          <p>
            Go to
            <Link to="/">Home</Link>
          </p>
        </div>
      )}
    </div>
  );
}

Starred.propTypes = {
  viewTrailer: PropTypes.func.isRequired,
};

export default Starred;
