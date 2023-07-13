import { useState } from 'react';
import {
  Routes,
  Route,
  createSearchParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'reactjs-popup/dist/index.css';

import { fetchMovies } from '../data/slices';
import {
  ENDPOINT_SEARCH,
  ENDPOINT_DISCOVER,
  ENDPOINT,
  API_KEY,
} from '../common/constants';
import Header from '../components/Header';
import YouTubePlayer from '../components/YoutubePlayer';
import Modal from '../components/Modal';
import { Home, Starred, WatchLater } from '../pages';

import './styles.scss';

function App() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [videoKey, setVideoKey] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const getSearchResults = (query) => {
    if (query !== '') {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${query}`));
      setSearchParams(createSearchParams({ search: query }));
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
      setSearchParams();
    }
  };

  const searchMovies = (query) => {
    navigate('/');
    getSearchResults(query);
  };

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

    const videoData = await fetch(URL).then((response) => response.json());

    if (videoData?.videos?.results.length) {
      const trailer = videoData.videos.results.find(
        (vid) => vid.type === 'Trailer',
      );
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
    }
  };

  const viewTrailer = (movie) => {
    getMovie(movie.id);
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setVideoKey(undefined);
    setIsModalOpen(false);
  };

  return (
    <div className="app">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Home viewTrailer={viewTrailer} searchParams={searchParams} />
            }
          />
          <Route
            path="/starred"
            element={<Starred viewTrailer={viewTrailer} />}
          />
          <Route
            path="/watch-later"
            element={<WatchLater viewTrailer={viewTrailer} />}
          />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>

        <Modal isOpen={isModalOpen} closeModal={closeModalHandler}>
          <YouTubePlayer videoKey={videoKey} />
        </Modal>
      </div>
      <Header searchMovies={searchMovies} />
    </div>
  );
}

export default App;
