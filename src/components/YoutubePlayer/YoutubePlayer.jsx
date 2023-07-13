import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

import './styles.scss';

function YoutubePlayer({ videoKey }) {
  return (
    <div className="video-player__wrapper">
      {videoKey ? (
        <ReactPlayer
          className="video-player"
          url={`https://www.youtube.com/watch?v=${videoKey}`}
          controls
          playing
          data-testid="youtube-player"
          width="auto"
          height="100%"
        />
      ) : (
        <div className="player-loader">
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
}

YoutubePlayer.propTypes = {
  videoKey: PropTypes.string.isRequired,
};

export default YoutubePlayer;
