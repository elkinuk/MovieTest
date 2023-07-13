import PropTypes from 'prop-types';

import Movie from './Movie';

import './styles.scss';

function Movies({ movies, viewTrailer }) {
  return (
    <div data-testid="movies" className="movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
      ))}
    </div>
  );
}

Movies.defaultProps = {
  movies: [],
};

Movies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      overview: PropTypes.string,
      poster_path: PropTypes.string,
      title: PropTypes.string,
      release_date: PropTypes.string,
    }),
  ),
  viewTrailer: PropTypes.func.isRequired,
};

export default Movies;
