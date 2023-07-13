import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../../common/constants';
import { fetchMovies } from '../../data/slices';

const useGetMovies = (searchParams) => {
  const dispatch = useDispatch();

  const searchQuery = searchParams.get('search');

  const getMovies = useCallback(
    (page) => {
      if (searchQuery) {
        dispatch(
          fetchMovies(`${ENDPOINT_SEARCH}&query=${searchQuery}&page=${page}`),
        );
      } else {
        dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=${page}`));
      }
    },
    [searchQuery],
  );

  return getMovies;
};

export { useGetMovies };
