import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

function YoutubePlayer({ videoKey }) {
  return (
    <ReactPlayer
      className="video-player"
      url={`https://www.youtube.com/watch?v=${videoKey}`}
      controls
      playing
      data-testid="youtube-player"
    />
  );
}

YoutubePlayer.propTypes = {
  videoKey: PropTypes.string.isRequired,
};

export default YoutubePlayer;
