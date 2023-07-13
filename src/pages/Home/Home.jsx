import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { moviesSelector, moviesStatusSelector } from '../../data/selectors';
import { moviesSlice } from '../../data/slices';
import Movies from '../../components/MoviesList';
import { FETCH_STATUS } from '../../common/constants';
import { useInfiniteLoading } from '../../common/hooks';

import '../styles.scss';
import { useGetMovies } from './hooks';

function Home({ searchParams, viewTrailer }) {
  const dispatch = useDispatch();
  const movies = moviesSelector();
  const moviesStatus = moviesStatusSelector();
  const { removeAllMovies } = moviesSlice.actions;

  const getMovies = useGetMovies(searchParams);

  const {
    fetchWithPageSet: getMoviesWithPageSet,
    fetchForCurrentPage: retryGetMovies,
  } = useInfiniteLoading(getMovies, moviesStatus);

  useEffect(() => {
    dispatch(removeAllMovies());
    if (searchParams) {
      getMoviesWithPageSet(1);
    } else getMovies();
  }, [searchParams]);

  return (
    <>
      <Movies movies={movies} viewTrailer={viewTrailer} />
      {moviesStatus === FETCH_STATUS.loading && <span className="spinner" />}
      {moviesStatus === FETCH_STATUS.error && (
        <button
          type="button"
          data-testid="try-again"
          className="btn btn-light"
          onClick={retryGetMovies}
        >
          Try Again
        </button>
      )}
    </>
  );
}

Home.propTypes = {
  viewTrailer: PropTypes.func.isRequired,
  searchParams: PropTypes.shape({ get: PropTypes.func }).isRequired,
};

export default Home;
