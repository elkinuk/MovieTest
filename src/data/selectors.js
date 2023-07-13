import { useSelector } from 'react-redux';

export const moviesSelector = () => useSelector((state) => state.movies);
export const starredMoviesSelector = () =>
  useSelector((state) => state.starred);
export const watchLaterSelector = () =>
  useSelector((state) => state.watchLater);
