import { useSelector } from 'react-redux';

export const moviesStatusSelector = () =>
  useSelector((state) => state.movies.fetchStatus);
export const moviesSelector = () => useSelector((state) => state.movies.movies);
export const starredMoviesSelector = () =>
  useSelector((state) => state.starred);
export const watchLaterSelector = () =>
  useSelector((state) => state.watchLater);
