import { useState } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';

import { ENDPOINT, API_KEY } from '../common/constants';
import Header from '../components/Header';
import YouTubePlayer from '../components/YoutubePlayer';
import Modal from '../components/Modal';
import { Home, Starred, WatchLater } from '../pages';

import './styles.scss';
import Footer from '../components/Footer/Footer';
import ErrorBanner from '../components/ErrorBanner/ErrorBanner';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [videoKey, setVideoKey] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <Header setSearchParams={setSearchParams} />
      <Footer />
      <ErrorBanner />
    </div>
  );
}

export default App;
