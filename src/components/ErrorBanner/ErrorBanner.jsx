import { FETCH_STATUS } from '../../common/constants';
import { moviesStatusSelector } from '../../data/selectors';

import './styles.scss';

function ErrorBanner() {
  const errorStatuses = [moviesStatusSelector()];

  const isError = errorStatuses.find((status) => status === FETCH_STATUS.error);

  return (
    isError && (
      <div className="error-container">
        <span className="error-message">Sorry, something went wrong</span>
      </div>
    )
  );
}

export default ErrorBanner;
