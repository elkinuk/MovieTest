import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { starredSlice, watchLaterSlice } from '../../../data/slices';
import placeholder from '../../../assets/not-found-500X750.png';
import {
  starredMoviesSelector,
  watchLaterSelector,
} from '../../../data/selectors';
import { keyboarEnterHandler } from '../../../common/utils';

import './styles.scss';

const POSTER_IMG_ROUTE = 'https://image.tmdb.org/t/p/w500/';

function Movie({ movie, viewTrailer }) {
  const [isOpen, setIsOpen] = useState();

  const { starMovie, unstarMovie } = starredSlice.actions;
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;

  const starred = starredMoviesSelector();
  const watchLater = watchLaterSelector();
  const dispatch = useDispatch();

  const openHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = (e) => {
    setIsOpen(false);
    if (e.stopPropagation) e.stopPropagation();
  };

  const starMovieHandler = () =>
    dispatch(
      starMovie({
        id: movie.id,
        overview: movie.overview,
        release_date: movie.release_date?.substring(0, 4),
        poster_path: movie.poster_path,
        title: movie.title,
      }),
    );

  const unstarMovieHandler = () => dispatch(unstarMovie(movie));

  const addToWatchLaterHandler = () =>
    dispatch(
      addToWatchLater({
        id: movie.id,
        overview: movie.overview,
        release_date: movie.release_date?.substring(0, 4),
        poster_path: movie.poster_path,
        title: movie.title,
      }),
    );

  const removeFromWatchLaterHandler = () =>
    dispatch(removeFromWatchLater(movie));

  const viewTrailerHandler = () => viewTrailer(movie);

  return (
    <div className="wrapper col-8 col-xs-4 col-sm-4 col-sm-4 col-md-3 col-lg-3 col-xl-2">
      <div
        role="menuitem"
        tabIndex={0}
        className={clsx('card', { opened: isOpen })}
        onClick={openHandler}
        onKeyDown={keyboarEnterHandler(openHandler)}
      >
        <div className="card-body text-center">
          <div className="overlay" />
          <div className="info-panel">
            <div className="overview">{movie.overview}</div>
            <div className="year">{movie.release_date?.substring(0, 4)}</div>
            {!starred.starredMovies
              .map((starredMovie) => starredMovie.id)
              .includes(movie.id) ? (
              <span
                role="button"
                tabIndex={0}
                className="btn-star"
                data-testid="starred-link"
                onClick={starMovieHandler}
                onKeyDown={keyboarEnterHandler(starMovieHandler)}
              >
                <i className="bi bi-star" />
              </span>
            ) : (
              <span
                role="button"
                tabIndex={0}
                className="btn-star"
                data-testid="unstar-link"
                onClick={unstarMovieHandler}
                onKeyDown={keyboarEnterHandler(unstarMovieHandler)}
              >
                <i className="bi bi-star-fill" data-testid="star-fill" />
              </span>
            )}
            {!watchLater.watchLaterMovies
              .map((watchedMovie) => watchedMovie.id)
              .includes(movie.id) ? (
              <button
                type="button"
                data-testid="watch-later"
                className="btn btn-light btn-watch-later"
                onClick={addToWatchLaterHandler}
              >
                Watch Later
              </button>
            ) : (
              <button
                type="button"
                data-testid="remove-watch-later"
                className="btn btn-light btn-watch-later blue"
                onClick={removeFromWatchLaterHandler}
              >
                <i className="bi bi-check" />
              </button>
            )}
            <button
              type="button"
              className="btn btn-dark"
              onClick={viewTrailerHandler}
            >
              View Trailer
            </button>
          </div>
          <img
            className="center-block"
            src={
              movie.poster_path
                ? `${POSTER_IMG_ROUTE}${movie.poster_path}`
                : placeholder
            }
            alt="Movie poster"
          />
        </div>
        <h6 className="title mobile-card">{movie.title}</h6>
        <h6 className="title">{movie.title}</h6>
        <button
          type="button"
          className="close"
          onClick={closeHandler}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
}

Movie.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
    title: PropTypes.string,
    release_date: PropTypes.string,
  }).isRequired,
  viewTrailer: PropTypes.func.isRequired,
};

export default Movie;
