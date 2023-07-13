import { useCallback, useEffect, useState } from 'react';
import { FETCH_STATUS } from './constants';

const useInfiniteLoading = (fetch, status) => {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchWithPageSet = (page) => {
    setCurrentPage(page);
    fetch(page);
  };

  const fetchForCurrentPage = () => {
    fetch(currentPage);
  };

  const loadMoreHandler = useCallback(() => {
    const page = currentPage + 1;
    fetchWithPageSet(page);
  }, [currentPage]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      status === FETCH_STATUS.loading ||
      status === FETCH_STATUS.error
    ) {
      return;
    }
    loadMoreHandler();
  }, [loadMoreHandler, status]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage, status]);

  return {
    fetchWithPageSet,
    fetchForCurrentPage,
  };
};

export { useInfiniteLoading };
