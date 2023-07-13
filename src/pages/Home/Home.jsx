import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { moviesSelector } from '../../data/selectors';
import Movies from '../../components/MoviesList';

import '../styles.scss';
import { fetchMovies } from '../../data/slices';
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../../common/constants';

function Home({ searchParams, viewTrailer }) {
  const dispatch = useDispatch();
  const movies = moviesSelector();
  const searchQuery = searchParams.get('search');

  const getMovies = () => {
    if (searchQuery) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${searchQuery}`));
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return <Movies movies={movies.movies.results} viewTrailer={viewTrailer} />;
}

Home.propTypes = {
  viewTrailer: PropTypes.func.isRequired,
  searchParams: PropTypes.shape({ get: PropTypes.func }).isRequired,
};

export default Home;
