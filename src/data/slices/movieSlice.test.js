import { fetchMovies } from './moviesSlice';
import moviesMock from '../../test/movies.mocks';

describe('MovieSlice test', () => {
  it('should set loading true while action is pending', () => {
    const action = { type: fetchMovies.pending };
    expect(action).toEqual({ type: fetchMovies.pending });
  });

  it('should return payload when action is fulfilled', () => {
    const action = {
      type: fetchMovies.fulfilled,
      payload: moviesMock,
    };
    expect(action.payload).toBeTruthy();
  });

  it('should set error when action is rejected', () => {
    const action = { type: fetchMovies.rejected };
    expect(action).toEqual({ type: fetchMovies.rejected });
  });
});
