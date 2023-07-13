import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';

import { moviesSelector, moviesStatusSelector } from '../../data/selectors';
import { fetchMovies, moviesSlice } from '../../data/slices';
import Movies from '../../components/MoviesList';
import {
  ENDPOINT_DISCOVER,
  ENDPOINT_SEARCH,
  FETCH_STATUS,
} from '../../common/constants';

import '../styles.scss';

function Home({ searchParams, viewTrailer }) {
  const dispatch = useDispatch();
  const movies = moviesSelector();
  const moviesStatus = moviesStatusSelector();
  const searchQuery = searchParams.get('search');
  const [currentPage, setCurrentPage] = useState(1);
  const { removeAllMovies } = moviesSlice.actions;

  const getMovies = useCallback(
    (page) => {
      if (searchQuery) {
        dispatch(
          fetchMovies(
            `${ENDPOINT_SEARCH}&query=${searchQuery}&page=${
              page || currentPage
            }`,
          ),
        );
      } else {
        dispatch(
          fetchMovies(`${ENDPOINT_DISCOVER}&page=${page || currentPage}`),
        );
      }
    },
    [currentPage, searchQuery],
  );

  const loadMoreHandler = useCallback(() => {
    const page = currentPage + 1;
    setCurrentPage(page);
    getMovies(page);
  }, [currentPage]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    loadMoreHandler();
  }, [loadMoreHandler]);

  useEffect(() => {
    dispatch(removeAllMovies());
    if (searchParams) {
      setCurrentPage(1);
      getMovies(1);
    } else getMovies();
  }, [searchParams]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  return (
    <>
      <Movies movies={movies} viewTrailer={viewTrailer} />
      {moviesStatus === FETCH_STATUS.loading && <span className="spinner" />}
    </>
  );
}

Home.propTypes = {
  viewTrailer: PropTypes.func.isRequired,
  searchParams: PropTypes.shape({ get: PropTypes.func }).isRequired,
};

export default Home;
